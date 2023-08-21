
export class User {

  constructor ( token, anonymous, state ) {
    this.token = String(token);
    this.anonymous = Boolean(anonymous);
    this.state = Boolean(state);
  }

}