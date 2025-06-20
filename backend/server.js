import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'

import router from "./api/optimize/routes.js";

const app = express();
app.use(cors())
const domain = `http://localhost`;
const port = 3000;

app.use(bodyParser.json());

app.use("/api/", router);

app.listen(`${port}`, () =>
  console.log(`Server running on port: ${domain}:${port}`)
);
