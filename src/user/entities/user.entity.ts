import { Material } from 'src/material/entities/material.entity';
import { Project } from 'src/project/entities/project.entity';
import { UserProfile } from 'src/user/user-profile/entities/user-profile.entity';
import BaseEntity from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRoleEnum {
  ARCHITECT = 'ARCHITECT',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @ManyToMany(() => Material)
  @JoinTable({ name: 'user_material_favorites' })
  materialFavorites: Material[];

  @OneToOne(() => UserProfile, ({ user }) => user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userProfile: UserProfile;

  @Column({ name: 'refresh_token', select: false, nullable: true })
  refreshToken?: string;
}
