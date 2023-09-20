import { checkSchema } from 'express-validator'
export class ProductModel {
    constructor ( category, name, price, img, description ) {
        this.category = String(category);
        this.name = String(name);
        this.price = Number(price);
        this.img = String(img);
        this.description = String(description);
        this.stock = 99;
        this.state = true;
    }

    static validator() {
        return checkSchema({
            category: {
                exists: { errorMessage: 'Category es obligatorio' },
                isString: { errorMessage: 'Category no es un string'},
                trim: true,
                notEmpty: { errorMessage: 'Category está vacio' },
                isLength: { options: { min: 3, /*max: 15*/ }, errorMessage: 'Category debe ser mayor a 3 caracteres' },
                toLowerCase: {},
            },
            name: {
                exists: { errorMessage: 'Name es obligatorio' },
                isString: { errorMessage: 'Name no es un string'},
                trim: true,
                notEmpty: { errorMessage: 'Name está vacio' },
                isLength: { options: { min: 3, /*max: 15*/ }, errorMessage: 'Name debe ser mayor a 3 caracteres' },
                toLowerCase: {}
            },
            price: {
                exists: { errorMessage: 'Price es obligatorio' },
                custom: { options: (val) => (val >= 0) ? true : false, errorMessage: 'Price no es entero o decimal positivo' },
            },
            description: {
                exists: { errorMessage: 'Description es obligatorio' },
                isString: { errorMessage: 'Description no es un string'},
                trim: true,
                notEmpty: { errorMessage: 'Description está vacio' },
            }
        });
    }

}