import Store from './../app/store/store';

const testData = [{
  id: 'abc-news-au',
  name: 'ABC News (AU)',
  description: `Australia's most trusted source of local,
   national and world news. 
  Comprehensive, independent, in-depth analysis,
  the latest business, sport, weather and more.`,
  url: 'http://www.abc.net.au/news',
  category: 'general',
  language: 'en',
  country: 'au',
  urlsToLogos: {
    small: '',
    medium: '',
    large: ''
  },
  sortBysAvailable: [
    top
  ]
},
{
  id: 'ars-technica',
  name: 'Ars Technica',
  description: `The PC enthusiast's resource. 
  Power users and the tools they love, without computing religion.`,
  url: 'http://arstechnica.com',
  category: 'technology',
  language: 'en',
  country: 'us',
  urlsToLogos: {
    small: '',
    medium: '',
    large: ''
  },
  sortBysAvailable: [
    'top',
    'latest'
  ]
}];
const action = { articles: testData[0],
  source: testData,
  inputText: 'a', };

describe('The constructor', () => {
  it('must create the headline property', () => {
    const status = Store.articles === null;
    expect(status).toBe(false);
  });
});

describe('The setArticleData function', () => {
  it('must set the headline property', () => {
    Store.setArticleContent(
      { source: [{ id: 'abc-news', source: 'ABC News International' }] });
    expect(Store.articles.source[0].id).toBe('abc-news');
  });
});

describe('The setFilteredArticle function', () => {
  it("shouldn't change the articles prop when the input data type is string",
    () => {
      Store.articles = 'No data yet!';
      Store.setFilteredArticle(
        "Don't change the value of the articles prop");
      expect(Store.articles).toBe('No data yet!');
    });

  it("should change the value of the articles prop when input isn't string",
    () => {
      Store.articles = 'Will now set the value now';
      Store.setFilteredArticle({ source: { id: 'bbc-news' } });
      expect(Store.articles.source.id).toBe('bbc-news');
    });
});

describe('The searchSources function', () => {
  it('should always return an object', () => {
    Store.searchSources('e', testData);
    expect(Store.sourcelist).toEqual(testData);
  });

  it('should return an object in which the id property is abc-news-au', () => {
    Store.sourcelist = [];
    Store.searchSources('au', testData);
    expect(Store.sourcelist[0].id).toBe('abc-news-au');
  });

  it('should contain only one object', () => {
    Store.sourcelist = [];
    Store.searchSources('au', testData);
    expect(Store.sourcelist.length).not.toBe(2);
  });

  it('should return all objects passed when no search string was typed', () => {
    Store.sourcelist = [];
    Store.searchSources('', testData);
    expect(Store.sourcelist.length).toBe(2);
  });
});

describe('The handleAllActions function', () => {
  it('should execute the searchSources function', () => {
    action.type = 'SEARCH_THROUGH_SOURCES';
    Store.sourcelist = [];
    Store.handleAllActions(action);
    expect(Store.sourcelist.length).toBe(2);
  });

  it('should not execute the searchSource function', () => {
    action.type = 'SEARCH_THROUGH_SOURCE';
    Store.sourcelist = [];
    Store.handleAllActions(action);
    expect(Store.sourcelist.length).not.toBe(2);
  });

  it('should execute the setArticleData function', () => {
    action.type = 'GET_API_ARTICLES';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(Store.articles.country).toBe('au');
  });

  it('should not execute the setArticleData function', () => {
    action.type = 'GET_API_ARTICLE';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(Store.articles.country).toBeUndefined();
  });

  it('should execute the setFilteredArticle function', () => {
    action.type = 'GET_API_FILTERED_ARTICLES';
    action.articles = 'should not be a string';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(typeof Store.articles).toEqual('object');
  });

  it('should not execute the setFilteredArticle function', () => {
    action.type = 'GET_API_FILTERED_ARTICLE';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(Store.articles.category).toBeUndefined();
  });

  it('should execute the right function', () => {
    action.type = 'GET_API_FILTERED_ARTICLE';
    Store.sourcelist = [];
    Store.handleAllActions(action);
    expect(Store.sourcelist.length).toBeLessThanOrEqual(0);
  });
});
