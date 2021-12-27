import { Server } from 'http';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as server from '../src/server/app';
import testConfig from '../config/test';

let jestServer: Server;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  jestServer = server.start({
    ...testConfig,
    database: { url: mongoServer.getUri() },
  });
  global.testRequest = supertest(jestServer);
});

afterAll(async () => {
  await server.close(jestServer);
  await mongoServer.stop();
});
