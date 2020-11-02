import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
        <TextField
          type="text"
          placeholder="Username"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setUsername(target.value)
          }
        />
        <TextField
          type="password"
          placeholder="Password"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setPassword(target.value)
          }
        />
        {formHasError ? <span>Incorrect Credentials</span> : <div />}

        <Button
          type="submit"
          variant="contained"
          startIcon={<AccountBoxIcon />}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default SignIn;
