import prisma from '../lib/prisma';
import { UserInterface } from '../types/IUser'

export const createUserService = async (data: UserInterface) => {
  return prisma.users.create({
    data,
  });
};