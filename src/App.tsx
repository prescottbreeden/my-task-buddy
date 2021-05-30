import { Flex } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { DropZone } from './components/DropZone.component';
import { Header } from './components/Header.component';
import { Tasks } from './components/Tasks.component';
import { store } from './redux/_store';

function App() {
  return (
    <>
      <Provider store={store}>
        <DropZone>
          <Header />
          <Flex
            flexDir="column"
            height="calc(100vh - 8rem)"
            border="1px solid yellow"
            color="grey"
            fontFamily="Cutive Mono"
          >
            <Tasks />
          </Flex>
        </DropZone>
      </Provider>
    </>
  );
}

export default App;
