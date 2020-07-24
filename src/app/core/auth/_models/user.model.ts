export class User {

  id : string
  name: string
  email: string
  password: string

  clear(): void {
    this.id = '',
    this.name = '',
    this.email = '',
    this.password = ''
  }

}
