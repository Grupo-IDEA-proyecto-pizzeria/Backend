
export class User {

  constructor ( name, email, password, state ) {
    this.name = String(name);
    this.email = String(email);
    this.password = String(password);
    this.state = Boolean(state);
  }

}