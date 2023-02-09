import { BaseEntity } from '@/common/entity/base.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { VariantSize } from './variant-size.entity';

@Entity('variants')
export class Variant extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @OneToMany(() => VariantSize, (variantSizes) => variantSizes.variant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  variantSizes: VariantSize[];
}
