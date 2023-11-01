import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const URI_DB = process.env.URI_DB;
const DB_NAME = process.env.DB_NAME;

export default { PORT, URI_DB, DB_NAME}