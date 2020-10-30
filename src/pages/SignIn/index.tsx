import React, { ChangeEvent, useState } from 'react';

import { useAuth } from '../../contexts/auth';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [formHasError, setFormHasError] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasBeenSigned = await signIn(username, password);

    if (!hasBeenSigned) {
      setFormHasError(true);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setUsername(target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setPassword(target.value)
          }
        />
        {formHasError ? <span>Incorrect Credentials</span> : <div />}

        <button type="submit">Sign In</button>
      </form>
    </Container>
  );
};

export default SignIn;
