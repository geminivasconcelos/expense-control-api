import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  name: string;

  @Column()
  typeExpense: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valueExpense: number;

  @Column()
  typePayment: string;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  @JoinColumn({ name: 'userId' })
  user: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: UserEntity;
}
