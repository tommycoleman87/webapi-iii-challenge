module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};


//postgres://qeyrktutzuxlow:cf9dfbd91198ea64a8eca488f180648f1bca2b73233464c7b5cc86233a98b9fe@ec2-107-20-167-241.compute-1.amazonaws.com:5432/desgo5oouk56es
