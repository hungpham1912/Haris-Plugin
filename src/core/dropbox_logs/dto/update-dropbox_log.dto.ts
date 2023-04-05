import { PartialType } from '@nestjs/swagger';
import { CreateDropboxLogDto } from './create-dropbox_log.dto';

export class UpdateDropboxLogDto extends PartialType(CreateDropboxLogDto) {}
