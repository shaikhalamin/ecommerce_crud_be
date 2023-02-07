import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/product/entities/product.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false })
  @Index('usersUniqueEmail', { unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  async hashPassword() {
    this.password = this.passwordHash(this.password);
  }

  passwordHash(plainPassword: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
