import Axios from 'axios';
import dispatcher from '../dispatcher';

const articleUrl = 'https://newsapi.org/v1/articles';
const key = process.env.NEWS_API_KEY;
const errorMessage = 'Error in loading articles';
/**
 * Calls the dispatcher when there is response from the api call
 * @param {object} response - object received from the api
 * call containing news articles
 * @param {string} sourceName - the name of the source to fetch news from
 */
export function articleDispatcher(response, sourceName) {
  dispatcher.dispatch(
    {
      type: 'GET_ARTICLES_FROM_SOURCE',
      articles: response.articles,
      srcName: sourceName
    }
  );
}
/**
 * calls the dispatcher when an article is to be fetched using a filter
 * @param {*} response - object received from the api
 * @param {*} filter - the filter(top, latest, popular) used to fetch headline
 * @param {*} sourceName - the name of the source to fetch news from
 */
export function filteredArticleDispatcher(response, filter, sourceName) {
  dispatcher.dispatch(
    {
      type: 'GET_FILTERED_ARTICLES',
      articles: response.articles,
      srcName: sourceName,
      filter
    }
  );
}
/**
 * calls the dispatcher when there is an error connecting to the api
 * @param {string} type - the dispatch key to use in identifying the
 * action to fire in the store
 */
export function errorDispatcher(type) {
  dispatcher.dispatch({
    type,
    articles: errorMessage
  });
}
/**
 * Connects to the api and get articles from the given source
 * @param {string} sourceId - The id of the source from the newsapi
 * @param {string} sourceName - The name of the source
 */
export function getArticlesFromApi(sourceId, sourceName) {
  const apiParam = { params: { source: sourceId, apiKey: key } };
  Axios.get(articleUrl, apiParam).then((response) => {
    articleDispatcher(response.data, sourceName);
  }).catch(() => {
    errorDispatcher('GET_ARTICLES_FROM_SOURCE');
  });
}
/**
 * Connects to the news feed api and get articles filtered by
 * @param {string} filter - the filter (top, popular, latest)
 *  use to filter articles
 * @param {string} sourceId - the source id to fetch news headlines from
 * @param {string} sourceName - the name of the news
 * source to fetch articles from
 */
export function getFilteredArticle(filter, sourceId, sourceName) {
  const apiParam = { params: {
    apiKey: key, source: sourceId, sortBy: filter } };
  Axios.get(articleUrl, apiParam).then((response) => {
    filteredArticleDispatcher(response.data, filter, sourceName);
  }).catch(() => {
    errorDispatcher('GET_FILTERED_ARTICLES');
  });
}
/**
 * Dispatches the function to search through the news api sources
 * @param {string} substring - The input substring to search for in the
 * sources ids
 * @param {object} sources - The list of sources to search through
 */
export function searchThroughSources(substring, sources) {
  dispatcher.dispatch({
    type: 'SEARCH_THROUGH_SOURCES',
    inputText: substring,
    allSources: sources
  });
}
/**
 * Dispatches the signIn function in the store that authenticates users
 * @param {string} userName - The name of the user from google+
 * @param {string} userEmail - The email of the user from google+
 * @param {string} userId - The google id of the user
 */
export function signInUser(userName, userEmail) {
  dispatcher.dispatch({
    type: 'SIGN_IN_USER',
    user: { name: userName, email: userEmail }
  });
}
/**
 * Dispatches the function that signs out a user from the application
 * @param {object} user - an object containing name and email of the user
 */
export function signOutUser(user) {
  dispatcher.dispatch({
    type: 'SIGN_OUT_USER',
    user
  });
}
/**
 * Dispatches the function to get favourite articles from the localstorage
 */
export function fetchFavourites() {
  dispatcher.dispatch({
    type: 'GET_FAVOURITE_ARTICLES'
  });
}
