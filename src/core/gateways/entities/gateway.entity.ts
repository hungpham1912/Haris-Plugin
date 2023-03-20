import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum GatewayType {
  MOMO = 'MOMO',
  ZALO_PAY = 'ZALO_PAY',
}

@Entity('gateways')
export class Gateway extends BaseEntity {
  @Column({
    nullable: false,
    default: GatewayType.MOMO,
  })
  type: string;
  @Column({
    nullable: true,
    default: null,
  })
  partnerCode: string;
  @Column({
    nullable: true,
    default: null,
  })
  accessKey: string;
  @Column({
    nullable: true,
    default: null,
  })
  secretKey: string;
  @Column({
    nullable: true,
    default: null,
  })
  publicKey: string;

  @Column({ nullable: true, default: null })
  merchantId: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.id, {
    eager: true,
  })
  merchant: Merchant;
}
