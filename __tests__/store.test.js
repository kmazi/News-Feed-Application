import ApiStore from './../app/store/apistore';

const testData = [{
  id: 'abc-news-au',
  name: 'ABC News (AU)',
  description: `Australia's most trusted source of local, national and world news. 
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
    const status = ApiStore.articles === null;
    expect(status).toBe(false);
  });
});

describe('The setArticleData function', () => {
  it('must set the headline property', () => {
    ApiStore.setArticleData(
      { source: [{ id: 'abc-news', source: 'ABC News International' }] });
    expect(ApiStore.articles.source[0].id).toBe('abc-news');
  });
});

describe('The setFilteredArticle function', () => {
  it("shouldn't change the articles prop when the input data type is string",
    () => {
      ApiStore.articles = 'No data yet!';
      ApiStore.setFilteredArticle(
        "Don't change the value of the articles prop");
      expect(ApiStore.articles).toBe('No data yet!');
    });

  it("should change the value of the articles prop when input isn't string",
    () => {
      ApiStore.articles = 'Will now set the value now';
      ApiStore.setFilteredArticle({ source: { id: 'bbc-news' } });
      expect(ApiStore.articles.source.id).toBe('bbc-news');
    });
});

describe('The searchSources function', () => {
  it('should always return an object', () => {
    ApiStore.searchSources('e', testData);
    expect(ApiStore.sourcelist).toEqual(testData);
  });

  it('should return an object in which the id property is abc-news-au', () => {
    ApiStore.sourcelist = [];
    ApiStore.searchSources('au', testData);
    expect(ApiStore.sourcelist[0].id).toBe('abc-news-au');
  });

  it('should contain only one object', () => {
    ApiStore.sourcelist = [];
    ApiStore.searchSources('au', testData);
    expect(ApiStore.sourcelist.length).not.toBe(2);
  });

  it('should return all objects passed when no search string was typed', () => {
    ApiStore.sourcelist = [];
    ApiStore.searchSources('', testData);
    expect(ApiStore.sourcelist.length).toBe(2);
  });
});

describe('The handleAllActions function', () => {
  it('should execute the searchSources function', () => {
    action.type = 'SEARCH_THROUGH_SOURCES';
    ApiStore.sourcelist = [];
    ApiStore.handleAllActions(action);
    expect(ApiStore.sourcelist.length).toBe(2);
  });

  it('should not execute the searchSource function', () => {
    action.type = 'SEARCH_THROUGH_SOURCE';
    ApiStore.sourcelist = [];
    ApiStore.handleAllActions(action);
    expect(ApiStore.sourcelist.length).not.toBe(2);
  });

  it('should execute the setArticleData function', () => {
    action.type = 'GET_API_ARTICLES';
    ApiStore.articles = {};
    ApiStore.handleAllActions(action);
    expect(ApiStore.articles.country).toBe('au');
  });

  it('should not execute the setArticleData function', () => {
    action.type = 'GET_API_ARTICLE';
    ApiStore.articles = {};
    ApiStore.handleAllActions(action);
    expect(ApiStore.articles.country).toBeUndefined();
  });

  it('should execute the setFilteredArticle function', () => {
    action.type = 'GET_API_FILTERED_ARTICLES';
    action.articles = 'should not be a string';
    ApiStore.articles = {};
    ApiStore.handleAllActions(action);
    expect(typeof ApiStore.articles).toEqual('object');
  });

  it('should not execute the setFilteredArticle function', () => {
    action.type = 'GET_API_FILTERED_ARTICLE';
    ApiStore.articles = {};
    ApiStore.handleAllActions(action);
    expect(ApiStore.articles.category).toBeUndefined();
  });

  it('should execute the right function', () => {
    action.type = 'GET_API_FILTERED_ARTICLE';
    ApiStore.sourcelist = [];
    ApiStore.handleAllActions(action);
    expect(ApiStore.sourcelist.length).toBeLessThanOrEqual(0);
  });
});
