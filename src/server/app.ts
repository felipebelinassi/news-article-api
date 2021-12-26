import { Server } from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import apiSpec from '../../docs/apiSpec.json';

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

export const start = (port: string | number): Server =>
  app.listen(port, async () => {
    console.log(`Application listening at port ${port}`);
  });

export const close = async (server: Server): Promise<void> => {
  server.close();
};
