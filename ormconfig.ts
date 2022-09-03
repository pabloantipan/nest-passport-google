const defaultConnection = {
  name: 'default',
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.USERS_DB_USER,
  password: process.env.USERS_DB_PASSWORD,
  database: process.env.USERS_DB_NAME,
  migrations: ['dist/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  timezone: 'Z',
};

const migrationConnection = {
  ...defaultConnection,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/**/*.entity{.ts,.js}'],
  name: 'migration',
};

module.exports = [defaultConnection, migrationConnection];
