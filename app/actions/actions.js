import jquery from 'jquery';
import dispatcher from '../dispatcher';

const articleUrl = 'https://newsapi.org/v1/articles';
const key = process.env.NEWS_API_KEY;
const errorMessage = 'Error in loading articles';
/**
 * Connects to the api and get articles from the given source
 * @param {string} sourceId - The id of the source from the newsapi
 * @param {string} sourceName - The name of the source
 */
export function getArticlesFromApi(sourceId, sourceName) {
  const apiParam = { source: sourceId, apiKey: key };

  jquery.ajax({
    url: articleUrl,
    data: apiParam,
    dataType: 'json',
    success: (res) => {
      dispatcher.dispatch(
        {
          type: 'GET_ARTICLES_FROM_SOURCE',
          articles: res.articles,
          srcName: sourceName
        }
      );
    },
    error() {
      dispatcher.dispatch(
        {
          type: 'GET_ARTICLES_FROM_SOURCE',
          articles: errorMessage
        }
      );
    }
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
  const apiParam = { apiKey: key, source: sourceId, sortBy: filter };

  jquery.ajax({
    url: articleUrl,
    data: apiParam,
    success: (res) => {
      dispatcher.dispatch(
        {
          type: 'GET_FILTERED_ARTICLES',
          articles: res.articles,
          filter,
          srcName: sourceName
        }
      );
    },
    error() {
      dispatcher.dispatch(
        {
          type: 'GET_FILTERED_ARTICLES',
          articles: errorMessage
        }
      );
    }
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
export function signInUser(userName, userEmail, userId) {
  dispatcher.dispatch({
    type: 'SIGN_IN_USER',
    user: { name: userName, email: userEmail, id: userId }
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
