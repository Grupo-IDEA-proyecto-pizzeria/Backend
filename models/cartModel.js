export class Cart {

  constructor ( user, items, total, state ) {
    this.user = String(user);
    this.items = items;
    this.total = Number(total);
    this.state = Boolean(state);
  }

}