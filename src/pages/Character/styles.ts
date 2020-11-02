import styled from 'styled-components';
import { lighten, darken } from 'polished';

import Paper from '@material-ui/core/Paper';

export const Content = styled.div`
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
`;

export const CustomPaper = styled(Paper)`
  padding: 20px;

  background-color: ${(props) => {
    if (props.theme.name === 'light') {
      return lighten(0.1, props.theme.colors.contentBackground);
    }
    return darken(0.1, props.theme.colors.contentBackground);
  }} !important;
  color: ${(props) => props.theme.colors.text} !important;

  font-size: 16px;
`;
