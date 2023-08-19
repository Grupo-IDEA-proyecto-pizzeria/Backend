export class Helper {

    removeEmptyValues(obj) {
        const newObj = {};
        for (const key in obj) {
            if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

}