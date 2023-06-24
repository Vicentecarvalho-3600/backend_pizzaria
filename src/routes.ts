import { Router} from 'express';


import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController'; 

import { isAuthenticaded } from './middlewares/isAuthenticaded';

const router = Router();

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticaded, new DetailUserController().handle)

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticaded, new CreateCategoryController().handler)


export { router };