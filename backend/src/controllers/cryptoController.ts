import tableController  from "./tableController";
import {
  getCryptoService,
  getCryptoByIdService,
  updateCryptoService,
  deleteCryptoService,
  createCryptoService,
} from "../services/cryptoService";

const cryptoService = {
  getAll: getCryptoService,
  getById: getCryptoByIdService,
  create: createCryptoService,
  update: updateCryptoService,
  delete: deleteCryptoService
};

export const cryptoController = tableController(cryptoService, "Criptomoeda");