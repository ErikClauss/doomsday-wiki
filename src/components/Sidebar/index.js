import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import React, { useContext } from 'react';

import SidebarBody from '../SidebarBody';
import SidebarHeader from '../SidebarHeader';
import SidebarMenu from '../SidebarMenu';
import { SidebarContext } from '../../contexts/Sidebar';
import useStyles from './styles';


export default function Sidebar() {
  const { drawer: drawerIsOpen, toggleDrawer } = useContext(SidebarContext);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.mixins.sidebar.treshold);
  const content = (
    <Grid container className={classes.root} direction="column" wrap="nowrap">
      <Grid item children={<SidebarHeader />} />
      <Divider />
      <Grid item className={classes.body}>
        <SidebarMenu />
        <Divider />
        <SidebarBody />
      </Grid>
    </Grid>
  );
  const drawer = (
    <SwipeableDrawer children={content}
                     classes={{paper: classes.drawerTemporary}}
                     onClose={toggleDrawer(false)}
                     onOpen={toggleDrawer(true)}
                     open={drawerIsOpen} />
  );
  const drawerFixed = (
    <Drawer children={content} classes={{paper: classes.drawerFixed}} variant="permanent" />
  );
  return isMobile ? drawer : drawerFixed;
}
