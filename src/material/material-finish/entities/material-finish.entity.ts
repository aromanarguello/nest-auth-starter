import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class MaterialFinish extends MaterialBaseEntity {
  @ManyToOne(
    () => ProviderMaterials,
    ({ materialFinishes }) => materialFinishes,
    { onDelete: 'CASCADE' },
  )
  providerMaterial: ProviderMaterials;

  @Column({ name: 'provider_material_id' })
  providerMaterialId: string;
}
