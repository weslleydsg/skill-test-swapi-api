import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > h1 {
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};
  }

  > form {
    display: flex;
    flex-direction: column;

    > span {
      color: red;
      margin: 8px 0;
    }

    input:not(:first-child) {
      margin-top: 10px;
      width: 300px;
    }

    button {
      margin-top: 20px;
    }
  }
`;
