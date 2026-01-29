import express, { type Application } from "express";
import logger from "./utils/logs/logger.ts";
import bootstrap from "./app.controller.ts";


const app: Application = express();
const PORT: number = 3000;

bootstrap(app, express);

app.listen(PORT, ()=>{
    logger.info(`Server running on port: ${PORT}`);
})