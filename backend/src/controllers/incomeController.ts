import  tableController  from "./tableController";
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

export const incomeController = tableController(incomeService, "Receita");