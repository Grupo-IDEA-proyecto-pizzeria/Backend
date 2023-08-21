
export class User {

  constructor ( name, email, state ) {
    this.name = String(name);
    this.email = String(email);
    this.state = Boolean(state);
  }

}