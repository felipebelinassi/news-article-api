import { Router } from 'express';
import createArticles from './controllers/create-articles';

const routes = Router();

routes.post('/articles', createArticles);

export default routes;
