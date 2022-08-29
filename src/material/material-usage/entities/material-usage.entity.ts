import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialUsage extends MaterialBaseEntity {
  @OneToMany(() => ProviderMaterials, ({ materialUsages }) => materialUsages, {
    onDelete: 'CASCADE',
  })
  providerMaterial: ProviderMaterials;

  @Column({ name: 'provider_material_id' })
  providerMaterialId: string;
}
