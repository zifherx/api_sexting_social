import express from 'express'
import morgan from 'morgan'
import path from 'path'
import indexRoutes from './routes'
import 'dotenv/config'
import cors from 'cors'
import * as initData from './libs/initialSetup'

//Server Instance
const app = express();

initData.createRoles();
initData.createAdminUser();

//Settings
app.set('port', Number(process.env.PORT) || 4500);

//Middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api', indexRoutes);

//Static
app.use('/public/uploads', express.static(path.resolve('uploads')))

export default app;