import { Flex } from '@chakra-ui/react';
import { Header } from './components/Header.component';
import { Tasks } from './components/Tasks.component';

function App() {
  return (
    <>
      <Header />
      <Flex height="calc(100vh - 8rem)" border="1px solid yellow" color="grey">
        <Tasks />
      </Flex>
    </>
  );
}

export default App;
