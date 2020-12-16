import 'pg';
import { Sequelize } from 'sequelize-typescript';
import * as models from '../models/PostgreSQL';

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME || 'toolset',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'example',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT! || 5432,
  models: Object.values(models),
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export default sequelize;
