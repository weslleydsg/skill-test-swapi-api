import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > h1 {
    color: ${(props) => props.theme.colors.text};

    margin-bottom: 20px;
  }

  > form {
    display: flex;
    flex-direction: column;

    > span {
      margin: 8px 0;

      color: red;
    }

    input:not(:first-child) {
      width: 300px;

      margin-top: 10px;
    }

    input {
      width: 80vw;

      color: ${(props) => props.theme.colors.highlight};
      border-bottom: 2px solid ${(props) => props.theme.colors.border};

      @media (min-width: 400px) {
        max-width: 350px;
      }
    }

    div {
      > ::after {
        border-bottom: 2px solid ${(props) => props.theme.colors.tertiary};
      }
    }

    input::placeholder {
      color: ${(props) => props.theme.colors.highlight};
    }

    input:focus {
      color: ${(props) => props.theme.colors.tertiary};
    }

    button {
      width: 120px;
      align-self: flex-end;

      color: white;
      background: ${(props) => props.theme.colors.tertiary};

      margin-top: 20px;
    }
  }
`;
