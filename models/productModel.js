
export class Product {

  constructor ( category, name, price, img, description, state ) {
    this.category = String(category);
    this.name = String(name);
    this.price = Number(price);
    this.img = String(img);
    this.description = String(description);
    this.state = Boolean(state);
  }

}