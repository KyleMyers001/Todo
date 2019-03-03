class User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  constructor(id: string, email: string, password: string, firstName: string, lastName: string) {
    this._id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;