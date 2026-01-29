import { Sequelize } from "sequelize";
import logger from "../utils/logs/logger.ts";

const sequelize = new Sequelize("book_store", "root","", {
  dialect: "mysql",
  host: "localhost",
});

export function connectDB() {
  sequelize
    .authenticate()
    .then(() => {
      logger.info("Database connected successfully");
    })
    .catch((error) => {
      logger.error("Database couldn't connect", `Error: ${error.message}`);
    });
}

export default sequelize;