import React from "react"
import firebase from "firebase"

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
    }
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data()
          data.id = _doc.id
          return data
        })

        console.log(notes)
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

  render() {
    const { notes, selectedNoteIndex, selectedNote } = this.state

    return (
      <div>
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
