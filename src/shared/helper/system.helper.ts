import { ENV_CONFIG } from '../constants/env.constant';
import crypto = require('crypto');

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
  const key = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'der',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der',
    },
  });
  return {
    privateKey: `-----BEGIN RSA PRIVATE KEY-----\n${key.privateKey.toString(
      'base64',
    )}\n-----END RSA PRIVATE KEY-----`,
    publicKey: `-----BEGIN RSA PUBLIC KEY-----\n${key.publicKey.toString(
      'base64',
    )}\n-----END RSA PUBLIC KEY-----`,
  };
}
