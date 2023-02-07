import { BaseEntity } from '@/common/entity/base.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];
}
