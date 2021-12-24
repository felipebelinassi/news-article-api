import nodeConfig from 'config';

export default {
  port: nodeConfig.get<string>('port'),
};
