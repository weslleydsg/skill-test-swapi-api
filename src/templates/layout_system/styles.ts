import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  flex: 0 1 auto;

  background: linear-gradient(
    45deg,
    ${(props) => props.theme.colors.backgroundSecondary},
    ${(props) => props.theme.colors.background}
  );
  color: ${(props) => props.theme.colors.text};

  overflow: auto;
`;
