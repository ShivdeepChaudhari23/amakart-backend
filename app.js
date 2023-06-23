import express from "express";
import morgan from "morgan";
import itemRoutes from "./routes/item-routes.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(morgan('common'));

app.use(cors());

app.use('/api/v1/items', itemRoutes);

app.all('*', (req, res, next) => {
  console.error('ERROR: No Route found');
  next();
})

export default app;