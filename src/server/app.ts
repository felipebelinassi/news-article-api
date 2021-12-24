import { Server } from 'http';
import express from 'express';

const app = express();

app.use(express.json());

export const start = (port: string | number): Server =>
  app.listen(port, async () => {
    console.log(`Application listening at port ${port}`);
  });

export const close = async (server: Server): Promise<void> => {
  server.close();
};
