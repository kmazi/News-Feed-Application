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

describe('The constructor', () => {
  it('must create the headline property', () => {
    const status = ApiStore.headlines === null;
    expect(status).toBe(false);
  });
});

describe('The setArticleData function', () => {
  it('must set the headline property', () => {
    ApiStore.setArticleData(
      { source: [{ id: 'abc-news', source: 'ABC News International' }] });
    expect(ApiStore.headlines.source[0].id).toBe('abc-news');
  });
});

describe('The setFilteredArticle function', () => {
  it("shouldn't change the headlines prop when the input data type is string",
    () => {
      ApiStore.headlines = 'No data yet!';
      ApiStore.setFilteredArticle(
        "Don't change the value of the headlines prop");
      expect(ApiStore.headlines).toBe('No data yet!');
    });

  it("should change the value of the headlines prop when input isn't string",
    () => {
      ApiStore.headlines = 'Will now set the value now';
      ApiStore.setFilteredArticle({ source: { id: 'bbc-news' } });
      expect(ApiStore.headlines.source.id).toBe('bbc-news');
    });
});

describe('The searchSources function', () => {
  it('should always return an object', () => {
    ApiStore.searchSources('e', testData);
    expect(ApiStore.sourcelist).toEqual(testData);
  });

  it('should return an object in which the id property is abc-news-au', () => {
    ApiStore.searchSources('au', testData);
    expect(ApiStore.sourcelist[0].id).toBe('abc-news-au');
  });

  it('should contain only one object', () => {
    ApiStore.searchSources('au', testData);
    expect(ApiStore.sourcelist.length).not.toBe(2);
  });

  it('should return all objects passed when no search string was typed', () => {
    ApiStore.searchSources('', testData);
    expect(ApiStore.sourcelist.length).toBe(2);
  });
});
