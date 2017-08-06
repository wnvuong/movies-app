import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import SearchResults from './SearchResults.js';
import SearchBar from './SearchBar.js';
import ShowDetail from './ShowDetail.js';
import Loading from './Loading.js';
import api from './utils/api.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryText: "",
      searchResults: [],
      loading: false,
      dirty: false
    };
  }

  componentDidMount() {
    console.log('mount')
  }

  componentDidUpdate() {
    console.log('update')
  }

  
  handleQueryTextInput(queryText) {
    // this.setState({
    //   queryText: queryText
    // });
  }

  handleSubmit(router, queryText) {
    if (queryText && queryText !== '') {
      router.history.push(`/search?q=${queryText}`);
      this.search(queryText);
    }
  }

  search(queryText) {
    if (queryText && queryText !== '') {
      this.setState({
        loading: true,
        queryText: queryText
      });
      api.search(queryText).then(res => {
        if (res && res.success) {
          this.setState({
            searchResults: res.payload,
            loading: false,
            dirty: true
          });
        }
      });
    }
  }

  render() {
    let opacity = this.state.loading ? '1' : '0'
    return (
      <Router>
        <div>
          <Route path="/" render={(router) => <div>
            
            <SearchBar 
              onQueryTextInput={this.handleQueryTextInput.bind(this)}
              onSubmit={this.handleSubmit.bind(this, router)}
            />
            <Loading style={{opacity: opacity }} />
            {this.state.searchResults.length === 0 && this.state.dirty && !this.state.loading ? 'No Results' : ''}
          </div>} />
          <Route path="/search" render={() => <SearchResults queryText={this.state.queryText} searchResults={this.state.searchResults} />}/>
          <Route path="/show" component={ShowDetail}/>
        </div>
      </Router>
    );
  }
}

export default App;
