import { Platform } from 'react-native';

const theme = {
  text: {
    fontFamily: Platform.select({
      android: 'Roboto',
      ios: 'Helvetica',
      default: 'System'
    }),
  }
};

export default theme;