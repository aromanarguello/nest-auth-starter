import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialTexture extends MaterialBaseEntity {
  @OneToMany(
    () => ProviderMaterials,
    ({ materialTextures }) => materialTextures,
    { onDelete: 'CASCADE' },
  )
  providerMaterial: ProviderMaterials;

  @Column({ name: 'provider_material_id' })
  providerMaterialId: string;
}
