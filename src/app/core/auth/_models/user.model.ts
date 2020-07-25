export class User {

  id : string
  email: string
  firstName: string
  lastName: string

  clear(): void {
    this.id = '',
    this.firstName = '',
    this.email = '',
    this.lastName = ''
  }

}
