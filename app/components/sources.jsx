import React from 'react';
import jquery from 'jquery';
import * as Action from './../actions/actions';
import Store from './../store/store';

class Source extends React.Component {
  constructor() {
    super();
    this.state = {
      atStart: 'loading...',
      sources: []
    };
    this.matchedSources = [];

    this.getArticles = this.getArticles.bind(this);
    this.searchSources = this.searchSources.bind(this);
    this.filterAccess = this.filterAccess.bind(this);
    this.displayAvailableFilters = this.displayAvailableFilters.bind(this);
    this.filterArticles = this.filterArticles.bind(this);
  }

  componentWillMount() {
    // listening for change event from the store ie when
    // a link is clicked and the source changes
    Store.on('change', () => {
      this.matchedSources = Store.matchedSourceList;
      this.setState({ source: this.matchedSources });
    });
  }

  componentDidMount() {
    const url = 'https://newsapi.org/v1/sources';
    // connects to the api and get all the news sources
    jquery.get(url, (response) => {
      // return an array of objects containing news source
      // id and name
      const sourcesArray = response.sources.map((source) => {
        return {
          id: source.id,
          name: source.name,
          sortBys: source.sortBysAvailable
        };
      });

      // change the state of the component
      this.setState({
        sources: response.status === 'ok' ?
          sourcesArray : 'Sources are unavailable'
      });
    });
  }
  // Controls the sliding container housing the headline filter buttons
  filterAccess(domElement) {
    const linkContainer = jquery(domElement);
    linkContainer.closest('[data-content=sourcelinks]').click((event) => {
      event.preventDefault();
      linkContainer.slideToggle();
    });
  }
  // The function that triggers the action when the source
  // filter button is clicked
  filterArticles(event) {
    event.preventDefault();
    const filter = event.target.getAttribute('data-filter');
    const source = event.target.getAttribute('data-sourceId');
    const sourceName = event.target.getAttribute('data-sourceName');
    Action.getFilteredArticle(filter, source, sourceName);
  }
  // Creates the function that gets headline news from from api
  getArticles(event) {
    event.preventDefault();
    const sourceName = jquery(event.target).text();
    Action.getArticlesFromApi(event.target.getAttribute('value'),
      sourceName);
  }
  // event handler function to search through sources
  searchSources(event) {
    Action.searchThroughSources(event.target.value, this.state.sources);
  }
  // function to display the filter buttons when links to sources are clicked
  /**
   * Generates links to filtered articles
   * @param {object} sortBys - An array containing sort
   *  values (top, popular, latest)
   * @param {string} sourceId - The source where articles should be filtered
   * @param {string} sourceName - The display name of the source
   * @return {object} returns an array containing links to
   * articles based on filter
   */
  displayAvailableFilters(sortBys, sourceId, sourceName) {
    const filteredElements = [];
    let filterCount = 0;
    while (filterCount < sortBys.length) {
      filteredElements.push(<a href="#"
        key={filterCount + 1}
        onClick={this.filterArticles}
        data-filter={sortBys[filterCount]}
        data-sourceId={sourceId}
        data-sourceName={sourceName} >View {sortBys[filterCount]}</a>);
      filterCount += 1;
    }
    return filteredElements;
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
        loadedSources = finalSource.map((source, i) => {
          return (
            <div key={i} data-content="sourcelinks">
              <a className="" href="#" value={source.id}
                onClick={this.getArticles} data-content="articleSource">
                {source.name}</a>
              <div data-content="filters" ref={this.filterAccess}>
                {
                  this.displayAvailableFilters(source.sortBys,
                    source.id, source.name)
                }
              </div>
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
