import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./api/optimize/routes.js";

const app = express();
const port = 3000;
const domain = `http://localhost:${port}/api/optimize`;

app.use(cors())
app.use(bodyParser.json());

app.use("/api/", router);

app.listen(port, () =>
  console.log(`Server running at: ${domain}`)
);
