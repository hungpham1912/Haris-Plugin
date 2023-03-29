import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('merchants')
export class Merchant extends BaseEntity {
  @Column({ nullable: false, default: '' })
  merchantCode: string;

  @Column({ nullable: false, default: false })
  isAccepted: boolean;

  @Column({ nullable: false })
  email: string;
}
