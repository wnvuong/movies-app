import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    }
  }

  componentDidMount() {
    this.searchBarInput.focus();
  }

  componentWillReceiveProps(nextProps, nextState){

    let search = nextProps.location.search.replace('?q=', '')

    if (search !== this.state.queryText){
          this.props.onSubmit(search);
          this.setState({queryText: search})
    }
  }

  handleQueryTextInputChange(e) {
    // this.props.onQueryTextInput(e.target.value);
    this.setState({
      queryText: e.target.value
    }) 
  }

  handleQuerySubmit(e) {
    e.preventDefault();
    console.log(this.state.queryText)
    this.props.onSubmit(this.state.queryText);
  }

  render() {
    return (
      <form className="search-bar-container" onSubmit={this.handleQuerySubmit.bind(this)}>
        <input 
          ref={input => this.searchBarInput = input}
          className="search-bar" 
          type="text" 
          placeholder="Search..." 
          value={this.state.queryText}
          onChange={this.handleQueryTextInputChange.bind(this)}
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);