require('dotenv').config();
console.log(process.env.DATABASE);
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.PORT,
  username: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/server/entity/*.js'],
  seeds: ['dist/server/seeds/**/*.js'], // seed를 위함
  factories: ['dist/server/factories/**/*.js'], // factory를 위한 디렉토리
  logging: false,
  synchronize: true,
  // dropSchema: true, // each time connection being established, DB will be refreshed.
};
