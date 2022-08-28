import { ProviderMaterials } from './../../../provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialCertification extends MaterialBaseEntity {
  @OneToMany(
    () => ProviderMaterials,
    (providerMaterials) => providerMaterials.materialCertification,
  )
  providerMaterials: ProviderMaterials[];
}
