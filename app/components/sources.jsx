import React from 'react';
import jquery from 'jquery';
import * as ApiActions from './../actions/actions';
import Store from './../store/store';

class Source extends React.Component {
  constructor() {
    super();
    this.state = {
      atStart: 'loading...',
      sources: [] };
    this.matchedSources = [];

    this.getArticles = this.getArticles.bind(this);
    this.searchSources = this.searchSources.bind(this);
  }

  componentWillMount() {
    const url = 'https://newsapi.org/v1/sources';
// connects to the api and get all the news sources
    jquery.get(url, (response) => {
      // return an array of objects containing news source
      // id and name
      const sourcesArray = response.sources.map((source) => {
        return { id: source.id, name: source.name };
      });
// change the state of the component
      this.setState({
        sources: response.status === 'ok' ?
        sourcesArray : 'Sources are unavailable'
      });
    });
// listening for change event from the store ie when
// a link is clicked and the source changes
    Store.on('change', () => {
      this.matchedSources = Store.matchedSourceList;
      this.setState({ source: this.matchedSources });
    });
  }

  getArticles(event) {
    event.preventDefault();
    ApiActions.getArticlesFromApi(event.target.getAttribute('value'));
  }

  searchSources(event) {
    ApiActions.searchThroughSources(event.target.value, this.state.sources);
  }

  render() {
    const sources = this.state.sources;
    let loadedSources = null;
    const matchedSources = this.matchedSources;
    const finalSource = matchedSources.length === 0 ?
    sources : matchedSources;

// display the sources when loaded from newsapi.org
    if (finalSource.length > 0) {
      // check if there wasn't any match after search
      if (typeof finalSource === 'string') {
        loadedSources = <h4>{finalSource}</h4>;
      } else {
        // map the sources since there were matches
        loadedSources = finalSource.map((data, i) => {
          return (<div key={i}>
          <a className="" href="#" value={data.id}
            onClick={this.getArticles}>
            {data.name}</a>
        </div>);
        });
      }
    } else {
      loadedSources = <h4>{this.state.atStart}</h4>;
    }

    return (
      <div className="col-md-3" id="news-source">
        <h3 className="">News Channels</h3>
        <div>
          <input className="form-control" placeholder="search news sources"
            onChange={this.searchSources} />
          {loadedSources}
        </div>
      </div>
    );
  }
}

export default Source;
