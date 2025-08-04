import prisma from "../lib/prisma";
import { Prisma } from "../../generated/prisma";
import { CreateCryptoDTO, UpdateCryptoDTO } from "../types/ICrypto";

export const getCryptoService = async (where?: Prisma.CryptosWhereInput) => {
  return prisma.cryptos.findMany({
    where,
  });
};

export const getCryptoByIdService = async (where: Prisma.CryptosWhereUniqueInput) => {
  return prisma.cryptos.findUnique({
    where,
  });
};

export const createCryptoService = async (data: CreateCryptoDTO) => {
  return prisma.cryptos.create({
    data,
  });
};

export const updateCryptoService = async (where: Prisma.CryptosWhereUniqueInput, data: UpdateCryptoDTO) => {
  return prisma.cryptos.update({
    where,
    data,
  });
};

export const deleteCryptoService = async (where: Prisma.CryptosWhereUniqueInput) => {
  return prisma.cryptos.delete({
    where,
  });
};
