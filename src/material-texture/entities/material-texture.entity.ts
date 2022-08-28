import BaseEntity from 'src/utils/base.entity';
import { PrimaryGeneratedColumn, Column, Index, Entity } from 'typeorm';

@Entity()
export class MaterialTexture extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;
}
