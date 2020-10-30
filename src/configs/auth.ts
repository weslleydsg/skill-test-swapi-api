import { Secret, SignOptions } from 'jsonwebtoken';

interface AuthConfig {
  secret: Secret;
  options: SignOptions;
}

const authConfig: AuthConfig = {
  secret: 'JWT_SECRET_SKILL_TEST_SWAPI_API',
  options: {
    expiresIn: '7d'
  }
};

export default authConfig;
