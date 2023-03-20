import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('merchant_info')
export class MerchantInfo extends BaseEntity {
  @Column({ nullable: false })
  privateKey: string;

  @Column({ nullable: false })
  publicKey: string;

  @Column({ nullable: false })
  merchantId: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.id, {
    eager: true,
  })
  merchant: Merchant;
}
