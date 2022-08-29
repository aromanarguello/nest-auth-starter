import { ProviderMaterials } from 'src/provider-materials/entities/provider-materials.entity';
import MaterialBaseEntity from 'src/utils/materialBase.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MaterialColor extends MaterialBaseEntity {
  @OneToMany(() => ProviderMaterials, ({ materialColors }) => materialColors, {
    onDelete: 'CASCADE',
  })
  providerMaterial: ProviderMaterials;

  @Column({ name: 'provider_material_id' })
  providerMaterialId: string;
}
