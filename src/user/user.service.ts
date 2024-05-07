import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserListDTO } from './dto/UserList.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUsers() {
    const usersSaves = await this.userRepository.find();
    const usersList = usersSaves.map(
      (user) =>
        new UserListDTO(
          user.name,
          user.lastname,
          user.uuid,
          user.cursos,
          user.instituicoes,
        ),
    );

    return usersList;
  }

  async singleListUser(uuid: string) {
    const userSave = await this.userRepository.findOneBy({ uuid: uuid });
    const user = new UserListDTO(
      userSave.name,
      userSave.lastname,
      userSave.uuid,
      userSave.cursos,
      userSave.instituicoes,
    );

    return user;
  }

  async createUser(userEntity: UserEntity) {
    console.log(userEntity);
    const possibleUser = await this.userRepository.exists({
      where: { email: userEntity.email },
    });

    const returnCreateUser = possibleUser
      ? (new HttpException('Email already exists', HttpStatus.CONFLICT) as any)
      : await this.userRepository.save(userEntity);
    return returnCreateUser;
  }

  async updateUser(uuid: string, userEntity: UpdateUserDTO) {
    if (userEntity.cursos) {
      const possibleUser = await this.userRepository.findOneBy({ uuid: uuid });
      const distinctCursos = userEntity.cursos.filter(
        (curso) =>
          !possibleUser.cursos.some((dbCurso) => dbCurso.id === curso.id),
      );
      userEntity.cursos = distinctCursos.concat(possibleUser.cursos);
    }
    if (userEntity.instituicoes) {
      const possibleUser = await this.userRepository.findOneBy({ uuid: uuid });
      const distinctCursos = userEntity.instituicoes.filter(
        (instituicao) =>
          !possibleUser.instituicoes.some(
            (dbInstituicao) => dbInstituicao.id === instituicao.id,
          ),
      );
      userEntity.instituicoes = distinctCursos.concat(possibleUser.instituicoes);
    }

    await this.userRepository.update(uuid, userEntity);
  }

  async deleteUser(uuid: string) {
    await this.userRepository.delete(uuid);
  }
}
