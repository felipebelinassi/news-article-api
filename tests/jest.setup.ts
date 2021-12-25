import { Server } from 'http';
import supertest from 'supertest';
import * as server from '../src/server/app';

let jestServer: Server;

beforeAll(async () => {
  jestServer = server.start(8081);
  global.testRequest = supertest(jestServer);
});

afterAll(async () => {
  await server.close(jestServer);
});
