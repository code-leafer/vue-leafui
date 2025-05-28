/**
 * TypeScript interface for CSS variables
 */

export interface ThemeVars {
  colors: {
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    white: string;
    black: string;
  };
  
  typography: {
    fontFamily: {
      primary: string;
    };
    fontSize: {
      extraLarge: string;
      large: string;
      medium: string;
      base: string;
      small: string;
      extraSmall: string;
    };
  };
  
  border: {
    radius: {
      base: string;
      small: string;
      round: string;
      circle: string;
    };
    width: {
      base: string;
      medium: string;
      thick: string;
    };
  };
  
  button: {
    fontWeight: number;
    borderColor: string;
    bgColor: string;
    textColor: string;
    disabledBgColor: string;
    disabledTextColor: string;
    height: string;
    fontSize: string;
    borderRadius: string;
    largeHeight: string;
    largeFontSize: string;
    smallHeight: string;
    smallFontSize: string;
  };
} 