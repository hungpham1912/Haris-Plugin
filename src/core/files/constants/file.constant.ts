import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export const FILE_CONSTANT = {
  uploadUrl: `${ENV_CONFIG.dropbox.baseUrlContent}/2/files/upload`,
  getLink: `${ENV_CONFIG.dropbox.baseUrlApi}/2/files/get_temporary_link`,
};
