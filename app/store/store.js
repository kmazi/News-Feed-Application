import { EventEmitter } from 'events';
import dispatcher from './../dispatcher';
/**
 * Class representing the store for functions manipulating the news source feed.
 */
class Store extends EventEmitter {
  /**
   * Represents the store
   * @constructor
   */
  constructor() {
    super();
    this.articles = {};
    this.sourcelist = [];
    this.isAuthenticated = false;
  }
/**
 * Sets the articles property when a source is selected
 * @param {object} articles - An object from the news API source used to
 * set the articles property
 */
  setArticleContent(articles) {
    this.articles = articles;
    this.emit('click');
  }
/**
 * Sets the articles property when filterting the news source
 * @param {object} articles - An object used to set the headline property
 */
  setFilteredArticle(articles) {
    if (typeof articles !== 'object') {

    } else {
      this.articles = articles;
      this.emit('click');
    }
  }
/**
 * Searches through an array for occurences of a substring
 * @param {string} searchText - The substring to search for
 * @param {string} sources - An array containing objects to search through
 */
  searchSources(searchText, sources) {
    const list = [];
    sources.forEach((source) => {
      if (source.id.includes(searchText)) {
        list.push(source);
      }
    });
    this.sourcelist = list;
    this.emit('change');
  }

  signInUser(name, email, id) {
    this.isAuthenticated = true;
  }
/**
 * Executes functions in the store conditionally
 * @param {object} action - An object containing information
 * about the store function to execute
 */
  handleAllActions(action) {
    switch (action.type) {
    case 'GET_API_ARTICLES': {
      this.setArticleContent(action.articles);
      break;
    }
    case 'GET_API_FILTERED_ARTICLES': {
      this.setFilteredArticle(action.articles);
      break;
    }
    case 'SEARCH_THROUGH_SOURCES': {
      this.searchSources(action.inputText, action.source);
      break;
    }
    case 'SIGN_IN_USER': {
      this.signInUser(action.user.name, action.user.email, action.user.id);
      break;
    }
    default:
    }
  }
}

const store = new Store();
dispatcher.register(store.handleAllActions.bind(store));
export default store;
