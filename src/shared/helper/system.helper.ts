import { ENV_CONFIG } from '../constants/env.constant';
import crypto = require('crypto');
import { SignDto } from 'src/core/merchants/dto/auth-merchant.dto';

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

export function generateKey() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
}

export function genSignature(data: SignDto, key: string) {
  try {
    const { merchantCode, timestamp, body } = data;
    const str = `${merchantCode}\n${timestamp}\n${JSON.stringify(body)}`;
    const encryptedData = crypto.createSign('RSA-SHA256');
    encryptedData.write(str);
    encryptedData.end();
    const signature = encryptedData.sign(key, 'base64');
    return { signature };
  } catch (error) {
    console.log('🚀 ~ file: auth.service.ts:50 ~ :', error);
    throw error;
  }
}
