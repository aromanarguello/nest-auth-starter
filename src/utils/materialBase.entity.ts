import {
  BaseEntity as Base,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import BaseEntity from './base.entity';

class MaterialBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_on' })
  deletedOn: Date;
}

export default MaterialBaseEntity;
