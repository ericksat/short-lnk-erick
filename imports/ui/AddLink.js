import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';

export default class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const {url} = this.state;
    Meteor.call('links.insert', url, (err, res) => {
      if (err) {
        this.setState( { error: err.reason })
      } else {
        this.clearState()
      }
    });
  }

  onChange(e) {
    this.setState({url: e.target.value});
  }

  clearState() {
    this.setState({url: '', isOpen: false, error: ''});
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal isOpen={this.state.isOpen} ariaHideApp={false}
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.clearState.bind(this)}
          className="boxed-view__box" overlayClassName="boxed-view boxed-view--modal"
          >
          <h1>Shorten Link</h1>
          { this.state.error ? <p>{this.state.error}</p> : undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="text" placeholder="URL" ref='url'
              onChange={this.onChange.bind(this)}
              value={this.state.url} />
            <button type="submit" className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={() => this.clearState()}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}
