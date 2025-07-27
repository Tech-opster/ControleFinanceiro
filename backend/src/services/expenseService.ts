import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateExpenseDTO, UpdateExpenseDTO } from "../types/IExpense";

export const getExpenseService = async () => {
  return prisma.expenses.findMany();
};

export const getExpenseByIdService = async (where: Prisma.ExpensesWhereUniqueInput) => {
  return prisma.expenses.findUnique({
    where,
  });
};

export const createExpenseService = async (data: CreateExpenseDTO) => {
  return prisma.expenses.create({
    data,
  });
};

export const updateExpenseService = async (where: Prisma.ExpensesWhereUniqueInput, data: UpdateExpenseDTO) => {
  return prisma.expenses.update({
    where,
    data,
  });
};

export const deleteExpenseService = async (where: Prisma.ExpensesWhereUniqueInput) => {
  return prisma.expenses.delete({
    where,
  });
};
