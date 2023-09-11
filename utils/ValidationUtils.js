import { validationResult } from "express-validator";

export class ValidationUtils {

    validateProductFields(fields) {
        for (const field of Object.values(fields)) {
            if (field === null || field === undefined) {
                return false;
            }
        }
        return true;
    }

    validateField( req, res, next ) {
        const errors = validationResult(req);
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors);
        }
        next()
    }

}