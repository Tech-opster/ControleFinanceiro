import prisma from '../lib/prisma';

interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
}

export const createUserService = async (data: CreateUserInput) => {
  return prisma.users.create({
    data,
  });
};