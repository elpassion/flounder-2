import {
  DefaultTheme as PaperDefaultTheme,
  useTheme,
} from 'react-native-paper';
import images from './images/images';

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    textBlack: '#000000',
    textWhite: '#ffffff',
    bgGray100: '#f7fafc',
    bgGray700: '#4a5568',
    bgGray800: '#2d3748',
    bgGray900: '#1a202c',
    borderGray300: '#e2e8f0',
    textGray300: '#e2e8f0',
    textGray700: '#4a5568',
    textBlue300: '#90cdf4',
    textBlue400: '#63b3ed',
    textBlue500: '#4299e1',
    shadow: 'rgb(0,0,0, 0.1)',
  },
  fontSizes: {
    small: 12,
    middle: 16,
    big: 20,
    bigger: 21,
    biggest: 26,
  },
  margins: {
    screen: 16,
  },
  heights: {
    header: 60,
    icon: 25,
    iconBig: 60,
    logo: 30,
  },
  images: {
    ...images,
  },
};

export type AppTheme = typeof CombinedDefaultTheme;

export const useCustomTheme = () => useTheme<AppTheme>();
