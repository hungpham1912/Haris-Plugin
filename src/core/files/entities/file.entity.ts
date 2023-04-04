import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('files')
export class File extends BaseEntity {
  @Column({
    nullable: false,
  })
  url: string;
  @Column({
    nullable: false,
  })
  name: string;
  @Column({
    nullable: false,
  })
  size: number;
}
