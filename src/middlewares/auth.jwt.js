import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/User'

export const verifyToken = async(req, res, next) => {
    try {
        const requestHeader = "x-access-token";

        const token = req.header(requestHeader)

        if (!token) return res.status(409).json({ message: 'Falta Token' })
        const decoded = jwt.verify(token, config.SECRET);
        res.locals.jwtPayload = decoded;
        const id = decoded.id;

        const usuario = await User.findById(id, { password: 0 });

        if (!usuario) return res.status(404).json({ message: 'No se encontró usuario.' })
        next();
    } catch (err) {
        console.log(err);
        if (err.message == 'jwt expired') {
            return res.status(403).json({ message: 'Token ha expirado' });
        } else {
            return res.status(401).json({ message: 'No Autorizado' });
        }
    }
}