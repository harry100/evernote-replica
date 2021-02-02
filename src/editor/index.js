import React from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';

import debounce from '../helpers';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      title: '',
      id: ''
    }
  }

  componentDidMount = () => {
    const { body, title, id } = this.props.selectedNote

    this.setState({
      text: body,
      title: title,
      id: id
    })
  }

  componentDidUpdate = () => {
    const { body, title, id } = this.props.selectedNote

    if (id !== this.state.id) {
      this.setState({
        text: body,
        title: title,
        id: id
      })
    }
  }

  updateBody = async (val) => {
    await this.setState({ text: val })
    this.update()
  }

  update = debounce(() => {
    console.log('UPDATING FIREBASE')
  }, 2000)

  render() {
    const { classes } = this.props
    const { text } = this.state

    return (
      <div className={classes.editorContainer}>
        <ReactQuill
          value={text}
          onChange={this.updateBody}
        />
      </div>
    )
  }
}

export default withStyles(styles)(EditorComponent)
