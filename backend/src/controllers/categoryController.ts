import tableController  from "./tableController";
import { Request, Response } from "express";
import {
  getCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  createCategoryService,
} from "../services/categoryService";

const categoryService = {
  getAll: getCategoryService,
  getById: getCategoryByIdService,
  create: createCategoryService,
  update: updateCategoryService,
  delete: deleteCategoryService
};

const baseController = tableController(categoryService, "Categoria");

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

    const items = await getCategoryService({ userId, ...dateFilter });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Categorias não encontradas" });
  }
};

export const categoryController = {
  ...baseController,
  getAll,
};

