import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../types/ICategory";

export const getCategoryService = async ({ userId }: { userId: number }) => {
  return prisma.categories.findMany({
    where: {
      OR: [
        { isDefault: true },
        { createdBy: userId },
        { UserCategory: { some: { userId, isActive: true } } }
      ]
    },
    select: {
      id: true,
      category: true,
      isDefault: true,
      createdBy: true,
      creator: { select: { id: true, name: true } },
      UserCategory: { where: { userId }, select: { isActive: true, addedAt: true } }
    },
  });
};

export const getCategoryByIdService = async (where: Prisma.CategoriesWhereUniqueInput) => {
  return prisma.categories.findUnique({
    where,
  });
};

export const createCategoryService = async (data: CreateCategoryDTO) => {
  return prisma.categories.create({
    data,
  });
};

export const updateCategoryService = async (where: Prisma.CategoriesWhereUniqueInput, data: UpdateCategoryDTO) => {
  return prisma.categories.update({
    where,
    data,
  });
};

export const deleteCategoryService = async (where: Prisma.CategoriesWhereUniqueInput) => {
  return prisma.categories.delete({
    where,
  });
};
