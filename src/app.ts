import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './config/db';
const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function (req, res, next) {
  res.status(200).json({ message: 'Hello Nodejs' });
});

const port = 4000;
app.listen(port, (err, done) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log('Server is running... on port ' + port);
});
