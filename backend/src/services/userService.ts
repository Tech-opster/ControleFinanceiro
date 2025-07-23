import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateUserDTO, UpdateUserDTO } from "../types/IUser";

export const getUsersService = async () => {
  return prisma.users.findMany();
};

export const getUserByIdService = async (where: Prisma.UsersWhereUniqueInput) => {
  return prisma.users.findUnique({
    where,
  });
};

export const createUserService = async (data: CreateUserDTO) => {
  return prisma.users.create({
    data,
  });
};

export const updateUserService = async (where: Prisma.UsersWhereUniqueInput, data: UpdateUserDTO) => {
  return prisma.users.update({
    where,
    data,
  });
};

export const deleteUserService = async (where: Prisma.UsersWhereUniqueInput) => {
  return prisma.users.delete({
    where,
  });
};
