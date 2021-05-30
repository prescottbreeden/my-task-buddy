import '@fontsource/cutive-mono';
import App from './App';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { store } from './redux/_store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals(); */
