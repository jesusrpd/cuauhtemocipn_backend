import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const URI_DB = process.env.URI_DB;
const DB_NAME = process.env.DB_NAME;
const SECRET = process.env.SECRET;
const ALG = process.env.ALG;
const ACCESS_KEY_ID= process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY= process.env.SECRET_ACCESS_KEY;
const REGION= process.env.REGION

export default { PORT, URI_DB, DB_NAME, SECRET, ALG, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION};