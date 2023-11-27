import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const URI_DB = process.env.URI_DB;
const DB_NAME = process.env.DB_NAME;
const SECRET = process.env.SECRET;
const ALG = process.env.ALG;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;
const URL_BACKEND = process.env.URL_API
const ACCESS_TOKEN_MERCADOPAGO = process.env.ACCESS_TOKEN_MERCADOPAGO
const PUBLIC_KEY_MERCADOPAGO = process.env.PUBLIC_KEY_MERCADOPAGO
const URL_API = process.env.URL_API
const URL_FRONT = process.env.URL_FRONT
const SECRET_KEY_TICKETS = process.env.SECRET_KEY_TICKETS

export default { PORT, URI_DB, DB_NAME, SECRET, ALG, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, URL_BACKEND, ACCESS_TOKEN_MERCADOPAGO, PUBLIC_KEY_MERCADOPAGO, URL_API, SECRET_KEY_TICKETS, URL_FRONT};