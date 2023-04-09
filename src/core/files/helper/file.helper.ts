import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { SendFileDto } from '../dto/send-file.dto';

const { path } = ENV_CONFIG.dropbox;
export function buildParamSendFile(name: string): SendFileDto {
  return {
    autorename: false,
    mode: 'add',
    mute: false,
    path: `${path}${name}`,
    strict_conflict: false,
  };
}

export function buildHeaderUpload(param: SendFileDto, token: string) {
  return {
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    Authorization: `Bearer ${token}`,
    'Dropbox-API-Arg': JSON.stringify(param),
    'Content-Type': 'application/octet-stream',
  };
}

export function buildHeaderGetLink(token: string) {
  return {
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Content-Type': 'application/json',
  };
}
