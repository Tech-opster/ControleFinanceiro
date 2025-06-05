import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService } from "../services/userService";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
    return
  }
  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      res.status(401).json({ error: "Credenciais invalidas." });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro interno durante o login", details: err });
  }
};

export const register = async (req: Request, res: Response) => {
  const { password, ...userData } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await createUserService({
    ...userData,
    passwordHash,
  });

  // Gera token imediatamente após o registro
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!);
  res
    .status(201)
    .json({ message: "Usuário registrado com sucesso", user: newUser, token });
};
