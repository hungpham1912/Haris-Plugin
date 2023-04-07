import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('logs')
export class Log extends BaseEntity {
  @Column({ nullable: true, type: 'jsonb' })
  log: any;

  @Column({ nullable: true })
  path: string;
}
