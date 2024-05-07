import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async saveUser(user: UserEntity) {
    this.users.push(user);
  }

  async listUsers() {
    return this.users;
  }

  async singleUserList(uuid: string) {
    return this.searchByUuid(uuid);
  }

  async existsWithEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);
    return possibleUser !== undefined;
  }

  async updateUser(uuid: string, updateData: Partial<UserEntity>) {
    const user = this.searchByUuid(uuid);
    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'uuid') {
        return;
      }
      user[key] = value;
    });
    return user;
  }

  async deleteUser(uuid: string) {
    const user = this.searchByUuid(uuid);

    this.users = this.users.filter((userSave) => userSave.uuid !== uuid);

    return user;
  }

  private searchByUuid(uuid: string) {
    const possibleUser = this.users.find((userSave) => userSave.uuid === uuid);

    if (!possibleUser) {
      throw new Error('User does not exist');
    }

    return possibleUser;
  }
}
