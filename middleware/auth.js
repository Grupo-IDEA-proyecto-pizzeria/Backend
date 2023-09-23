import admin from "../config/firebase.js";

class Middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
            try {
                const decodeValue = await admin.auth().verifyIdToken(token.split(' ')[1]);
                req.user = decodeValue;

                if (decodeValue) {
                    return next();
                }
            } catch(error) {
                return res.status(401).send({
                    message: 'Usted no está autorizado'
                })
            }
        }
        return res.status(401).send({
            message: 'El token es requerido'
        })
    }
}

export default new Middleware();