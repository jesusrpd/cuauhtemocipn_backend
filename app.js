// index.js
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import config from './utils/config.js';
import connectDB from './db.js';
import user_routes from './routes/user.routes.js';
import giveways_routes from './routes/giveways.routes.js';
import mercadopago_routes from './routes/mercadopago.routes.js';
const app = express();

app.use(cors({
  origin: process.env.URL_FRONT
}));
connectDB(); //Conección a la BD

// Configurar body-parser para manejar solicitudes POST
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan("dev"));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Cuauhtémoc!');
});

app.use('/api', user_routes);
app.use('/api', giveways_routes);
app.use('/api', mercadopago_routes);

const server = http.createServer(app)
// Iniciar el servidor
server.listen(config.PORT, () => {
  console.log(`Servidor running on port ${config.PORT}`);
});
