export class User {
  public id: number;
  public login: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public role: string;

  constructor(id: number, login: string, firstName: string, lastName: string, password: string, role: string) {
    this.id = id;
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.role = role;
  }
}


