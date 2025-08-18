import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  UpdateCategoryDTO,
} from "../types/ICategory";

export const getCategoryService = async ({ userId }: { userId: number }) => {
  return prisma.$transaction(async (tx) => {
    // 1. Buscar todas as categorias disponíveis
    const allCategories = await tx.categories.findMany({
      where: {
        OR: [
          { isDefault: true }, // Todas as default
          { UserCategory: { some: { userId, isActive: true } } }, // Customizadas ativas
        ],
      },
      select: {
        id: true,
        category: true,
        isDefault: true,
        createdBy: true,
        creator: { select: { id: true, name: true } },
        UserCategory: {
          where: { userId },
          select: { isActive: true, addedAt: true },
        },
      },
    });

    // 2. Filtrar: remover defaults que foram explicitamente desativadas
    const filteredCategories = allCategories.filter((category) => {
      const userAssociation = category.UserCategory[0]; // Só pode ter 1 por usuário

      if (category.isDefault) {
        // Default: mostrar EXCETO se foi explicitamente desativada
        return !userAssociation || userAssociation.isActive !== false;
      } else {
        // Customizada: mostrar APENAS se foi explicitamente ativada
        return userAssociation && userAssociation.isActive === true;
      }
    });

    return filteredCategories;
  });
};

export const getCategoryByIdService = async (
  where: Prisma.CategoriesWhereUniqueInput
) => {
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

export const updateCategoryService = async (
  where: Prisma.CategoriesWhereUniqueInput,
  data: UpdateCategoryDTO
) => {
  return prisma.categories.update({
    where,
    data,
  });
};

export const deleteCategoryService = async (data: DeleteCategoryDTO) => {
  return prisma.$transaction(async (tx) => {
    // 1. Verificar se a categoria existe
    const category = await tx.categories.findUnique({
      where: { id: data.id },
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    // 2. Verificar tipo da categoria
    if (category.isDefault) {
      // CATEGORIA DEFAULT: Criar associação para desativar
      const updatedAssociation = await tx.userCategory.upsert({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: data.id,
          },
        },
        update: {
          isActive: false, // Se já existe, desativar
        },
        create: {
          userId: data.userId,
          categoryId: data.id,
          isActive: false, // Criar como desativada
        },
      });

      return {
        success: true,
        message: "Categoria default desativada com sucesso",
        category: category,
        association: updatedAssociation,
      };
    } else {
      // CATEGORIA CUSTOMIZADA: Deve ter associação existente
      const userCategoryAssociation = await tx.userCategory.findUnique({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: data.id,
          },
        },
      });

      if (!userCategoryAssociation) {
        throw new Error("Usuário não possui esta categoria");
      }

      // Desativar categoria customizada
      const updatedAssociation = await tx.userCategory.update({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: data.id,
          },
        },
        data: { isActive: false },
      });

      return {
        success: true,
        message: "Categoria customizada desativada com sucesso",
        category: category,
        association: updatedAssociation,
      };
    }
  });
};
