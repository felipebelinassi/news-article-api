import { Router } from 'express';
import * as articlesController from './controllers';
import { validateArticleId } from './middlewares/request-validators';

const routes = Router();

routes.get('/articles', articlesController.getArticles);
routes.get('/articles/:id', validateArticleId, articlesController.getArticleById);
routes.post('/articles', articlesController.createArticles);
routes.patch('/articles/:id', validateArticleId, articlesController.updateArticleById);

export default routes;
