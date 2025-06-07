import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService } from "../services/userService";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
    return;
  }
  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: "Credenciais invalidas." });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1h
    });
    res.json({ message: "Login realizado com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno durante o login." });
  }
};

export const register = async (req: Request, res: Response) => {
  const { password, ...userData } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const newUser = await createUserService({
      ...userData,
      passwordHash,
    });

    // Gera token imediatamente após o registro
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1h
    });
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err: any) {
    err instanceof PrismaClientKnownRequestError;

    if (err.code === "P2002") {
      // Erro de unique constraint
      console.error(err);
      res.status(409).json({ error: "E-mail já cadastrado." });
      return;
    }
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};
