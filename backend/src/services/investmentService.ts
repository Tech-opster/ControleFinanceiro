import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateInvestmentDTO, UpdateInvestmentDTO } from "../types/IInvestment";

export const getInvestmentService = async (where?: Prisma.InvestmentsWhereInput) => {
  return prisma.investments.findMany({
    where,
  });
};
export const getInvestmentByIdService = async (where: Prisma.InvestmentsWhereUniqueInput) => {
  return prisma.investments.findUnique({
    where,
  });
};

export const createInvestmentService = async (data: CreateInvestmentDTO) => {
  return prisma.investments.create({
    data,
  });
};

export const updateInvestmentService = async (where: Prisma.InvestmentsWhereUniqueInput, data: UpdateInvestmentDTO) => {
  return prisma.investments.update({
    where,
    data,
  });
};

export const deleteInvestmentService = async (where: Prisma.InvestmentsWhereUniqueInput) => {
  return prisma.investments.delete({
    where,
  });
};
