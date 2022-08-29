import { MaterialCertification } from '../../material/material-certification/entities/material-certification.entity';
import { MaterialFinish } from 'src/material/material-finish/entities/material-finish.entity';
import { Material } from 'src/material/entities/material.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import BaseEntity from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MaterialColor } from '../../material/material-color/entities/material-color.entity';
import { MaterialTexture } from '../../material/material-texture/entities/material-texture.entity';
import { MaterialUsage } from '../../material/material-usage/entities/material-usage.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Entity()
export class ProviderMaterials extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider, { nullable: false })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => Material, { nullable: false })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ name: 'material_id' })
  materialId: string;

  @OneToMany(() => MaterialFinish, ({ providerMaterial }) => providerMaterial)
  materialFinishes: MaterialFinish[];

  @OneToMany(() => MaterialColor, ({ providerMaterial }) => providerMaterial)
  materialColors: MaterialColor[];

  @OneToMany(() => MaterialTexture, ({ providerMaterial }) => providerMaterial)
  materialTextures: MaterialTexture[];

  @OneToMany(() => MaterialUsage, ({ providerMaterial }) => providerMaterial)
  materialUsages: MaterialUsage[];

  @OneToMany(
    () => MaterialCertification,
    ({ providerMaterial }) => providerMaterial,
  )
  materialCertifications: MaterialCertification[];

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  price: number;

  @Column({ name: 'quantity_available' })
  quantityAvailable: number;

  @Column({ name: 'meta_title', nullable: true })
  metaTitle?: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.providerMaterial)
  cartItems: CartItem[];
}
