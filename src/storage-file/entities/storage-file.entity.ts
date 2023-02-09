import { BaseEntity } from '@/common/entity/base.entity';
import { Product } from '@/product/entities/product.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('storage_files')
export class StorageFile extends BaseEntity {
  @Column({ nullable: false })
  fileName: string;

  @Column({ nullable: true })
  image_url: string;

  @OneToOne(() => Product, (product) => product.productImage, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
}
