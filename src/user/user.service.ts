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
    const usersSaves = await this.userRepository.find({ relations: ['expenses'] });
    const usersList = usersSaves.map(
      (user) =>
        new UserListDTO(user.id, user.username, user.email, user.password, user.expenses),
    );

    return usersList;
  }

  async findOneWithGastos(id: string): Promise<UserEntity> {
    console.log(id);
    return this.userRepository.findOne({
      where: { id },
      relations: ['expenses'],
    });
  }

  async singleListUser(id: string) {
    console.log(id)
    const userSave = await this.userRepository.findOne({
      where: { id },
      relations: ['expenses'],
    });
    const user = new UserListDTO(
      userSave.id,
      userSave.username,
      userSave.email,
      userSave.password,
      userSave.expenses,
    );

    return user;
  }

  async singleListLogin(email: string, password: string) {
    const userSave = await this.userRepository.findOneBy({
      email: email,
      password: password,
    });
    const user = new UserListDTO(
      userSave.id,
      userSave.password,
      userSave.username,
      userSave.email,
      userSave.expenses,
    );

    return user;
  }

  async createUser(userEntity: UserEntity) {
    const possibleUser = await this.userRepository.exists({
      where: { email: userEntity.email },
    });

    const returnCreateUser = possibleUser
      ? (new HttpException('Email already exists', HttpStatus.CONFLICT) as any)
      : await this.userRepository.save(userEntity);
    return returnCreateUser;
  }

  async updateUser(uuid: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(uuid, userEntity);
  }

  async deleteUser(uuid: string) {
    await this.userRepository.delete(uuid);
  }
}
