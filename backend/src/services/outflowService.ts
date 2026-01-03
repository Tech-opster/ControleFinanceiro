import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateOutflowDTO, UpdateOutflowDTO } from "../types/IOutflow";

export const getOutflowService = async (where?: Prisma.OutflowsWhereInput) => {
  return prisma.outflows.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      date: 'desc'
    },
  });
};

export const getOutflowByIdService = async (
  where: Prisma.OutflowsWhereUniqueInput
) => {
  return prisma.outflows.findUnique({
    where,
  });
};

export const createOutflowService = async (data: CreateOutflowDTO) => {
  return prisma.outflows.create({
    data,
  });
};

export const updateOutflowService = async (
  where: Prisma.OutflowsWhereUniqueInput,
  data: UpdateOutflowDTO
) => {
  return prisma.$transaction(async (tx) => {
    const category = await tx.categories.findFirst({
      where: {
        id: data.categoryId,
        UserCategory: { some: { userId: data.userId, isActive: true } }
      },
    });

    if (!category) {
      throw new Error("Categoria inválida ou desativada");
    }

    return tx.outflows.update({
      where,
      data,
    });
  });
};

export const deleteOutflowService = async (
  where: Prisma.OutflowsWhereUniqueInput
) => {
  return prisma.outflows.delete({
    where,
  });
};
