import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateOutflowDTO, UpdateOutflowDTO } from "../types/IOutflow";

export const getOutflowService = async () => {
  return prisma.outflows.findMany();
};

export const getOutflowByIdService = async (where: Prisma.OutflowsWhereUniqueInput) => {
  return prisma.outflows.findUnique({
    where,
  });
};

export const createOutflowService = async (data: CreateOutflowDTO) => {
  return prisma.outflows.create({
    data,
  });
};

export const updateOutflowService = async (where: Prisma.OutflowsWhereUniqueInput, data: UpdateOutflowDTO) => {
  return prisma.outflows.update({
    where,
    data,
  });
};

export const deleteOutflowService = async (where: Prisma.OutflowsWhereUniqueInput) => {
  return prisma.outflows.delete({
    where,
  });
};
