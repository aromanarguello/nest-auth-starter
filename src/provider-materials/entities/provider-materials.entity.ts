import { MaterialCertification } from 'src/material/material-certification/entities/material-certification.entity';
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

import { MaterialColor } from 'src/material/material-color/entities/material-color.entity';
import { MaterialTexture } from 'src/material/material-texture/entities/material-texture.entity';
import { MaterialUsage } from 'src/material/material-usage/entities/material-usage.entity';
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

  @ManyToOne(
    () => MaterialFinish,
    ({ providerMaterials }) => providerMaterials,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'finish' })
  materialFinish: MaterialFinish;

  @Column({ name: 'finish' })
  finish: string;

  @ManyToOne(() => MaterialColor, ({ providerMaterials }) => providerMaterials)
  @JoinColumn({ name: 'color' })
  materialColor: MaterialColor;

  @Column({ name: 'color' })
  color: string;

  @ManyToOne(
    () => MaterialTexture,
    ({ providerMaterials }) => providerMaterials,
  )
  @JoinColumn({ name: 'texture' })
  materialTextures: MaterialTexture;

  @Column({ name: 'texture' })
  texture: string;

  @ManyToOne(() => MaterialUsage, ({ providerMaterials }) => providerMaterials)
  @JoinColumn({ name: 'usage' })
  materialUsage: MaterialUsage;

  @Column({ name: 'usage' })
  usage: string;

  @ManyToOne(
    () => MaterialCertification,
    ({ providerMaterials }) => providerMaterials,
  )
  @JoinColumn({ name: 'certification' })
  materialCertification: MaterialCertification;

  @Column({ name: 'certification' })
  certification: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  price: number;

  @Column({ name: 'quantity_available' })
  quantityAvailable: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'meta_title', nullable: true })
  metaTitle: string;

  @OneToMany(() => CartItem, ({ providerMaterial }) => providerMaterial)
  cartItems: CartItem[];
}
