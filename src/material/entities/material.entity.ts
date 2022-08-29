import BaseEntity from 'src/utils/base.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ name: 'meta_title' })
  metaTitle: string;

  @DeleteDateColumn({ name: 'deleted_on' })
  deletedOn: Date;
}
