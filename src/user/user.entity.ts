import { ExpenseEntity } from 'src/expense/expense.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  username: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

   // Relacionamento um-para-muitos com Gasto
   @OneToMany(() => ExpenseEntity, expense => expense.user)
   expenses: ExpenseEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
