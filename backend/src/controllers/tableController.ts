import { Request, Response } from "express";

function tableController(service: any, entityName: string) {
  return {
    getAll: async (req: Request, res: Response) => {
      try {
        const userId = req.userId!;

        const items = await service.getAll({userId});
        res.json(items);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: `${entityName} não encontrados(as)` });
      }
    },

    getById: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const userId = req.userId!;

        const item = await service.getById({ id, userId });
        res.json(item);
      } catch (err) {
        console.error(err);
        res.status(404).json({ error: `${entityName} não encontrado(a)` });
      }
    },

    create: async (req: Request, res: Response) => {
      try {
        const userId = req.userId!;

        const item = await service.create({ ...req.body, userId });
        res.status(201).json(item);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Não foi possível criar ${entityName}` });
      }
    },

    update: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const userId = req.userId!;

        const item = await service.update({ id, userId }, req.body);
        res.json(item);
      } catch (err) {
        console.error(err);
        res
          .status(404)
          .json({ error: `Não foi possível atualizar ${entityName}` });
      }
    },

    delete: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const userId = req.userId!;

        await service.delete({ id, userId });
        res.status(204).send();
      } catch (err) {
        console.error(err);
        res
          .status(404)
          .json({ error: `Não foi possível deletar ${entityName}` });
      }
    },
  };
}

export default tableController;
