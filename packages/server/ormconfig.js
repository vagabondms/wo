require('dotenv').config();
console.log(process.env.DATABASE);
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.PORT,
  username: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['src/entity/*.ts'],
  seeds: ['src/seeds/**/*.ts'], // seed를 위함
  factories: ['src/factories/**/*.ts'], // factory를 위한 디렉토리
  logging: true,
  synchronize: true,
  //dropSchema: true, // each time connection being established, DB will be refreshed.
};
