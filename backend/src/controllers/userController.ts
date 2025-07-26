import { Request, Response } from "express";
import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  createUserService,
} from "../services/userService";
import { CreateUserDTO } from "../types/IUser";
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

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  // const data: CreateUserDTO = { name, email };

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name.trim(),
    });

    res.status(201).json({ uid: user.uid });

    //TODO Criação de usuário no banco de dados
    // try {
    //   await createUserService(data);

    //   res.status(201).json({ uid: user.uid });
    // } catch (err) {
    //   console.error(err);
      
    //   await admin.auth().deleteUser(user.uid);

    //   res
    //     .status(500)
    //     .json({ error: "Erro ao criar usuário no banco de dados" });
    // }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ code: err.code, message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const data: CreateUserDTO = { name, email };

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
