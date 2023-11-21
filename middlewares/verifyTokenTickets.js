import jwt from 'jsonwebtoken'
import config from '../utils/config.js';

export default function verifyTokenTicket (req, res, next){
    try {
        const token = req.query.auth;
        console.log('-----------TOKEN-----------')
        console.log(token)
        const decoded = jwt.verify(token, config.SECRET_KEY_TICKETS);
        if(decoded){
            next()
        }
    } catch (error) {
        return res.render('notauthorized');
    }
}

