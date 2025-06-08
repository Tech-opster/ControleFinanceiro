import { Request, Response } from "express";
import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  createUserService,
} from "../services/userService";
import { CreateUserDTO } from "../types/IUser";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
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

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const data: CreateUserDTO = { name, email };

  if (!name || !email) {
    res.status(400).json({ error: "Nome e email são obrigatórios" });
    return;
  }

  try {
    const user = await createUserService(data);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erro ao criar usuário" });
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
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteUserService({ id });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};
