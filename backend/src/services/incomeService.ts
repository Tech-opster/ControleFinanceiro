import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateIncomeDTO, UpdateIncomeDTO } from "../types/IIncome";

export const getIncomeService = async (where?: Prisma.IncomesWhereInput) => {
  return prisma.incomes.findMany({
    where,
  });
};

export const getIncomeByIdService = async (where: Prisma.IncomesWhereUniqueInput) => {
  return prisma.incomes.findUnique({
    where,
  });
};

export const createIncomeService = async (data: CreateIncomeDTO) => {
  return prisma.incomes.create({
    data,
  });
};

export const updateIncomeService = async (where: Prisma.IncomesWhereUniqueInput, data: UpdateIncomeDTO) => {
  return prisma.incomes.update({
    where,
    data,
  });
};

export const deleteIncomeService = async (where: Prisma.IncomesWhereUniqueInput) => {
  return prisma.incomes.delete({
    where,
  });
};
