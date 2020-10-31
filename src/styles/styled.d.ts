import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;

    colors: {
      primary: string;
      secondary: string;
      tertiary: string;

      header: string;
      headerText: string;

      text: string;
      textSecondary: string;

      background: string;
      backgroundSecondary: string;

      highlight: string;
      border: string;
    };
  }
}
