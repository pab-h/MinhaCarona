import 'express-async-errors';
import cors from "cors";
import express from 'express';

import { routes } from "./web/routes/routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);

export { app };
