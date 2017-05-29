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

describe('The constructor', () => {
  it('must create the articles property', () => {
    const article = Store.articles === null;
    const articleLength = Store.articles.length;
    expect(article).toBe(false);
    expect(articleLength).not.toBeUndefined();
  });

  it('must create the user object', () => {
    const status = typeof Store.user === 'object';
    expect(status).toBe(true);
  });

  it('must create the filter variable', () => {
    const filter = typeof Store.filter === 'string';
    const createdFilter = Store.filter !== null;
    expect(filter).toBe(true);
    expect(createdFilter).toBe(true);
  });

  it('must create the sourceName property', () => {
    const sourceName = typeof Store.sourceName === 'string';
    const createdsourceName = Store.sourceName !== null;
    expect(sourceName).toBe(true);
    expect(createdsourceName).toBe(true);
  });

  it('must create the matchedSourceList property', () => {
    const sourceList = Store.matchedSourceList === null;
    const sourceListLength = Store.matchedSourceList.length;
    expect(sourceList).toBe(false);
    expect(sourceListLength).not.toBeUndefined();
  });

  it('must create the isAuthenticated property', () => {
    const createdIsAuthenticated = Store.isAuthenticated !== null;
    const isAuthenticated = Store.isAuthenticated === false;
    expect(isAuthenticated).toBe(true);
    expect(createdIsAuthenticated).toBe(true);
  });

  it('must create the savedArticles property', () => {
    const savedArticles = Store.savedArticles === null;
    const savedArticlesLength = Store.savedArticles.length;
    expect(savedArticles).toBe(false);
    expect(savedArticlesLength).not.toBeUndefined();
  });
});

describe('The setArticleContent function', () => {
  Store.setArticleContent(
    [{ id: 'abc-news', source: 'ABC News International' }], 'ABC News');
  it('must set the articles property', () => {
    expect(Store.articles.length).not.toBeLessThanOrEqual(0);
    expect(Store.articles[0].id).toBe('abc-news');
  });

  it('must set the sourceName property', () => {
    expect(Store.sourceName).toBe('ABC News');
  });

  it('must set the reset the filter property', () => {
    expect(Store.filter).toBe('');
  });
});

describe('The setFilteredArticle function', () => {
  it('should change the value of the articles prop when input is an array',
    () => {
      Store.articles = 'Will set the articles prop now';
      Store.setFilteredArticle(testData, 'top', 'ars-technica');
      expect(typeof Store.articles).not.toBe('string');
      expect(Store.articles.length).toBe(2);
    });

  it('should set the filter prop', () => {
    Store.setFilteredArticle(testData, 'latest', 'ars-technica');
    expect(Store.filter).toBe('latest');
  });

  it('should set the sourceName prop', () => {
    Store.sourceName = 'before test';
    Store.setFilteredArticle(testData, 'latest', 'ars-technica');
    expect(Store.sourceName).toBe('ars-technica');
  });

  describe('when articles is not an array', () => {
    it('should not change the sourceName prop', () => {
      Store.sourceName = 'before test';
      Store.setFilteredArticle('testData', 'latest', 'abc-news');
      expect(Store.sourceName).not.toBe('abc-news');
    });

    it('should not change the articles prop', () => {
      Store.articles = [];
      Store.setFilteredArticle('testData', 'latest', 'abc-news');
      expect(Store.articles.length).toBe(0);
    });
  });
});

describe('The searchSources function', () => {
  it('should always return an object', () => {
    Store.searchSources('e', testData);
    expect(Store.matchedSourceList).toEqual(testData);
  });

  it('should return an object in which the id property is abc-news-au', () => {
    Store.matchedSourceList = [];
    Store.searchSources('au', testData);
    expect(Store.matchedSourceList[0].id).toBe('abc-news-au');
  });

  it('should contain only one object', () => {
    Store.matchedSourceList = [];
    Store.searchSources('au', testData);
    expect(Store.matchedSourceList.length).not.toBe(2);
  });

  it('should return all objects passed when no search string was typed', () => {
    Store.matchedSourceList = [];
    Store.searchSources('', testData);
    expect(Store.matchedSourceList.length).toBe(2);
  });
});

describe('The handleAllActions function', () => {
  it('should execute the searchSources function', () => {
    const action = {
      allSources: testData,
      inputText: 'a',
    };
    action.type = 'SEARCH_THROUGH_SOURCES';
    Store.matchedSourceList = [];
    Store.handleAllActions(action);
    expect(Store.matchedSourceList.length).toBe(2);
  });

  it('should not execute the searchSource function', () => {
    const action = {
      articles: testData,
      source: testData,
      inputText: 'a',
    };
    action.type = 'SEARCH_THROUGH_SOURCE';
    Store.matchedSourceList = [];
    Store.handleAllActions(action);
    expect(Store.matchedSourceList.length).not.toBe(2);
  });

  it('should execute the setArticleContent function', () => {
    const action = {
      articles: testData,
      srcName: 'ars-technica'
    };
    action.type = 'GET_ARTICLES_FROM_SOURCE';
    Store.articles = [];
    Store.handleAllActions(action);
    expect(Store.articles[0].country).toBe('au');
  });

  it('should not execute the setArticleContent function', () => {
    const action = {
      articles: testData,
      source: testData,
      inputText: 'a',
    };
    action.type = 'GET_API_ARTICLE';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(Store.articles.country).toBeUndefined();
  });

  it('should execute the setFilteredArticle function', () => {
    const action = {
      articles: testData,
      source: testData,
      inputText: 'a',
    };
    action.type = 'GET_API_FILTERED_ARTICLES';
    action.articles = 'should not be a string';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(typeof Store.articles).toEqual('object');
  });
  const action = {
    articles: testData,
    source: testData,
    inputText: 'a',
  };
  it('should not execute the setFilteredArticle function', () => {
    action.type = 'GET_API_FILTERED_ARTICLE';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(Store.articles.category).toBeUndefined();
  });

  it('should execute the right function', () => {
    action.type = 'GET_API_FILTERED_ARTICLE';
    Store.matchedSourceList = [];
    Store.handleAllActions(action);
    expect(Store.matchedSourceList.length).toBeLessThanOrEqual(0);
  });
});
