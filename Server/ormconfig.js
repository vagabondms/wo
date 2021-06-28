require('dotenv').config();
console.log(process.env.DATABASE);
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.PORT,
  username: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/entity/*.js'],
  logging: false,
  synchronize: true,
  dropSchema: true, // each time connection being established, DB will be refreshed
};
