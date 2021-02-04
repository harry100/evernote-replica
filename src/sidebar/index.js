import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Button,
  List,
  Snackbar
} from '@material-ui/core';

import styles from './styles';
import SidebarItemComponent from '../sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
      openSnack: false
    }
  }

  newNoteBtnClick = () => {
    ('New Button Click')
    this.setState({
      addingNote: !this.state.addingNote,
      title: null
    })
  }

  updateTitle = (text) => {
    this.setState({
      title: text
    })
  }

  newNote = () => {
    const { title } = this.state
    if (
      title &&
      title.length > 0
    ) {
      this.props.newNote(this.state.title)
      this.setState({
        title: null,
        addingNote: false
      })
    } else {
      this.setState({ openSnack: true })
    }
  }

  deleteNote = (note) => {
    this.props.deleteNote(note)
  }

  selectNote = (n, i) => this.props.selectNote(n, i)

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnack: false })
  };

  render() {
    const {
      notes,
      classes,
      selectedNoteIndex
    } = this.props
    const { addingNote, openSnack } = this.state

    if (notes) {
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
          <Snackbar
            open={openSnack}
            onClose={this.handleClose}
            message="Please enter a title."
            autoHideDuration={3000}
          />

          {
            addingNote &&
              <div>
                <input
                  type="text"
                  className={classes.newNoteInput}
                  placeholder="Enter note title"
                  onKeyUp={(e) => this.updateTitle(e.target.value)}
                />
                <Button
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}
                >
                  Submit Note
                </Button>
              </div>
          }

          <List>
            {
              notes.length > 0  &&
                notes.map((_note, _index) => {
                  return (
                    <div key={_index}>
                      <SidebarItemComponent
                        _note={_note}
                        _index={_index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}
                      />
                      <Divider />
                    </div>
                  )
                })
            }
          </List>

        </div>
      )
    } else {
      return(
        <div />
      )
    }
  }
}

export default withStyles(styles)(SidebarComponent)
