import { DeleteDateColumn, Index, PrimaryColumn } from 'typeorm';
import BaseEntity from './base.entity';

class MaterialBaseEntity extends BaseEntity {
  @PrimaryColumn()
  @Index()
  name: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_on' })
  deletedOn: Date;
}

export default MaterialBaseEntity;
