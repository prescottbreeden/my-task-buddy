import { Flex } from '@chakra-ui/react';
import { DropZone } from './components/DropZone.component';
import { GlobalKeyboardControls } from './components/GlobalKeyboardControls.component';
import { Header } from './components/Header.component';
import { Tasks } from './components/Tasks.component';

function App() {
  return (
    <>
      <GlobalKeyboardControls />
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
    </>
  );
}

export default App;
