import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './config/db';
import authRoutes from './routes/authRoutes';
const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRoutes);
app.get('/', function (req, res, next) {
  res.status(200).json({ message: 'Hello Nodejs' });
});

const port = 8080;
app.listen(port, (err, done) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log('Server is running... on portsssssss ' + port);
});
