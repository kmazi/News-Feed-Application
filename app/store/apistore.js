import { EventEmitter } from 'events';
import dispatcher from './../dispatcher';
/**
 * Class representing the store for functions manipulating the news source feed.
 */
class ApiDataStore extends EventEmitter {
  /**
   * Represents the store
   * @constructor
   */
  constructor() {
    super();
    this.articles = {};
    this.sourcelist = [];
  }
/**
 * Sets the articles property when a source is selected
 * @param {object} data - An object from the news API source used to
 * set the articles property
 */
  setArticleData(data) {
    this.articles = data;
    this.emit('click');
  }
/**
 * Sets the articles property when filterting the news source
 * @param {object} data - An object used to set the headline property
 */
  setFilteredArticle(data) {
    if (typeof data !== 'object') {
      alert(data);
    } else {
      this.articles = data;
      this.emit('click');
    }
  }
/**
 * Searches through an array for occurences of a substring
 * @param {string} data - The substring to search for
 * @param {string} sources - An array containing objects to search through
 */
  searchSources(data, sources) {
    const list = [];
    sources.forEach((source) => {
      if (source.id.includes(data)) {
        list.push(source);
      }
    });
    this.sourcelist = list;
    this.emit('change');
  }

  signInUser(name, email, id) {
    if(typeof name !== 'string' || typeof email !== 'string' || typeof id !== 'number'){
      
    }
  }
/**
 * Executes functions in the store conditionally
 * @param {object} action - An object containing information
 * about the store function to execute
 */
  handleAllActions(action) {
    switch (action.type) {
    case 'GET_API_ARTICLES': {
      this.setArticleData(action.articles);
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

const apidatastore = new ApiDataStore();
dispatcher.register(apidatastore.handleAllActions.bind(apidatastore));
export default apidatastore;
