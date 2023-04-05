import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('dropbox_logs')
export class DropboxLog extends BaseEntity {
  @Column({ nullable: true, type: 'jsonb' })
  log: JSON;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  status: number;

  @Column({ nullable: true })
  path: string;
}
