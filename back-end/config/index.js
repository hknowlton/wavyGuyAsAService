require('dotenv').config();

module.exports = {
  express: {
    parser: {
      json: {
        limit: '10mb',
      },
      urlencoded: {
        extended: true,
        limit: '10mb',
      },
    },
    port: process.env.SERVER_PORT
  },
  sequelize: {
    username: process.env.SERVICE_API_DB_USER,
    password: process.env.SERVICE_API_DB_PASSWORD,
    database: process.env.SERVICE_API_DB_NAME,
    host: process.env.SERVICE_API_DB_HOST,
    port: Number(process.env.SERVICE_API_DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
    pool: {
      max: Number(process.env.SERVICE_API_DB_CONNECTION_LIMIT),
      min: 0,
      acquire: 10000,
      idle: 10000,
    },
    models: `${__dirname}/../models`,
    migrationStorageTableName: 'SequelizeMeta',
    seederStorageTableName: 'SequelizeData',
    seederStorage: 'sequelize',
    define: {
      paranoid: false,
      freezeTableName: true,
      createdAt: 'RowLoadedDateTime',
      updatedAt: 'RowUpdatedDateTime',
      deletedAt: 'RowDeletedDateTime',
    },
    logging: false,
    retry: {
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
      ],
      name: 'query',
      backoffBase: 100,
      backoffExponent: 1.1,
      timeout: 60000,
      max: Infinity,
    },
  },
}