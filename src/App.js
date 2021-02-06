import React from "react"
import firebase from "firebase"
import SnackBar from '@material-ui/core/Snackbar'

import "./App.css"
import SidebarComponent from './sidebar'
import EditorComponent from './editor'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      openSnack: false
    }
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data()
          data.id = _doc.id
          return data
        })

        this.setState({ notes })

      })
  }

  selectNote = (note, i) => this.setState({
    selectedNoteIndex : i,
    selectedNote: note
  })

  noteUpdate = (id, note) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  newNote = async (title) => {
    const note = {
      title,
      body: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    const newNote = await firebase
      .firestore()
      .collection('notes')
      .add(note)

    const newId = newNote.id
    await this.setState({ notes: [ ...this.state.notes, note ]})
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(
      _note => _note.id === newId)[0]
    )
    this.selectNote(this.state.notes[newNoteIndex], 0)
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note)

    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note),
      openSnack: true
    })
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      })
    } else {
        this.state.notes.length > 1 ?
          this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1):
            this.setState({
              selectedNoteIndex: null,
              selectedNote: null
            })
      }

      firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete()
    }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnack: false })
  }

  render() {
    const { notes, selectedNoteIndex, selectedNote, openSnack } = this.state

    return (
      <div>
        <SnackBar
          open={openSnack}
          handleClose={this.handleClose}
          message="Note Deletion Success."
          autoHideDuration={3000}
        />
        <SidebarComponent
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          selectNote={this.selectNote}
          newNote={this.newNote}
          deleteNote={this.deleteNote}
        />
        {
          selectedNote &&
            <EditorComponent
              selectedNote={selectedNote}
              selectedNoteIndex={selectedNoteIndex}
              notes={notes}
              noteUpdate={this.noteUpdate}
            />
        }
      </div>
    )
  }
}

export default App
