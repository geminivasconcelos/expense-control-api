import { UserEntity } from './user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/UserList.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('/users') // o @controler já nos da uma rota, como não passamos parametros a rota será a rota raiz, ou seja, 3000, agora se passar
// uma rota dentro de controler isso será sua rota, nessa caso nossa rota é /usuarios
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  // private usuarioRepository = new UsuarioRepository();

  @Post()
  async criateUser(@Body() dataUser: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dataUser.email;
    userEntity.password = dataUser.password;
    userEntity.name = dataUser.name;
    userEntity.lastname = dataUser.lastName;
    userEntity.repeatPassword = dataUser.repeatPassword;
    userEntity.cursos = dataUser.cursos;
    userEntity.instituicoes = dataUser.instituicoes;
    userEntity.uuid = uuid();

    const returnCreateUser = await this.userService.createUser(userEntity);
    if (returnCreateUser.status === 409) {
      return {
        message: returnCreateUser.message,
        status: returnCreateUser.status,
      };
    } else {
      return {
        message: 'User created successfully!',
        user: new UserListDTO(
          userEntity.name,
          userEntity.lastname,
          userEntity.uuid,
          userEntity.cursos,
          userEntity.instituicoes,
        ),
      };
    }
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userService.listUsers();
    return savedUsers;
  }

  @Get('/:uuid')
  async singleListUser(@Param('uuid') uuid: string) {
    const possibleUserFound = await this.userService.singleListUser(uuid);
    return possibleUserFound;
  }

  @Put('/:uuid')
  async updateUser(
    @Param('uuid') uuid: string,
    @Body() dataToUpdate: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(uuid, dataToUpdate);

    return {
      user: updatedUser,
      message: 'User updated successfully!',
    };
  }

  @Delete('/:uuid')
  async deleteUser(@Param('uuid') uuid: string) {
    const userRemoved = await this.userService.deleteUser(uuid);

    return {
      user: userRemoved,
      message: 'User successfully deleted',
    };
  }
}
