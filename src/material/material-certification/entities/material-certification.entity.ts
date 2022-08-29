import { ProviderMaterials } from './../../../provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialCertification extends MaterialBaseEntity {
  @OneToMany(
    () => ProviderMaterials,
    ({ materialCertifications }) => materialCertifications,
    { onDelete: 'CASCADE' },
  )
  providerMaterial: ProviderMaterials;

  @Column({ name: 'provider_material_id' })
  providerMaterialId: string;
}
