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
    this.headlines = {};
    this.sourcelist = [];
  }
/**
 * Sets the headlines property when a source is selected
 * @param {object} data - An object from the news API source used to
 * set the headlines property
 */
  setArticleData(data) {
    this.headlines = data;
    this.emit('change');
  }
/**
 * Sets the headlines property when filterting the news source
 * @param {object} data - An object used to set the headline property
 */
  setFilteredArticle(data) {
    if (typeof data !== 'object') {
      alert(data);
    } else {
      this.headlines = data;
      this.emit('change');
    }
  }
/**
 * Searches through an array for occurences of a substring
 * @param {string} data - The substring to search for
 * @param {string} source - An array containing objects to search through
 */
  searchSources(data, source) {
    const list = [];
    source.forEach((element) => {
      if (element.id.includes(data)) {
        list.push(element);
      }
    });
    this.sourcelist = list;
    this.emit('click');
  }
/**
 * Executes functions in the store conditionally
 * @param {object} action - An object containing information
 * about the store function to execute
 */
  handleAllActions(action) {
    switch (action.type) {
    case 'GET_API_HEADLINES': {
      this.setArticleData(action.headlines);
      break;
    }
    case 'GET_API_FILTERED_HEADLINES': {
      this.setFilteredArticle(action.headlines);
      break;
    }
    case 'SEARCH_THROUGH_SOURCES': {
      this.searchSources(action.data, action.source);
      break;
    }
    default:
    }
  }
}

const apidatastore = new ApiDataStore();
dispatcher.register(apidatastore.handleAllActions.bind(apidatastore));
export default apidatastore;
