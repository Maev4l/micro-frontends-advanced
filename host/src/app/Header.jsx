import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ExtensionPoint from '../extensions/ExtensionPoint';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  container: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
  },
  flexContentBetween: {
    justifyContent: 'space-between',
  },
}));

// eslint-disable-next-line arrow-body-style
const Header = () => {
  const { appBar, flex, flexContentBetween, container } = useStyles();
  return (
    <AppBar position="fixed" color="default" className={appBar}>
      <Toolbar>
        <Box className={clsx(flex, flexContentBetween, container)}>
          <Box>
            <h2>Java(Script) Pet Store</h2>
          </Box>
          <Box>
            <ExtensionPoint id="header-right" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
