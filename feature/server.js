import express from "express";
import bodyParser from "body-parser";

import apiRoutes from "./api/optimize/routes.js";

const app = express();
const domain = `http://localhost`;
const port = 3000;

app.use(bodyParser.json());

app.use("/api/optimize", apiRoutes);

app.listen(port, ()=> console.log(`Server running on port: ${domain}:${port}`));
