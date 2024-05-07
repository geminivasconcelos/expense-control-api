export class UserListDTO {
  constructor(
    readonly name: string,
    readonly lastname: string,
    readonly uuid: string,
    readonly cursos: Array<any>,
    readonly instituicoes: Array<any>
  ) {}
}
