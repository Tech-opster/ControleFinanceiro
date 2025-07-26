import { Request, Response } from "express";
import {
  getOutflowService,
  getOutflowByIdService,
  updateOutflowService,
  deleteOutflowService,
  createOutflowService,
} from "../services/outflowService";
import { CreateOutflowDTO } from "../types/IOutflow";

export const getOutflow = async (req: Request, res: Response) => {
  try {
    const outflow = await getOutflowService();
    res.json(outflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Despesas não encontradas" });
  }
};

export const getOutflowById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const outflow = await getOutflowByIdService({ id });
    res.json(outflow);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Despesa não encontrada" });
  }
};

export const createOutflow = async (req: Request, res: Response) => {
  const { despesa, valor, data, categoria, status } = req.body;
  const outflowData: CreateOutflowDTO = { despesa, valor, data, categoria, status };

  try {
    const outflow = await createOutflowService(outflowData);
    res.status(201).json(outflow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Não foi possível criar despesa" });
  }
};

export const updateOutflow = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { despesa, valor, data, categoria, status } = req.body;
  const outflowData: CreateOutflowDTO = { despesa, valor, data, categoria, status };

  try {
    const outflow = await updateOutflowService({ id }, outflowData);
    res.json(outflow);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Não foi possível atualizar despesa" });
  }
};

export const deleteOutflow = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteOutflowService({ id });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Não foi possível deletar despesa" });
  }
};
