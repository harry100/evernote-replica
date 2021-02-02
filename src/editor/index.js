import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <h3> Editor </h3>
    )
  }
}

export default withStyles(styles)(EditorComponent)
