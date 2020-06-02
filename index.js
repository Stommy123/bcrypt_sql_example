import express from 'express';
import cookieParser from 'cookie-parser';
import Routes from './routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/', Routes);

app.listen(4000, _ => console.log('App is listening on port 4000'));
