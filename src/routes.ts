

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    // throw new Error('erro ao fazer essa requisição');
    return res.json({ nome: "Vicente Carvalho" });
});

export { router };