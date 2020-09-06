import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '/../../.env') });
import './config/db';

import router from './routes/index';
import config from './config';

const app: Express = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (config.ALLOWED_ORIGINS.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
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
