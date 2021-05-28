/* istanbul ignore file */
import React from 'react';

import { createDevTools } from '@redux-devtools/core';
import LogMonitor from '@redux-devtools/log-monitor';
import DockMonitor from '@redux-devtools/dock-monitor';

export const ReduxDevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-g"
    defaultIsVisible={true}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export const NoMouseDays: React.FC = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  // Disable Mouse on Mondays
  if (dayOfWeek === 1) {
    //@ts-ignore
    /* import('no-mouse-days'); */
  }
  return <></>;
};

export const DevTools: React.FC = () => {
  return process.env.NODE_ENV === 'development' ? (
    <>
      {/* <NoMouseDays /> */}
      <ReduxDevTools />
    </>
  ) : null;
};
