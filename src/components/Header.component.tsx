import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Settings } from './Settings.component';
import { FiUpload } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { action } from '../utilities/redux.utils';
import { APP } from '../redux/_keys';
import { DuxOp } from '../types/ReduxOperation.enum';

interface HeaderProps {}
export const Header: React.FC<HeaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();

  return (
    <>
      <Flex alignItems="center" width="100%" p="1rem" color="steelblue">
        <Box flexGrow={1}>
          <Heading as="h1">My Task Buddy</Heading>
          <Text as="p" color="white">
            Is it Friday yet?
          </Text>
        </Box>
        <Box>
          <IconButton
            aria-label="Upload File"
            bg="transparent"
            border="1px solid #333"
            borderRadius="5px"
            icon={<FiUpload />}
            mr="1rem"
            onClick={() =>
              dispatch(
                action(APP, DuxOp.update, {
                  fileUpload: true,
                })
              )
            }
            tabIndex={0}
          />
          <IconButton
            aria-label="Change Color Mode"
            bg="transparent"
            border="1px solid #333"
            borderRadius="5px"
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            mr="1rem"
            onClick={toggleColorMode}
            tabIndex={0}
          />
          <Settings />
        </Box>
      </Flex>
    </>
  );
};
