import { Server } from 'http';
import * as server from './server/app';
import config from './server/config';

enum ExitStatus {
  FAILURE = 1,
  SUCCESS = 0,
}

process.on('unhandledRejection', (err) => {
  console.error(`App exiting due to unhandled exception: ${err}`);
  process.exit(ExitStatus.FAILURE);
});

const exitProcessWithError = (err: Error) => {
  console.error(`App exited with error: ${err}`);
  process.exit(ExitStatus.FAILURE);
};

const checkForExitSignal = (appServer: Server) => {
  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  exitSignals.map((sig) =>
    process.on(sig, async () => {
      try {
        await server.close(appServer);
        console.info('App exited with success');
        process.exit(ExitStatus.SUCCESS);
      } catch (err) {
        exitProcessWithError(err);
      }
    }),
  );
};

(async (): Promise<void> => {
  try {
    const appServer = server.start(config.port);

    checkForExitSignal(appServer);
  } catch (err) {
    exitProcessWithError(err);
  }
})();
