import tableController  from "./tableController";
import {
  getRewardService,
  getRewardByIdService,
  updateRewardService,
  deleteRewardService,
  createRewardService,
} from "../services/rewardService";

const rewardService = {
  getAll: getRewardService,
  getById: getRewardByIdService,
  create: createRewardService,
  update: updateRewardService,
  delete: deleteRewardService
};

export const rewardController = tableController(rewardService, "Pontuação");