import tableController  from "./tableController";
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
  delete: deleteOutflowService
};

export const outflowController = tableController(outflowService, "Despesa");