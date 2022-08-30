import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import BaseEntity from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CartStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => CartItem, ({ cart }) => cart)
  cartItems: CartItem[];

  @Column({ name: 'total_price', type: 'money' })
  totalPrice: number;

  @Column({ type: 'enum', enum: CartStatus, default: CartStatus.OPEN })
  status: CartStatus;
}
