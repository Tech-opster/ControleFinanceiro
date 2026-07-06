import  tableController  from "./tableController";
import { Request, Response } from "express";
import {
  getIncomeService,
  getIncomeByIdService,
  updateIncomeService,
  deleteIncomeService,
  createIncomeService,
} from "../services/incomeService";

const incomeService = {
  getAll: getIncomeService,
  getById: getIncomeByIdService,
  create: createIncomeService,
  update: updateIncomeService,
  delete: deleteIncomeService
};

const baseController = tableController(incomeService, "Receita");

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

    const items = await getIncomeService({ userId, ...dateFilter });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Receitas não encontradas" });
  }
};

export const incomeController = {
  ...baseController,
  getAll,
};

