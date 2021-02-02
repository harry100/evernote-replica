import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    }
  }

  newNoteBtnClick = () => {
    console.log('New Button Click')
    this.setState({
      addingNote: !this.state.addingNote,
      title: null
    })
  }

  updateTitle = (text) => {
    console.log(text)
  }

  render() {
    const {
      notes,
      classes,
      selectedNoteIndex
    } = this.props
    const { addingNote } = this.state

    return (
      <div className={classes.sidebarContainer}>
        <Button
          onClick={this.newNoteBtnClick}
          className={classes.newNoteBtn}
        >
          { addingNote?
            'Cancel':
            'New Note'
          }
        </Button>

        {
          addingNote &&
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter note title"
                onKeyUp={(e) => this.updateTitle(e.target.value)}
              />
            </div>
        }

      </div>
    )
  }
}

export default withStyles(styles)(SidebarComponent)
