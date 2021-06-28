import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

const app = express();

// * connect to mysql
createConnection()
  .then(() => {
    console.log('DB connected');
  })
  .catch(error => console.log(error));

// * Express configuration
app.set('port', 4000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/');
// export
export default app;
