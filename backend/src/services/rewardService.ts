import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateRewardDTO, UpdateRewardDTO } from "../types/IReward";

export const getRewardService = async (where?: Prisma.RewardsWhereInput) => {
  return prisma.rewards.findMany({
    where,
  });
};

export const getRewardByIdService = async (where: Prisma.RewardsWhereUniqueInput) => {
  return prisma.rewards.findUnique({
    where,
  });
};

export const createRewardService = async (data: CreateRewardDTO) => {
  return prisma.rewards.create({
    data,
  });
};

export const updateRewardService = async (where: Prisma.RewardsWhereUniqueInput, data: UpdateRewardDTO) => {
  return prisma.rewards.update({
    where,
    data,
  });
};

export const deleteRewardService = async (where: Prisma.RewardsWhereUniqueInput) => {
  return prisma.rewards.delete({
    where,
  });
};
