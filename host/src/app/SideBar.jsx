import React from 'react';
import clsx from 'clsx';
import { Drawer, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';

import { getContributions } from '../utils/contributions-manager';

const sideBarWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: sideBarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sideBarWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerContainer: {
    overflow: 'auto',
  },
}));

const SideBar = () => {
  const { drawer, drawerPaper, toolbar, drawerContainer } = useStyles();
  const { pathname } = useLocation();

  const contributions = getContributions('side-bar');
  let sideBarEntries = [];
  contributions.forEach((c) => {
    const { items } = c;
    sideBarEntries = [...sideBarEntries, ...items];
  });
  sideBarEntries.sort((a, b) => {
    const { label: label1 } = a;
    const { label: label2 } = b;
    return label1.localeCompare(label2);
  });

  return (
    <Drawer
      className={drawer}
      variant="permanent"
      classes={{
        paper: drawerPaper,
      }}
    >
      <div className={clsx(toolbar, drawerContainer)}>
        <ListItem button selected={pathname === '/'} component={Link} to="/">
          <ListItemText>Home</ListItemText>
        </ListItem>
        {sideBarEntries.map((i) => {
          const { label, route } = i;
          return (
            <ListItem
              key={route}
              button
              selected={pathname.startsWith(route)}
              component={Link}
              to={route}
            >
              <ListItemText>{label}</ListItemText>
            </ListItem>
          );
        })}
      </div>
    </Drawer>
  );
};

export default SideBar;
