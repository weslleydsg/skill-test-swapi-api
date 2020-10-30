import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import authConfig from '../configs/auth';

import { JwtPayload } from '../interfaces/JwtPayload';

interface UserData {
  username: string;
  token: string;
}

const fakeUsers: UserData[] = [
  {
    username: 'weslleydsg',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indlc2xsZXlkc2ciLCJuYW1lIjoiV2VzbGxleSBHb21lcyIsInBhc3N3b3JkX2hhc2giOiIkMmEkMDgkeXAzNnU4MUZScWR1dlBEejNpTjRBT2NnTzM3bnMxc1VXT0VVRU53MS4xUFpadTZJRnpnOFMifQ.JJao7SB4jww9BO9IBFgHD6Ur4o20lMJwJnANY_UOaQg'
  }
];

const signUp = (
  name: string,
  username: string,
  password: string
): Promise<JwtPayload | null> =>
  new Promise((resolve) => {
    setTimeout(async () => {
      const exists = fakeUsers.find((user) => user.username === username);

      if (exists) {
        resolve(null);
      } else {
        const payload: JwtPayload = {
          username,
          name,
          password_hash: await bcrypt.hash(password, 8)
        };

        fakeUsers.push({
          username,
          token: jwt.sign(payload, authConfig.secret, authConfig.options)
        });

        resolve(payload);
      }
    }, 1);
  });

const signIn = (
  username: string,
  password: string
): Promise<JwtPayload | null> =>
  new Promise((resolve) => {
    setTimeout(async () => {
      const user = fakeUsers.find((fakeUser) => fakeUser.username === username);

      if (!user) {
        resolve(null);
        return;
      }

      try {
        const payload = jwt.verify(user.token, authConfig.secret) as JwtPayload;

        const isPasswordCorrect = await bcrypt.compare(
          password,
          payload.password_hash
        );
        if (!isPasswordCorrect) {
          resolve(null);
          return;
        }

        resolve(payload);
      } catch (error) {
        resolve(null);
      }
    }, 1);
  });

export { signUp, signIn };
