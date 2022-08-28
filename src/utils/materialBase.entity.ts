import {
  BaseEntity as Base,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class MaterialBaseEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_on' })
  updatedOn: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_on' })
  deletedOn: Date;
}

export default MaterialBaseEntity;
