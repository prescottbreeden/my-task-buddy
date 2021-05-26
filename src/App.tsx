import { Flex } from '@chakra-ui/react';
import { Header } from './components/Header.component';
import { Tasks } from './components/Tasks.component';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
