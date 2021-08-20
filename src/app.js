import express from 'express';
import config from './config';
import cors from 'cors';
import indexRoute from './routers/index';


const app = express();

app.set('port', config.port);

//middlewares para poder recibir los parametros que se envian desde los formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors({
    origin : '*'
}));

//agregando rutas 
app.use(indexRoute);
/*app.use(tipoReclamoRoutes);
app.use(sedeRoutes);
app.use(estadoReclamoRoutes);*/

export default app;