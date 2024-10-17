import 'express-async-errors';
import express from 'express';

import { routes } from "./web/routes/routes";

const app = express();

app.use(express.json());
app.use(routes);

export { app };
