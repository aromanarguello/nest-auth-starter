import { MaterialFinish } from 'src/material/material-finish/entities/material-finish.entity';
import { Material } from 'src/material/entities/material.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import BaseEntity from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MaterialColor } from '../../material/material-color/entities/material-color.entity';
import { MaterialTexture } from '../../material/material-texture/entities/material-texture.entity';
import { MaterialUsage } from '../../material/material-usage/entities/material-usage.entity';

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

  @ManyToOne(() => MaterialFinish, { nullable: false })
  @JoinColumn({ name: 'material_finish_id' })
  materialFinish: MaterialFinish;

  @Column({ name: 'material_finish_id' })
  materialFinishId: string;

  @ManyToOne(() => MaterialColor, { nullable: false })
  @JoinColumn({ name: 'material_color_id' })
  materialColor: MaterialColor;

  @Column({ name: 'material_color_id' })
  materialColorId: string;

  @ManyToOne(() => MaterialTexture, { nullable: false })
  @JoinColumn({ name: 'material_texture_id' })
  materialTexture: MaterialTexture;

  @Column({ name: 'material_texture_id' })
  materialTextureId: string;

  @ManyToOne(() => MaterialUsage, { nullable: false })
  @JoinColumn({ name: 'material_usage_id' })
  materialUsage: MaterialUsage;

  @Column({ name: 'material_usage_id' })
  materialUsageId: string;

  @Column({ nullable: false })
  sku: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;
}
