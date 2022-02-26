import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUND } from '../auth/constants';

export function encrpterMdp(password: string) {
  return bcrypt.hashSync(password, SALT_OR_ROUND);
}

export function comparerMdps(simplePwd: string, hashPwd: string) {
  return bcrypt.compareSync(simplePwd, hashPwd);
}
