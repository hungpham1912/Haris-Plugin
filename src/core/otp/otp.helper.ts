import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export function generateOTP(n: number) {
  const digits = ENV_CONFIG.system.digitals;
  let OTP = '';
  for (let i = 0; i < n; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
