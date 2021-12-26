import { Router } from 'express';
import * as articlesController from './controllers';

const routes = Router();

routes.get('/articles', articlesController.getArticles);
routes.get('/articles/:id', articlesController.getArticleById);
routes.post('/articles', articlesController.createArticles);

export default routes;
