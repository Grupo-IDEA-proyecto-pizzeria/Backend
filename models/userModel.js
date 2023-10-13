
export class User {

  constructor ( name, lastname, email, rol, token, anonymous, state) {
    this.name = String(name);
    this.lastname = String(lastname);
    this.email = String(email);
    this.rol = String(rol);
    this.token = String(token);
    this.anonymous = Boolean(anonymous);
    this.state = Boolean(state);
  }

}