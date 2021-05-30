import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { compose, randomString } from 'fp-tools';
import { useDisclosure } from '@chakra-ui/hooks';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { path } from 'ramda';
import { APP } from '../redux/_keys';
import { action } from '../utilities/redux.utils';
import { DuxOp } from '../types/ReduxOperation.enum';

export const DropZone: React.FC<any> = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    accept: 'text/csv',
  });

  const fileUpload = useSelector(path([APP, 'fileUpload']));
  const updateApp = compose(dispatch, action(APP, DuxOp.update));

  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      !fileUpload && updateApp({ fileUpload: true });
    }
  }, [acceptedFiles]); // eslint-disable-line

  React.useEffect(() => {
    if (fileUpload) {
      onOpen();
    } else {
      onClose();
    }
  }, [fileUpload, onClose, onOpen]);

  const files = acceptedFiles.map((file: any) => (
    <Tr key={randomString()}>
      <Td>{file.path}</Td>
      <Td textAlign="right">{Math.round(file.size / 1000)} Kb</Td>
      <Td textAlign="center">
        <IconButton
          bg="transparent"
          boxSize={6}
          color="red.300"
          icon={<DeleteIcon />}
          aria-label="remove"
        />
      </Td>
    </Tr>
  ));
  return (
    <>
      <section>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {children}
        </div>
      </section>
      <Modal isOpen={isOpen} onClose={() => updateApp({ fileUpload: false })}>
        <ModalOverlay />
        <ModalContent minWidth="45rem" fontFamily="serif">
          <ModalHeader>CSV File Upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="3rem">
            <Heading as="h3" fontSize="lg" mb=".5rem">
              Selected File(s)
            </Heading>
            <Table variant="unstyled">
              <Thead>
                <Tr borderY="1px solid grey">
                  <Th>File Name</Th>
                  <Th width="7rem" textAlign="right">
                    Size
                  </Th>
                  <Th textAlign="center">Remove</Th>
                </Tr>
              </Thead>
              <Tbody>{files}</Tbody>
            </Table>
            <Center mt="1rem">
              <Button onClick={open}>Open File Dialog</Button>
            </Center>
            <Center mt="2rem">
              <Box>
                <Text>Upload Template Format</Text>
                <Divider mb=".5rem" />
                <RadioGroup defaultValue="1">
                  <HStack spacing={5} direction="row">
                    <Radio colorScheme="green" value="1">
                      DevOps
                    </Radio>
                    <Radio colorScheme="green" value="2">
                      Jira
                    </Radio>
                    <Radio colorScheme="green" value="3">
                      Asana
                    </Radio>
                  </HStack>
                </RadioGroup>
              </Box>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button mr="1rem" onClick={() => updateApp({ fileUpload: false })}>
              Cancel
            </Button>
            <Button>Upload Files</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
