import tableController  from "./tableController";
import {
  getInvestmentService,
  getInvestmentByIdService,
  updateInvestmentService,
  deleteInvestmentService,
  createInvestmentService,
} from "../services/investmentService";

const investmentService = {
  getAll: getInvestmentService,
  getById: getInvestmentByIdService,
  create: createInvestmentService,
  update: updateInvestmentService,
  delete: deleteInvestmentService
};

export const investmentController = tableController(investmentService, "Investimento");