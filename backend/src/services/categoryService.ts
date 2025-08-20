import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  UpdateCategoryDTO,
} from "../types/ICategory";

export const getCategoryService = async (
  where: Prisma.UserCategoryWhereInput
) => {
  const { userId } = where;

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
  return prisma.$transaction(async (tx) => {
    // 1. Buscar a categoria atual com todas as informações necessárias
    const currentCategory = await tx.categories.findUnique({
      where: { id: where.id },
      include: {
        UserCategory: {
          where: { isActive: true },
          select: {
            userId: true,
            isActive: true,
            user: {
              select: { id: true, name: true },
            },
          },
        },
        creator: {
          select: { id: true, name: true },
        },
      },
    });

    if (!currentCategory) {
      throw new Error("Categoria não encontrada");
    }

    // Verificar se o usuário tem acesso a esta categoria
    const userHasAccess =
      currentCategory.isDefault ||
      currentCategory.UserCategory.some((uc) => uc.userId === data.userId);

    if (!userHasAccess) {
      throw new Error("Usuário não tem permissão para editar esta categoria");
    }

    // 2. Verificar se já existe uma categoria com o novo nome
    const existingCategoryWithNewName = await tx.categories.findFirst({
      where: {
        category: data.category.trim(),
        NOT: { id: currentCategory.id },
      },
    });

    // 3. CENÁRIO: Nome já existe - substituir
    if (existingCategoryWithNewName) {
      // Desativar categoria atual
      await tx.userCategory.upsert({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: currentCategory.id,
          },
        },
        update: { isActive: false },
        create: {
          userId: data.userId,
          categoryId: currentCategory.id,
          isActive: false,
        },
      });

      // Ativar categoria existente
      await tx.userCategory.upsert({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: existingCategoryWithNewName.id,
          },
        },
        update: { isActive: true },
        create: {
          userId: data.userId,
          categoryId: existingCategoryWithNewName.id,
          isActive: true,
        },
      });

      return {
        success: true,
        message: `Categoria alterada para "${existingCategoryWithNewName.category}" (categoria existente)`,
        category: existingCategoryWithNewName,
        action: "REPLACED_WITH_EXISTING",
        previousCategory: currentCategory,
      };
    }

    // 4. CENÁRIO: Categoria default - sempre criar nova
    if (currentCategory.isDefault) {
      const newCategory = await tx.categories.create({
        data: {
          category: data.category.trim(),
          createdBy: data.userId,
          isDefault: false,
        },
      });

      // Desativar default
      await tx.userCategory.upsert({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: currentCategory.id,
          },
        },
        update: { isActive: false },
        create: {
          userId: data.userId,
          categoryId: currentCategory.id,
          isActive: false,
        },
      });

      // Ativar nova
      await tx.userCategory.create({
        data: {
          userId: data.userId,
          categoryId: newCategory.id,
          isActive: true,
        },
      });

      return {
        success: true,
        message: `Nova categoria "${newCategory.category}" criada (categoria default não pode ser editada)`,
        category: newCategory,
        action: "CREATED_FROM_DEFAULT",
        previousCategory: currentCategory,
      };
    }

    // 5. CENÁRIO: Categoria compartilhada - criar nova
    const activeUsers = currentCategory.UserCategory.filter(
      (uc) => uc.isActive
    );
    if (activeUsers.length > 1) {
      const newCategory = await tx.categories.create({
        data: {
          category: data.category.trim(),
          createdBy: data.userId,
          isDefault: false,
        },
      });

      // Desativar atual para o usuário
      await tx.userCategory.update({
        where: {
          userId_categoryId: {
            userId: data.userId,
            categoryId: currentCategory.id,
          },
        },
        data: { isActive: false },
      });

      // Ativar nova para o usuário
      await tx.userCategory.create({
        data: {
          userId: data.userId,
          categoryId: newCategory.id,
          isActive: true,
        },
      });

      return {
        success: true,
        message: `Nova categoria "${newCategory.category}" criada (categoria compartilhada não pode ser editada)`,
        category: newCategory,
        action: "CREATED_FROM_SHARED",
        previousCategory: currentCategory,
        sharedWithUsers: activeUsers.map((u) => u.user?.name).filter(Boolean),
      };
    }

    // 6. CENÁRIO: Categoria própria e exclusiva - pode editar
    const updatedCategory = await tx.categories.update({
      where: { id: currentCategory.id },
      data: {
        category: data.category.trim(),
      },
    });

    return {
      success: true,
      message: `Categoria atualizada para "${updatedCategory.category}"`,
      category: updatedCategory,
      action: "UPDATED_IN_PLACE",
      previousCategory: currentCategory,
    };
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
