import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
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
