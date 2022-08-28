import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialTexture extends MaterialBaseEntity {
  @OneToMany(() => ProviderMaterials, ({ materialUsage }) => materialUsage)
  providerMaterials: ProviderMaterials[];
}
