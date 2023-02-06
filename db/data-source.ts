import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const getDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT'),
  database: configService.get<string>('MYSQL_DB_NAME'),
  username: configService.get<string>('MYSQL_USERNAME'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  charset: 'utf8mb4_unicode_ci',
  timezone: '+00:00',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: configService.get<string>('NODE_ENV') == 'development',
  synchronize: configService.get<string>('NODE_ENV') == 'development',
  entities: [`dist/**/entities/*.{ts,js}`],
  migrations: [`dist/db/migrations/*.js`],
  namingStrategy: new SnakeNamingStrategy(),
});

export const dataSourceOptions: DataSourceOptions =
  getDatabaseConfig(configService);

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
