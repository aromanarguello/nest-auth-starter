import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialUsage extends MaterialBaseEntity {
  @OneToMany(() => ProviderMaterials, ({ materialUsage }) => materialUsage, {
    onDelete: 'CASCADE',
  })
  providerMaterials: ProviderMaterials[];
}
