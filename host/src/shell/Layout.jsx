import React, { Suspense } from 'react';
import clsx from 'clsx';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: theme.mixins.toolbar,
  flex: {
    display: 'flex',
  },
  p2: {
    padding: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const { content, toolbar, flex, p2 } = useStyles();

  return (
    <div className={flex}>
      <CssBaseline />
      <SideBar />

      <main className={clsx(content, p2)}>
        <div className={toolbar} />
        <Suspense fallback={<div>Loading ...</div>}>
          <div>{children}</div>
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
