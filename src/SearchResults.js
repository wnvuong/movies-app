import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class SearchResults extends Component {
  render() {
    console.log(this.props.queryText)
    return (
      <div style={{width: '100%'}}>
        <div className="search-results">
          {this.props.searchResults.map((searchResult, index) => {
            return <SearchResult 
              key={index}
              year={searchResult.year}
              title={searchResult.title}
              thumbnail={searchResult.thumbnail}
              url={searchResult.url}
            />
          })}
        </div>
      </div>
    );
  }
}

class SearchResult extends Component {
  render() {
    return (
      <Link to={this.props.url} className="search-result-link">
        <div className="search-result" key={this.props.index}>
          <div>
            <img src={this.props.thumbnail} alt={this.props.title + ' thumbnail'}/>
          </div>
          <div className="search-result-info">
            <div>
              {this.props.year}
            </div>
            <div>
              {this.props.title}
            </div>
          </div>
        </div>
      </Link>      
    )
  }
}

export default SearchResults;
