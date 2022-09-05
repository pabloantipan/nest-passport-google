import { DataSourceOptions } from 'typeorm';

export const defaultConnection: Partial<DataSourceOptions> = {
  name: 'default',
  type: 'mysql',
  host: 'mysql_db_container',
  port: 3306,
  username: process.env.USERS_DB_USER || 'root',
  password: process.env.USERS_DB_PASSWORD || 'qweqwe123',
  database: process.env.USERS_DB_NAME || 'users',
  migrations: ['dist/database/migrations/*.ts'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  timezone: 'Z',
};

export const migrationConnection = {
  ...defaultConnection,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity{.ts,.js}'],
  name: 'migration',
};
