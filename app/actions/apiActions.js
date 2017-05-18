import jquery from 'jquery';
import dispatcher from '../dispatcher';

const url = 'https://newsapi.org/v1/articles';
const key = '213327409d384371851777e7c7f78dfe';
/**
 * 
 * @param {*} source - 
 */
export function getArticlesFromApi(sourceId) {
  const src = sourceId;
  const data = { source: src, apiKey: key };

  jquery.ajax({
    url,
    data,
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

export function getApiFilteredData(target) {
  const src = target.getAttribute('data-filter');
  const filter = target.getAttribute('value');
  const data = { apiKey: key, source: src, sortBy: filter };

  jquery.ajax({
    url,
    data,
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
 * @param {string} substring - The input substring to search for in the sources ids
 * @param {object} sources - The list of sources to search through
 */
export function searchThroughSources(substring, sources) {
  dispatcher.dispatch({
    type: 'SEARCH_THROUGH_SOURCES',
    inputText: substring,
    source: sources
  });
}
