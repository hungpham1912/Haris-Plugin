import { Entity } from 'typeorm';

export enum PaymentMethod {
  MOMO = 'MOMO',
  ZALO_PAY = 'ZALO_PAY',
}
@Entity('payments')
export class Payment {}
