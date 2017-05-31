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
    this.user = {};
    this.articles = [];
    this.filter = '';
    this.sourceName = '';
    this.matchedSourceList = [];
    this.isAuthenticated = false;
    this.savedArticles = [];
  }
  /**
   * Sets the articles property when a source is selected
   * @param {object} articles - An array of headline articles
   *  from a news API source
   * @param {string} srcName - The source name of the article
   * set the articles property
   */
  setArticleContent(articles, srcName) {
    if (typeof articles === 'object' && articles.length >= 0) {
      this.articles = articles;
    }
    if (typeof srcName === 'string') {
      this.sourceName = srcName;
    }
    this.filter = '';
    this.emit('click');
  }
  /**
   * Sets the articles property when filterting the news source
   * @param {object} articles - An object(array) used to set the articles
   *  property
   * @param {string} filter - The filter used to sort the article
   *  @param {string} srcName - The source name of the article
   */
  setFilteredArticle(articles, filter, srcName) {
    if (typeof articles === 'object' && articles.length >= 0) {
      this.articles = articles;
      this.sourceName = srcName;
    }
    this.filter = filter;
    this.emit('click');
  }
  /**
   * Searches through an array for occurences of a substring
   * @param {string} searchText - The substring to search for
   * @param {string} sources - An array containing objects to search through
   */
  searchSources(searchText, sources) {
    const list = [];
    // loop through the sources while searching for a match
    sources.forEach((source) => {
      if (source.id.includes(searchText)) {
        list.push(source);
      }
    });
    // check if there has been a match before setting matchedsourcelist
    this.matchedSourceList = list.length === 0 ?
      `${searchText} couldn't be found` :
      list;
    this.emit('change');
  }
  /**
   * Dispatches the function to get favourite articles from the localstorage
   */
  getFavouriteArticles() {
    const favouriteArticles = [],
      keys = Object.keys(localStorage);
    let index = keys.length - 1;
    while (index >= 0) {
      let article = localStorage.getItem(keys[index]);
      try {
        article = JSON.parse(article);
        favouriteArticles.push(article);
        index -= 1;
      } catch (err) {
        index -= 1;
      }
    }

    this.savedArticles = favouriteArticles.length === 0 ?
      'No articles stored in your favourite list' :
      favouriteArticles;
    this.emit('favourites');
  }
/**
 * Signs in the user by saving their username and email to localstorage
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 */
  signInUser(name, email) {
    const user = { name, email };
    this.user = user;
    localStorage.setItem(email, name);
    this.isAuthenticated = true;
    this.emit('login');
  }
/**
 * Signs out the user by deleting their username and email from localstorage
 * @param {string} email - The email of the user
 */
  signOutUser(email) {
    localStorage.removeItem(email);
    this.isAuthenticated = false;
    this.user = {};
    this.emit('logout');
  }
  /**
   * Executes functions in the store conditionally
   * @param {object} action - An object containing information
   * about the store function to execute
   */
  handleAllActions(action) {
    switch (action.type) {
    case 'GET_ARTICLES_FROM_SOURCE': {
      this.setArticleContent(action.articles, action.srcName);
      break;
    }
    case 'GET_FILTERED_ARTICLES': {
      this.setFilteredArticle(action.articles, action.filter, action.srcName);
      break;
    }
    case 'SEARCH_THROUGH_SOURCES': {
      this.searchSources(action.inputText, action.allSources);
      break;
    }
    case 'GET_FAVOURITE_ARTICLES': {
      this.getFavouriteArticles();
      break;
    }
    case 'SIGN_IN_USER': {
      this.signInUser(action.user.name, action.user.email);
      break;
    }
    case 'SIGN_OUT_USER': {
      this.signOutUser(action.user.email);
      break;
    }
    default:
    }
  }
}

const store = new Store();
dispatcher.register(store.handleAllActions.bind(store));
export default store;
