import styled from 'styled-components';
import { lighten, darken } from 'polished';

import ListItem from '@material-ui/core/ListItem';

interface CustomListItemProps {
  collapsed?: 'true' | 'false';
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 700px;
  width: 80%;

  padding: 25px;

  background: ${(props) => {
    if (props.theme.name === 'light') {
      return lighten(0.2, props.theme.colors.contentBackground);
    }
    return darken(0.1, props.theme.colors.contentBackground);
  }};

  border-radius: 5px;

  nav {
    > h1 {
      top: auto;

      margin-bottom: 20px;

      color: ${(props) => props.theme.colors.tertiary};

      font-weight: bold;
    }
  }
`;

export const CustomListItem = styled(ListItem)<CustomListItemProps>`
  padding-left: ${(props) => {
    if (props.collapsed === 'true') return '20px';
    return '0';
  }} !important;

  color: ${(props) => props.theme.colors.highlight} !important;
`;
