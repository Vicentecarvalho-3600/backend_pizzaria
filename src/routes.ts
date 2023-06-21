import { Router} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router();

// -- ROTAS USERS
router.post('/users', new CreateUserController().handle)

export { router };