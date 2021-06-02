import { objProp } from 'fp-tools';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
/* import sadPanda from '../../assets/panda.png'; */
import { Task } from '../types/Task.type';

import ReactHtmlParser from 'react-html-parser';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import Icon from '@chakra-ui/icon';
import { IoMdFiling } from 'react-icons/io';
import { Input } from '@chakra-ui/input';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

type NotePadProps = {
  devOps?: boolean;
  task: Task | any;
};
export const NotePad: React.FC<NotePadProps> = ({ devOps = false, task }) => {
  const dispatch = useDispatch();

  /* const onChange = buildOnChange<TaskType>(updateTasks, dispatch); */
  const onChange = (x: any) => null;

  const [card, setCard] = useState('stats');
  const cards = ['notes', 'description', 'stats'];

  const handleCardChange = (view: string) => {
    if (card === view) {
      const index = cards.indexOf(view);
      if (index > -1 && index < cards.length - 1) {
        setCard(cards[index + 1]);
      }
    } else {
      setCard(view);
    }
  };

  const viewCard = (view: string) => {
    return card === view
      ? { flexGrow: 1 }
      : { height: 0, overflow: 'hidden', padding: 0, border: 'none' };
  };

  const getStatus = () => {
    if (task.isActive) {
      return 'In Progress';
    }
    if (task.completed) {
      return 'Task Completed';
    }
    if (task.accumulatedTime > 0) {
      return 'Paused';
    }
    return 'Ready to Start';
  };

  const read = objProp(task);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Notes</Tab>
          <Tab>Description</Tab>
          <Tab>Stats</Tab>
        </TabList>
        <TabPanels>
          <TabPanel height="calc(100vh - 10.7rem)">
            <Flex flexDir="column">
              <Textarea
                backgroundColor="#eee"
                color="black"
                padding="1rem"
                fontFamily="lato, serif"
                letterSpacing="1px"
                transition="all .5s"
                overflowY="auto"
                flexGrow={1}
                name="notes"
                value={read('notes')}
                style={viewCard('notes')}
                minHeight="calc(100vh - 12.5rem)"
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <div
              className="notepad__description"
              style={viewCard('description')}
            >
              {task && task.devOpsDescription ? (
                ReactHtmlParser(read('devOpsDescription'))
              ) : (
                <div className="sad-panda">
                  <h2>Nobody gave me a description...</h2>
                  {/* <img src={sadPanda} alt="Sad Panda" /> */}
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="notepad__stats" style={viewCard('stats')}>
              {task && (
                <>
                  <div className="notepad__row">
                    <p className="notepad__label notepad__label--title">
                      Title
                      <Icon as={IoMdFiling} />
                    </p>
                    <Textarea
                      name="title"
                      className="notepad__textarea notepad__stat"
                      value={read('title')}
                    />
                  </div>
                  <div className="notepad__row">
                    <p className="notepad__label notepad__label--title">
                      Parent
                      <Icon title="create" className="notepad__icon" />
                    </p>
                    <Textarea
                      name="parent"
                      className="notepad__textarea notepad__stat"
                      value={read('parent')}
                    />
                  </div>
                  <div className="notepad__row">
                    <p className="notepad__label">Ticket Number</p>
                    <p className="notepad__stat">{read('id').toUpperCase()}</p>
                  </div>
                  {task.iterationPath && (
                    <div className="notepad__row">
                      <p className="notepad__label">Iteration Path</p>
                      <p className="notepad__stat">{read('iterationPath')}</p>
                    </div>
                  )}
                  {task.workItemType && (
                    <div className="notepad__row">
                      <p className="notepad__label">Work Item Type</p>
                      <p className="notepad__stat">{read('workItemType')}</p>
                    </div>
                  )}
                  <div className="notepad__row">
                    <p className="notepad__label">
                      Priority
                      <Icon title="create" className="notepad__icon" />
                    </p>
                    <Input
                      name="priority"
                      className="notepad__input notepad__stat"
                      value={read('priority')}
                    />
                  </div>
                  {task.severity && (
                    <div className="notepad__row">
                      <p className="notepad__label">Severity</p>
                      <p className="notepad__stat">{read('severity')}</p>
                    </div>
                  )}
                  {task.createdBy && (
                    <div className="notepad__row">
                      <p className="notepad__label">Created By</p>
                      <p className="notepad__stat">{read('createdBy')}</p>
                    </div>
                  )}
                  <div className="notepad__row">
                    <p className="notepad__label">Created On</p>
                    <p className="notepad__stat">{read('createdDate')}</p>
                  </div>
                  {task.assignedTo && (
                    <div className="notepad__row">
                      <p className="notepad__label">Assigned To</p>
                      <p className="notepad__stat">{read('assignedTo')}</p>
                    </div>
                  )}
                  <div className="notepad__row">
                    <p className="notepad__label">Started On</p>
                    <p className="notepad__stat">{read('startedDate')}</p>
                  </div>
                  <div className="notepad__row">
                    <p className="notepad__label">
                      Estimated Hours
                      <Icon title="create" className="notepad__icon" />
                    </p>
                    <Input
                      name="originalEstimate"
                      className="notepad__input notepad__stat"
                      value={read('originalEstimate')}
                    />
                  </div>
                  <div className="notepad__row">
                    <p className="notepad__label">Current Status</p>
                    <p className="notepad__stat">{getStatus()}</p>
                  </div>
                </>
              )}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
