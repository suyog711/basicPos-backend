import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '/../../.env') });
import './config/db';

import router from './routes/index';

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + '/../uploaded')));
app.use('/api/v1', router);

app.get('/', function (req, res, next) {
  res.status(200).json({ message: 'Hello Nodejs' });
});

const port: any = process.env.PORT || 8080;
app.listen(port, (err: any, done: any) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log('Server is running... on port ' + port);
});
