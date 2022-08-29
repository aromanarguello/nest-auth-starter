import { Cart } from 'src/cart/entities/cart.entity';
import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import BaseEntity from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProviderMaterials, ({ cartItems }) => cartItems)
  @JoinColumn({ name: 'provider_materials_id' })
  providerMaterial: ProviderMaterials;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ name: 'cart_id' })
  cartId: string;
}
