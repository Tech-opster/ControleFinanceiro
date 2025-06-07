import { Request, Response } from "express";
import prisma from '../lib/prisma';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários", details: err});
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({ where: { id: Number(id) } });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "Usuário não encontrado", details: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email} = req.body;
  try {
    const user = await prisma.users.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar usuário", details: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "Usuário não encontrado", details: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Usuário não encontrado", details: err });
  }
};
