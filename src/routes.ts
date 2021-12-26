import { Router } from 'express';
import * as articlesController from './controllers';

const routes = Router();

routes.get('/articles', articlesController.getArticles);
routes.post('/articles', articlesController.createArticles);

export default routes;
