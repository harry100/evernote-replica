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

  render() {
    const { notes, selectedNoteIndex } = this.state
    return (
      <div>
        <SidebarComponent
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
        />
        <EditorComponent></EditorComponent>
      </div>
    )
  }
}

export default App
