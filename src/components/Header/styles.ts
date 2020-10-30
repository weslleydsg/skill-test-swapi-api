import styled from 'styled-components';

export const Container = styled.div`
  flex: 0 1 auto;
  background: #ffe81f;
  padding: 0 30px;
`;

export const Logo = styled.img`
  width: 100px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #777;
    }

    a {
      font-weight: bold;
      color: #000;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const SessionButton = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #777;

  a {
    color: #000;
  }
`;
