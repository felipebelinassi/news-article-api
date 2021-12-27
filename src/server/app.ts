import { Server } from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import appConfig from './config';
import apiSpec from '../../docs/apiSpec.json';
import routes from '../routes';
import * as database from '../database';
import errorHandler from '../middlewares/error-handler';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.use(routes);
app.use(errorHandler);

export const start = (config: typeof appConfig): Server =>
  app.listen(config.port, async () => {
    await database.connect(config.database);
    console.log(`Application listening at port ${config.port}`);
  });

export const close = async (server: Server): Promise<void> => {
  await database.close();
  server.close();
};
