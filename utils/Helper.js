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

    setCollections(env) {
        let collections = {};

        switch (env) {
            case 'production':
                return collections = {
                    products: 'products',
                    carts: 'carts',
                    // users: 'users',
                }

            case 'development':
                return collections = {
                    products: 'productsTest',
                    carts: 'cartsTest',
                    // users: 'users',
                }
          
            default:
                break;
        }
    }

}