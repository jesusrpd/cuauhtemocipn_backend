import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

export default function verifyAuth(req, res, next){
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({status: false, data: 'Acceso denegado: Token invalido'});
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.SECRET);
        // Puedes verificar el contenido del token y realizar acciones según sea necesario aquí
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({status: false ,data: 'Token no válido' });
    }
}