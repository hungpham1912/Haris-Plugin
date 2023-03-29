import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum OtpType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

@Entity('otp')
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  otp: string;

  @Column({ nullable: false })
  expiry: number;

  @Column({ nullable: false, type: 'enum', enum: OtpType })
  type: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;
}
