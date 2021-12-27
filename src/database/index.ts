import mongoose from 'mongoose';

interface DBConfig {
  url: string;
}

export const connect = async (dbConfig: DBConfig): Promise<void> => {
  return mongoose.connect(dbConfig.url).then(
    () => {
      console.log('Database connected successfully');
    },
    (err) => {
      console.error('Mongoose failed to connect', err);
      throw new Error(err);
    },
  );
};

export const close = (): Promise<void> => mongoose.connection.close();
