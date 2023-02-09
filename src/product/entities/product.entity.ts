import { BaseEntity } from '@/common/entity/base.entity';
import { StorageFile } from '@/storage-file/entities/storage-file.entity';
import { User } from '@/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Variant } from './variant.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'varchar', length: 30, default: 'active' })
  status: string;

  @Column({ nullable: true, default: 0 })
  quantity: number;

  @Column({ nullable: true, type: 'varchar' })
  collection: string;

  @Column({ nullable: true, type: 'varchar' })
  videoUrlLink: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Variant, (variants) => variants.product)
  variants: Variant[];

  @OneToOne(() => StorageFile, (storageFile) => storageFile.product, {
    cascade: true,
  })
  productImage: StorageFile;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}
