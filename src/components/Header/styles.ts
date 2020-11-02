import styled from 'styled-components';

import Menu from '@material-ui/core/Menu';

interface ContainerProps {
  signed: boolean;
}

export const Container = styled.div<ContainerProps>`
  header {
    background: ${(props) => {
      if (props.signed) return 'linear-gradient(red, #ccc, blue)';
      return props.theme.colors.header;
    }};

    > div {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const Logo = styled.img`
  width: 100px;
`;

export const CustomMenu = styled(Menu)`
  > .MuiPaper-root.MuiMenu-paper {
    background-color: ${(props) => props.theme.colors.header};
  }

  li {
    color: ${(props) => props.theme.colors.headerText} !important;
  }
`;
