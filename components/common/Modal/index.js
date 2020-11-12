import { createPortal } from 'react-dom';

import React, { Component } from 'react'

export default class Modal extends Component {
  static defaultProps = {
    className: ''
  }

  state = {
    renderable: false
  }

  componentDidMount() {
    this.setState({
      renderable: true
    });
  }

  render() {
    const { className, children, show, onHide } = this.props;
    const { renderable } = this.state;
    if (renderable) {
      return createPortal(
        <div className={`modal ${show ? 'show' : ''} ${className}`}>
          <div className="modal-container container">
            {show && children}
          </div>
          <div className="modal-overlay" onClick={onHide} />
        </div>
      , document.body);
    }

    return null;
  }
}
