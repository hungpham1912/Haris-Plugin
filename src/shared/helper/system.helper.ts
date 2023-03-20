import { ENV_CONFIG } from '../constants/env.constant';

export function makeId(length: number) {
  let result = '';
  const characters = ENV_CONFIG.system.characters;
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
