import jquery from 'jquery';
import dispatcher from '../dispatcher';

const url = 'https://newsapi.org/v1/articles';
const key = '213327409d384371851777e7c7f78dfe';

export function getApiData(source) {
  const src = source.target.getAttribute('value');
  const data = { source: src, apiKey: key };

  jquery.ajax({
    url,
    data,
    success: (res) => {
      dispatcher.dispatch(
        {
          type: 'GET_API_HEADLINES',
          headlines: res
        }
      );
    },
    error() {
      dispatcher.dispatch(
        {
          type: 'GET_API_HEADLINES',
          headlines: 'Error in loading headlines'
        }
      );
    }
  });
}

export function getApiFilteredData(e) {
  const src = e.target.getAttribute('data-filter');
  const filter = e.target.getAttribute('value');
  const data = { apiKey: key, source: src, sortBy: filter };

  jquery.ajax({
    url,
    data,
    success: (res) => {
      dispatcher.dispatch(
        {
          type: 'GET_API_FILTERED_HEADLINES',
          headlines: res
        }
      );
    },
    error() {
      dispatcher.dispatch(
        {
          type: 'GET_API_FILTERED_HEADLINES',
          headlines: `Error in loading headlines: ${
            filter} headlines aren't available`
        }
      );
    }
  });
}
/**
 * Dispatches the function to search through the news api sources
 * @param {*} e 
 * @param {*} sources 
 */
export function searchThroughSources(e, sources) {
  dispatcher.dispatch({
    type: 'SEARCH_THROUGH_SOURCES',
    data: e,
    source: sources
  });
}
