import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateUserDTO, UpdateUserDTO } from "../types/IUser";

// ✅ Adiciona where opcional para consistência
export const getUsersService = async (where?: Prisma.UsersWhereInput) => {
  return prisma.users.findMany({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      // ❌ NÃO expor firebaseUid por segurança
      // firebaseUid: false (já é padrão)
    },
  });
};

export const getUserByIdService = async (
  where: Prisma.UsersWhereUniqueInput
) => {
  return prisma.users.findUnique({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      // ❌ NÃO expor firebaseUid por segurança
    },
  });
};

export const createUserService = async (data: CreateUserDTO) => {
  return prisma.users.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      // ❌ NÃO retornar firebaseUid na criação
    },
  });
};

export const updateUserService = async (
  where: Prisma.UsersWhereUniqueInput,
  data: UpdateUserDTO
) => {
  return prisma.users.update({
    where,
    data,
    select: {
      id: true,
      email: true,
      name: true,
      firebaseUid: true,
      updatedAt: true,
    },
  });
};

export const deleteUserService = async (
  where: Prisma.UsersWhereUniqueInput
) => {
  return prisma.users.delete({
    where,
    select: {
      id: true,
    },
  });
};

// ✅ Service adicional para buscar por firebaseUid (usado no middleware)
export const getUserByFirebaseUidService = async (firebaseUid: string) => {
  return prisma.users.findUnique({
    where: { firebaseUid },
  });
};

export const getUserByEmailService = async (email: string) => {
  return prisma.users.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, firebaseUid: true }
  });
};
