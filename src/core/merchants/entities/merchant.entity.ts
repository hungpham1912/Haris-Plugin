import { KeyInfo } from 'src/core/key_info/entities/key_info.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('merchants')
export class Merchant extends BaseEntity {
  @Column({ nullable: false, default: '' })
  merchantCode: string;

  @Column({ nullable: false, default: false })
  isAccepted: boolean;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => KeyInfo, (keysInfo) => keysInfo.merchant, { eager: true })
  keysInfo: KeyInfo[];
}
