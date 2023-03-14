import { Column, Entity, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';

export enum UserRole {
  USER = 'user',
}

@Entity('users')
export class User extends BaseEntity {
  @Exclude()
  @Column({ nullable: true, default: null })
  password: string;

  @ApiProperty({
    example: true,
  })
  @Column({ nullable: true, default: false })
  verifyPhone: boolean;

  @ApiProperty({
    example: 'Hung',
  })
  @Column({ nullable: true, default: null })
  fullName: string;

  @ApiProperty({
    example: ENV_CONFIG.source.user.defaultAvatar,
  })
  @Column({
    default: ENV_CONFIG.source.user.defaultAvatar,
    nullable: false,
  })
  avatarUrl: string;

  @ApiProperty({
    example: 'user',
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @ApiProperty({
    example: '0964816205',
  })
  @Column({ nullable: true, default: null })
  phone: string;

  @ApiProperty({
    example: 'demo@gmail.com',
  })
  @Column({ nullable: true, default: null })
  email: string;

  @ApiProperty({
    example: '0964816205',
  })
  @Column({ nullable: true, default: null })
  merchantUserCode: string;

  @Column({ nullable: true, default: null })
  merchantId: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.id, {
    eager: true,
  })
  merchant: Merchant;
}
