import { BaseEntity } from '@/common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { VariantSize } from './variant-size.entity';

@Entity('sizes')
export class Size extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => VariantSize, (variantSize) => variantSize.size, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  variantSize!: VariantSize[];
}
