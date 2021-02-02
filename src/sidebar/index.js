import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <h3> Sidebar </h3>
    )
  }
}

export default withStyles(styles)(SidebarComponent)
