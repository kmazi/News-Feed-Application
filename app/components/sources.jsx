import React from 'react';
import jquery from 'jquery';
import Axios from 'axios';
import * as Action from './../actions/actions';
import Store from './../store/store';
/**
 * Renders all the api sources from newsorg
 * @extends React.Component
 */
class Source extends React.Component {
  /**
   * Creates a Source component
   */
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
/**
 * Function that fires before component get rendered
 */
  componentWillMount() {
    // listening for change event from the store ie when
    // a link is clicked and the source changes
    Store.on('change', () => {
      this.matchedSources = Store.matchedSourceList;
      this.setState({ source: this.matchedSources });
    });
  }
/**
 * Function that fires after component get rendered
 */
  componentDidMount() {
    const url = 'https://newsapi.org/v1/sources';
    // connects to the api and get all the news sources
    Axios.get(url).then((response) => {
      // return an array of objects containing news source
      // id and name
      const sourcesArray = response.data.sources.map((source) => {
        return {
          id: source.id,
          name: source.name,
          sortBys: source.sortBysAvailable
        };
      });

      // change the state of the component
      this.setState({
        sources: sourcesArray
      });
    }).catch(() => {
      // change the state of the component
      this.setState({
        sources: 'Sources are unavailable'
      });
    });
  }
  // Controls the sliding container housing the headline filter buttons
  /**
   * Shows or hides the buttons to filter the api
   * @param {string} domElement - the html element that fired this event
   */
  filterAccess(domElement) {
    const linkContainer = jquery(domElement);
    const clickedDiv = linkContainer.closest('[data-content=sourcelinks]');
    clickedDiv.click((event) => {
      event.preventDefault();
      linkContainer.slideToggle();
      clickedDiv.toggleClass('clicked-src-div');
    });
  }
  // The function that triggers the action when the source
  // filter button is clicked
  /**
   * Filters the articles from the newsapi
   * @param {object} event - the html object that fired the event
   */
  filterArticles(event) {
    event.preventDefault();
    const filter = event.target.getAttribute('data-filter');
    const source = event.target.getAttribute('data-sourceId');
    const sourceName = event.target.getAttribute('data-sourceName');
    Action.getFilteredArticle(filter, source, sourceName);
  }
  // Creates the function that gets headline news from from api
  /**
   * Gets article from the api from a given source
   * @param {object} event - the html object that fired the event
   */
  getArticles(event) {
    event.preventDefault();
    const sourceName = jquery(event.target).text();
    Action.getArticlesFromApi(event.target.getAttribute('value'),
      sourceName);
  }
  // event handler function to search through sources
  /**
   * Searches through the sources list for a particular source
   * @param {object} event - the html object that fired the event
   */
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
/**
 * Function that fires when rendering the component
 * @return {object} - Returns the react object created
 */
  render() {
    const sources = this.state.sources;
    let loadedSources = null;
    const matchedSources = this.matchedSources;
    // save the matchedsources if there has been a match
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
