export class UserListDTO {
  constructor(
    readonly username: string,
    readonly password: string,
    readonly email: string,
    readonly id: string,
  ) {}
}
