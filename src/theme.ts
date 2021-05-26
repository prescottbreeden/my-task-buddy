import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Cutive Mono',
    body: 'Cutive Mono',
    mono: 'Cutive Mono',
  },
});

export default theme;
