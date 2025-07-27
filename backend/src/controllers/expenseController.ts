import tableController  from "./tableController";
import {
  getExpenseService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  createExpenseService,
} from "../services/expenseService";

const expenseService = {
  getAll: getExpenseService,
  getById: getExpenseByIdService,
  create: createExpenseService,
  update: updateExpenseService,
  delete: deleteExpenseService
};

export const expenseController = tableController(expenseService, "Categoria");