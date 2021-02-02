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
    this.setState({
      title: text
    })
  }

  newNote = () => {
    console.log('new Note')
  }

  deleteNote = () => {
    console.log('Delete Note')
  }

  selectNote = () => {
    console.log('Select Note')
  }

  render() {
    const {
      notes,
      classes,
      selectedNoteIndex
    } = this.props
    const { addingNote } = this.state
    console.log(notes)

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
