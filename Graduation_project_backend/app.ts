import express from "express";
import Routers from './src/Router/index'
import cors from 'cors'
import { config } from "./config";
const app = express();
const port: number = parseInt(config.port as string) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:5173'}))

app.use('/api', Routers)

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});


