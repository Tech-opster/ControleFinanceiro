import { Request, Response } from "express";
import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  createUserService,
  getUserByFirebaseUidService,
  getUserByEmailService,
} from "../services/userService";
import { CreateUserDTO, UpdateUserDTO } from "../types/IUser";
import { validationResult } from "express-validator";
import admin from "../firebase/firebaseAdmin";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Usuários não encontrados" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await getUserByIdService({ id });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, firebaseUid } = req.body;
  const data: UpdateUserDTO = { name, email, firebaseUid };

  try {
    const user = await updateUserService({ id }, data);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Não foi possível atualizar usuário" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteUserService({ id });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Não foi possível deletar usuário" });
  }
};


export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password } = req.body;

  try {
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: name.trim(),
    });

    const data: CreateUserDTO = {
      name,
      email,
      firebaseUid: firebaseUser.uid,
    };

    try {
      await createUserService(data);

      res.status(201).json({ uid: firebaseUser.uid });
    } catch (err) {
      console.error("Erro ao criar usuário no banco:", err);

      try {
        await admin.auth().deleteUser(firebaseUser.uid);
      } catch (err) {
        console.error("Erro ao fazer rollback do Firebase:", err);
      }

      res.status(500).json({
        error: "Erro ao criar usuário no banco de dados",
      });
    }
  } catch (err: any) {
    console.error("Erro ao criar usuário no Firebase:", err);
    res.status(500).json({
      code: err.code,
      message: err.message,
    });
  }
};

export const syncUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    const { uid } = req.user;

    // ✅ 1. SEMPRE busca no Firebase primeiro (fonte da verdade)
    const firebaseUser = await admin.auth().getUser(uid);

    if (!firebaseUser?.email) {
      console.log("❌ Usuário inválido no Firebase");
      res.status(404).json({
        error: "Usuário não encontrado ou sem email no Firebase",
      });
      return;
    }

    const { email } = firebaseUser;

    // ✅ 2. Verifica se existe por UID (caso mais comum - 90%)
    const existingUserByUid = await getUserByFirebaseUidService(uid);

    if (existingUserByUid) {
      res.status(200).json({
        message: "Usuário já existe e sincronizado",
        user: existingUserByUid,
      });
      return;
    }

    // ✅ 3. UID não encontrado - verifica por email (caso de UID alterado)
    const existingUserByEmail = await getUserByEmailService(email);

    if (!existingUserByEmail) {
      // ✅ Usuário totalmente novo
      const userData: CreateUserDTO = {
        name: firebaseUser.displayName || email.split("@")[0] || "Usuário",
        email: email,
        firebaseUid: uid,
      };

      const newUser = await createUserService(userData);
      console.log("✅ Usuário criado:", newUser.email);

      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: newUser,
      });
      return;
    }

    // ✅ 5. Verifica se UID antigo ainda é válido
    let oldUidStillExists = false;
    try {
      await admin.auth().getUser(existingUserByEmail.firebaseUid);
      oldUidStillExists = true;
      console.log("⚠️ UID antigo ainda existe - CONFLITO!");
    } catch (error) {
      console.log("🔵 UID antigo inválido - pode atualizar");
    }

    if (oldUidStillExists) {
      // 💥 CONFLITO: Dois UIDs válidos para mesmo email
      console.log("❌ CONFLITO CRÍTICO");
      res.status(409).json({
        error: "Conflito de usuários",
        message: "Existem dois usuários Firebase válidos com o mesmo email",
        action: "Contate o administrador do sistema",
        details: {
          emailInConflict: email,
          existingUid: existingUserByEmail.firebaseUid,
          newUid: uid,
        },
      });
      return;
    }

    // ✅ 6. UID antigo inválido - atualiza com segurança
    const updatedUser = await updateUserService(
      { id: existingUserByEmail.id }, // where: objeto
      {
        firebaseUid: uid,
        name:
          firebaseUser.displayName ||
          existingUserByEmail.name ||
          email.split("@")[0],
      } // data: objeto
    );
    console.log("✅ UID atualizado com sucesso");
    res.status(200).json({
      message: "Usuário recuperado - UID atualizado",
      user: updatedUser,
      info: "UID foi atualizado devido à recriação no Firebase",
    });
  } catch (err: any) {
    console.error("❌ Erro no syncGoogleUser:", err);
    res.status(500).json({
      error: "Erro ao sincronizar usuário",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
