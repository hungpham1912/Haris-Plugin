import { Column, Entity } from 'typeorm';

@Entity('dropbox_logs')
export class DropboxLog {
  @Column({ nullable: true, type: 'jsonb' })
  log: JSON;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  status: number;
}
