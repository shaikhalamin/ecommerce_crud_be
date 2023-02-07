import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Variant } from './variant.entity';
import { Size } from './size.entity';

@Entity('variant_sizes')
export class VariantSize extends BaseEntity {
  @Column()
  variantId!: number;

  @Column()
  sizeId!: number;

  @ManyToOne(() => Variant, (variant) => variant.variantSizes)
  @JoinColumn()
  variant: Variant;

  @ManyToOne(() => Size, (size) => size.variantSize)
  @JoinColumn()
  size: Size;
}
