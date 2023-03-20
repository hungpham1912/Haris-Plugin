import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('merchants')
export class Merchant extends BaseEntity {
  @Column({ nullable: false, default: '' })
  merchantCode: string;

  @Column({ nullable: false, default: '' })
  publicKey: string;

  @Column({ nullable: false, default: '' })
  privateKey: string;
}
