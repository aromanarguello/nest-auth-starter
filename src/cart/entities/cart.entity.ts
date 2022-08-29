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
}
