import cookieParser from "cookie-parser";
import sequelize, { connectDB } from "./DB/connection.ts";
import * as models from "./DB/index.ts"
import { errorHandler } from "./ExceptionHandler/ErrorHandler.ts";
import { bookRouter, orderRouter, userRouter } from "./modules/index.ts";

function bootstrap(app: any, express: any): void{
    // Parse data from request body
    app.use(express.json());

    // To connect database
    connectDB();

    // Sync models to database
    sequelize.sync()

    // Cookies
    app.use(cookieParser());
    
    // Routes
    app.use("/user", userRouter)
    app.use("/book", bookRouter)
    app.use("/order", orderRouter)
    
    // Global error handler
    app.use(errorHandler);

}

export default bootstrap;