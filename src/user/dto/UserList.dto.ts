export class UserListDTO {
  constructor(
    readonly id: string,
    readonly password: string,
    readonly username: string,
    readonly email: string,
  ) {}
}
