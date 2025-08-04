import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../types/ICategory";

export const getCategoryService = async (where?: Prisma.CategoriesWhereInput) => {
  return prisma.categories.findMany({
    where,
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
