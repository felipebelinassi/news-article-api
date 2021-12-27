import nodeConfig from 'config';

export default {
  port: nodeConfig.get<string>('port'),
  database: {
    url: nodeConfig.get<string>('database.url'),
  },
};
