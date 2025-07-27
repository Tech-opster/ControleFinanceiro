import { Request, Response } from "express";

function tableController(service: any, entityName: string) {
 
  return {
    getAll: async (req: Request, res: Response) => {
      try {
        const items = await service.getAll();
        res.json(items);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: `${entityName} não encontrados(as)` });
      }
    },

    getById: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const item = await service.getById({ id });
        res.json(item);
      } catch (err) {
        console.error(err);
        res.status(404).json({ error: `${entityName} não encontrado(a)` });
      }
    },

    create: async (req: Request, res: Response) => {
      try {
        const item = await service.create(req.body);
        res.status(201).json(item);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Não foi possível criar ${entityName}` });
      }
    },

    update: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const item = await service.update({ id }, req.body);
        res.json(item);
      } catch (err) {
        console.error(err);
        res.status(404).json({ error: `Não foi possível atualizar ${entityName}` });
      }
    },

    delete: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        await service.delete({ id });
        res.status(204).send();
      } catch (err) {
        console.error(err);
        res.status(404).json({ error: `Não foi possível deletar ${entityName}` });
      }
    }
  };
}

export default tableController;