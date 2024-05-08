import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
    @PrimaryGeneratedColumn() id:string;
}
