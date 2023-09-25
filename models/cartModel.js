import { checkSchema } from "express-validator";

export class CartModel {

  constructor ( user, items, total ) {
      this.user = user;
      this.items = items;
      this.total = Number(total);
      this.state = true;
  }

  static validator() {
      return checkSchema({
          user: { 
              exists: { errorMessage: 'User es obligatorio' },
              isObject: { errorMessage: 'User no es un objeto', },
          },
          "user.name": {
              exists: { errorMessage: 'Name es obligatorio' },
              isString: { errorMessage: 'Name no es un string' },
              trim: true,
              notEmpty: { errorMessage: 'Name está vacio' }
          },
          "user.phoneNumber": {
              exists: { errorMessage: 'PhoneNumber es obligatorio' },
              isNumeric: { errorMessage: 'PhoneNumber no es un número' },
              isLength: { options: { min: 8, max: 12 }, errorMessage: 'PhoneNumber debe tener 10 dígitos' }
          },
          "user.address": {
              exists: { errorMessage: 'Address es obligatorio' },
              isObject: { errorMessage: 'Address no es un objeto', }
          },
          "user.address.street": {
              exists: { errorMessage: 'Street es obligatorio' },
              isString: { errorMessage: 'Street no es un string' },
              trim: true,
              notEmpty: { errorMessage: 'Street está vacio' }
          },
          "user.address.number": {
              exists: { errorMessage: 'Number es obligatorio' },
              isNumeric: { errorMessage: 'Number no es un número' }
          },
          "user.address.details": {
              exists: { errorMessage: 'Details es obligatorio' },
              isString: { errorMessage: 'Details no es un string' },
              trim: true,
              notEmpty: { errorMessage: 'Details está vacio' }
          },
          items: {
              exists: { errorMessage: 'Items es obligatorio' },
              isArray: { errorMessage: 'Items no es un array',}
          },
          "items.*.product": {
              exists: { errorMessage: 'Product es obligatorio' },
              isString: { errorMessage: 'Product no es un string', },
              trim: true,
              notEmpty: { errorMessage: 'Product está vacio' },
              toLowerCase: true
          },
          "items.*.quantity": {
              exists: { errorMessage: 'Quantity es obligatorio' },
              isNumeric: { errorMessage: 'Quantity no es un número', }
          },
          "items.*.price": {
              exists: { errorMessage: 'Price es obligatorio' },
              isNumeric: { errorMessage: 'Price no es un número', }
          },
          "items.*.subtotal": {
              exists: { errorMessage: 'Total es obligatorio' },
              isNumeric: { errorMessage: 'Total no es un número', }
          },
          total: {
              exists: { errorMessage: 'Total es obligatorio' },
              isNumeric: { errorMessage: 'Total no es un número' }
          },
      });
  }

}