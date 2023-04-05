import { File } from 'src/core/files/entities/file.entity';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum KeyType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

@Entity('key_info')
export class KeyInfo extends BaseEntity {
  @Column({ nullable: false, type: 'enum', enum: KeyType })
  type: string;

  @Column({ nullable: false })
  fileId: string;

  @ManyToOne(() => File, (file) => file.id, {
    eager: true,
  })
  file: File;

  @Column({ nullable: false })
  merchantId: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.id)
  merchant: Merchant;
}
