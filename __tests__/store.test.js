import Store from './../app/store/store';
import MockSourceObj from '../__mocks__/mockObjects';
import '../__mocks__/localStorageMock';

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

  it('should create the filter variable', () => {
    const filter = typeof Store.filter === 'string';
    const createdFilter = Store.filter !== null;
    expect(filter).toBe(true);
    expect(createdFilter).toBe(true);
  });

  it('should create the sourceName property', () => {
    const sourceName = typeof Store.sourceName === 'string';
    const createdsourceName = Store.sourceName !== null;
    expect(sourceName).toBe(true);
    expect(createdsourceName).toBe(true);
  });

  it('should create the matchedSourceList property', () => {
    const sourceList = Store.matchedSourceList === null;
    const sourceListLength = Store.matchedSourceList.length;
    expect(sourceList).toBe(false);
    expect(sourceListLength).not.toBeUndefined();
  });

  it('should create the isAuthenticated property', () => {
    const createdIsAuthenticated = Store.isAuthenticated !== null;
    const isAuthenticated = Store.isAuthenticated === false;
    expect(isAuthenticated).toBe(true);
    expect(createdIsAuthenticated).toBe(true);
  });

  it('should create the savedArticles property', () => {
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
      Store.setFilteredArticle(MockSourceObj, 'top', 'ars-technica');
      expect(Store.articles).not.toBe('string');
      expect(Store.articles.length).toBe(2);
    });

  it('should set the filter prop', () => {
    Store.setFilteredArticle(MockSourceObj, 'latest', 'ars-technica');
    expect(Store.filter).toBe('latest');
  });

  it('should set the sourceName prop', () => {
    Store.sourceName = 'before test';
    Store.setFilteredArticle(MockSourceObj, 'latest', 'ars-technica');
    expect(Store.sourceName).toBe('ars-technica');
  });

  describe('when articles prop is not an array', () => {
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
  it('should always set the value of matchedSourceList prop', () => {
    Store.searchSources('e', MockSourceObj);
    expect(Store.matchedSourceList).toEqual(MockSourceObj);
    Store.searchSources('jjrk', MockSourceObj);
    expect(Store.matchedSourceList).toBeDefined();
  });

  describe('should set matchedSourceList correctly',
    () => {
      it('when the searched string is i',
        () => {
          Store.matchedSourceList = [];
          Store.searchSources('i', MockSourceObj);
          expect(Store.matchedSourceList.length).toBe(1);
          expect(Store.matchedSourceList[0].name).toBe('Ars Technica');
        });

      it('when the searched string is n',
        () => {
          Store.matchedSourceList = [];
          Store.searchSources('n', MockSourceObj);
          expect(Store.matchedSourceList.length).toBe(2);
        });

      it('when the searched string is ni',
        () => {
          Store.matchedSourceList = [];
          Store.searchSources('ni', MockSourceObj);
          expect(Store.matchedSourceList.length).toBe(1);
          expect(Store.matchedSourceList[0].name).toBe('Ars Technica');
        });
    });

  describe('when no match is found during search',
    () => {
      it('should set matchedSourceList to contain the searched string',
        () => {
          Store.matchedSourceList = [];
          Store.searchSources('npm', MockSourceObj);
          expect(Store.matchedSourceList.includes('npm')).toBeTruthy();
        });

      it('should set matchedSourceList to a string', () => {
        Store.matchedSourceList = [];
        Store.searchSources('jwt', MockSourceObj);
        expect(typeof Store.matchedSourceList).toBe('string');
      });
    });
});

describe('The signInUser function', () => {
  it('It should set the user prop using the user signin info', () => {
    const userInfo = { name: 'kingsley', email: 'kingsleyu13@gmail.com' };
    Store.signInUser('kingsley', 'kingsleyu13@gmail.com');
    expect(Store.user).toEqual(userInfo);
  });

  it('It should set isAuthenticated prop to true', () => {
    Store.signInUser('kingsley', 'kingsleyu13@gmail.com');
    expect(Store.isAuthenticated).toBeTruthy();
  });
});

describe('The signOutUser function', () => {
  it('It should delete the user info from localstorage', () => {
    Store.user = { name: 'kingsley', email: 'kingsleyu13@gmail.com' };
    Store.signOutUser('kingsleyu13@gmail.com');
    expect(Store.user).toEqual({});
  });

  it('It should set isAuthenticated prop to false', () => {
    Store.signOutUser('kingsley', 'kingsleyu13@gmail.com');
    expect(Store.isAuthenticated).toBeFalsy();
  });
});

describe('The getFavouriteArticles function', () => {
  it('should set the value of favouriteArticles prop', () => {
    Store.savedArticles = [];
    Store.getFavouriteArticles();
    expect(Store.savedArticles.length).not.toBe(0);
  });

  it(`should set favouriteArticles props to a message string when nothing
   is found in the localstorage`, () => {
    Store.savedArticles = [];
    Store.getFavouriteArticles();
    expect(typeof Store.savedArticles).toBe('string');
  });
});

describe('The handleAllActions function', () => {
  it('should execute the searchSources function', () => {
    const action = {
      allSources: MockSourceObj,
      inputText: 'a',
    };
    action.type = 'SEARCH_THROUGH_SOURCES';
    Store.matchedSourceList = [];
    Store.handleAllActions(action);
    expect(Store.matchedSourceList.length).toBe(2);
  });

  it('should not execute the searchSource function', () => {
    const action = {
      articles: MockSourceObj,
      source: MockSourceObj,
      inputText: 'a',
    };
    action.type = 'SEARCH_THROUGH_SOURCE';
    Store.matchedSourceList = [];
    Store.handleAllActions(action);
    expect(Store.matchedSourceList.length).not.toBe(2);
  });

  it('should execute the setArticleContent function', () => {
    const action = {
      articles: MockSourceObj,
      srcName: 'ars-technica'
    };
    action.type = 'GET_ARTICLES_FROM_SOURCE';
    Store.articles = [];
    Store.handleAllActions(action);
    expect(Store.articles[0].country).toBe('au');
  });

  it('should not execute the setArticleContent function', () => {
    const action = {
      articles: MockSourceObj,
      source: MockSourceObj,
      inputText: 'a',
    };
    action.type = 'GET_API_ARTICLE';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(Store.articles.country).toBeUndefined();
  });

  it('should execute the setFilteredArticle function', () => {
    const action = {
      articles: MockSourceObj,
      source: MockSourceObj,
      inputText: 'a',
    };
    action.type = 'GET_API_FILTERED_ARTICLES';
    action.articles = 'should not be a string';
    Store.articles = {};
    Store.handleAllActions(action);
    expect(typeof Store.articles).toEqual('object');
  });
  const action = {
    articles: MockSourceObj,
    source: MockSourceObj,
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

  it('should execute the removeFavourite function', () => {
    Store.savedArticles = [{ title: 'hello' }];
    const spyRemove = jest.spyOn(Store, 'removeFavourite');
    action.type = 'REMOVE_FAVOURITE_ARTICLE';
    Store.handleAllActions(action);
    expect(spyRemove).toBeCalled();
  });
});
