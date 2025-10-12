import express, { Express, Router } from "express";
import { Server } from "http";
import { errorConverter, errorHandler } from "./middleware";
import { connectDB } from "./database";
import config from "./config/config";
import routes from "./routes";
import cors, { CorsOptions } from 'cors';

const app: Express = express();
let server: Server;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

//app.use(tournamentRouter);
routes.forEach((route: Router) => app.use(route));
app.use(errorConverter);
app.use(errorHandler);

connectDB();

server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
