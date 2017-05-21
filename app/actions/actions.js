import jquery from 'jquery';
import dispatcher from '../dispatcher';

const url = 'https://newsapi.org/v1/articles';
const key = process.env.NEWS_API_KEY;
/**
 * Connects to the api and get articles from the given source
 * @param {string} sourceId - The id of the source from the newsapi
 */
export function getArticlesFromApi(sourceId) {
  const src = sourceId;
  const apiParam = { source: src, apiKey: key };

  jquery.ajax({
    url,
    apiParam,
    success: (res) => {
      dispatcher.dispatch(
        {
          type: 'GET_API_ARTICLES',
          articles: res
        }
      );
    },
    error() {
      dispatcher.dispatch(
        {
          type: 'GET_API_ARTICLES',
          articles: 'Error in loading articles'
        }
      );
    }
  });
}
/**
 * Connects to the news feed api and get articles filtered by
 * @param {object} target - contains information about the element
 *that fired this function
 */
export function getFilteredArticle(target) {
  const src = target.getAttribute('data-filter');
  const filter = target.getAttribute('value');
  const apiParam = { apiKey: key, source: src, sortBy: filter };

  jquery.ajax({
    url,
    apiParam,
    success: (res) => {
      dispatcher.dispatch(
        {
          type: 'GET_API_FILTERED_ARTICLES',
          articles: res
        }
      );
    },
    error() {
      dispatcher.dispatch(
        {
          type: 'GET_API_FILTERED_ARTICLES',
          articles: `Error in loading articles: ${
            filter} articles aren't available`
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
