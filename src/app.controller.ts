import sequelize, { connectDB } from "./DB/connection.ts";
import * as models from "./DB/index.ts"

function bootstrap(app: any, express: any): void{
    // parse data from request body
    app.use(express.json());

    // to connect database
    connectDB();

    sequelize.sync()
}

export default bootstrap;