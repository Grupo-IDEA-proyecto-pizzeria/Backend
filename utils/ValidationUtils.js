export class ValidationUtils {

    validateProductFields(fields) {
        for (const field of Object.values(fields)) {
            if (field === null || field === undefined) {
                return false;
            }
        }
        return true;
    }

}