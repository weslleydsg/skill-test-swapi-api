import React, { ChangeEvent, useState } from 'react';

import { useAuth } from '../../contexts/auth';

import { Container } from './styles';

const SignUp: React.FC = () => {
  const { signUp } = useAuth();

  const [formHasError, setFormHasError] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === '') {
      setFormHasError(true);
      return;
    }

    const created = await signUp(name, username, password);

    if (!created) {
      setFormHasError(true);
    }
  };

  return (
    <Container>
      <h1>Join Us!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setName(target.value)
          }
        />
        <input
          type="text"
          placeholder="Username"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setUsername(target.value)
          }
        />
        {formHasError ? <span>Username invalid.</span> : <div />}
        <input
          type="password"
          placeholder="Password"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setPassword(target.value)
          }
        />

        <button type="submit">Sign Up</button>
      </form>
    </Container>
  );
};

export default SignUp;
