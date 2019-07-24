const path = require('path');

const BASE_PATH = path.join(__dirname, 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: {
            host: "ec2-54-235-100-99.compute-1.amazonaws.com",
            user: "wplqipilndlzcr",
            password: "fb21f206daadbf6c85560f4cd971e8b1bfa3ad53a9246c8f24c801656da4de68",
            database: "d6njoctshumcgs"
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: {
            host: "127.0.0.1",
            user: "postgres",
            password: "postgres",
            database: "koa_login"
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
