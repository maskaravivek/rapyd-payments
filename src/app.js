import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import hpp from 'hpp';
import cors from 'cors';
import routes from './routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        console.log('App initialized');

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    initializeMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(hpp());
        this.app.use(compression());
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(cookieParser());
        
        // Configure CORS to accept requests from http://127.0.0.1:8080/
        this.app.use(cors({
            origin: "*",
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }

    initializeRoutes() {
        this.app.use('/api', routes);
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on http://localhost:${this.port}`);
        });
    }
}

export default App;
