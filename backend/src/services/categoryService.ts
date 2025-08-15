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
  return prisma.$transaction(async (tx) => {
    // 1. Verificar se já existe uma categoria com esse nome
    let category = await tx.categories.findFirst({
      where: {
        category: data.category,
      },
    });

    // 2. Se não existir, criar nova
    if (!category) {
      category = await tx.categories.create({
        data: {
          category: data.category,
          createdBy: data.userId,
          isDefault: false,
        },
      });
    }

    // 3. Verificar se o usuário já tem associação com esta categoria
    const existingAssociation = await tx.userCategory.findUnique({
      where: {
        userId_categoryId: {
          userId: data.userId,
          categoryId: category.id,
        },
      },
    });

    // 4. Se não tiver associação, criar
    if (!existingAssociation) {
      await tx.userCategory.create({
        data: {
          userId: data.userId,
          categoryId: category.id,
          isActive: true,
        },
      });
    } else if (!existingAssociation.isActive) {
      // 5. Se tiver associação mas estiver inativa, reativar
      await tx.userCategory.update({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: category.id,
          },
        },
        data: {
          isActive: true,
        },
      });
    }

    return category;
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
