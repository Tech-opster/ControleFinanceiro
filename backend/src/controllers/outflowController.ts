import tableController from "./tableController";
import { Request, Response } from "express";
import {
  getOutflowService,
  getOutflowByIdService,
  updateOutflowService,
  deleteOutflowService,
  createOutflowService,
} from "../services/outflowService";

const outflowService = {
  getAll: getOutflowService,
  getById: getOutflowByIdService,
  create: createOutflowService,
  update: updateOutflowService,
  delete: deleteOutflowService,
};

const baseController = tableController(outflowService, "Despesa");

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { month, year, all } = req.query;

    let dateFilter = {};

    if (!all) {
      const now = new Date();
      const targetYear = year ? Number(year) : now.getFullYear();
      const targetMonth = month ? Number(month) - 1 : now.getMonth();

      const start = new Date(targetYear, targetMonth, 1);
      const end = new Date(targetYear, targetMonth + 1, 1);

      dateFilter = {
        date: { gte: start, lt: end },
      };
    }

    const items = await getOutflowService({ userId, ...dateFilter });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Despesas não encontradas" });
  }
};

export const outflowController = {
  ...baseController,
  getAll,
};
