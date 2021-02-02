import React from "react"
import firebase from "firebase"

import "./App.css"

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
    const { notes } = this.state
    return <h1> Hello World </h1>
  }
}

export default App
