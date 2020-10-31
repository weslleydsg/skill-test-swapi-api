import styled from 'styled-components';

export const Container = styled.div`
  flex: 0 1 auto;

  padding: 0 30px;

  background: ${(props) => props.theme.colors.header};
`;

export const Logo = styled.img`
  width: 100px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;

      border-right: 1px solid ${(props) => props.theme.colors.border};
    }

    a {
      font-weight: bold;
      color: ${(props) => props.theme.colors.headerText};
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const SessionButton = styled.div`
  display: flex;
  align-items: center;

  margin-left: 20px;
  padding-left: 20px;

  border-left: 1px solid ${(props) => props.theme.colors.border};

  color: ${(props) => props.theme.colors.headerText};

  a {
    color: ${(props) => props.theme.colors.headerText};
  }

  span {
    margin-right: 10px;
  }
`;
