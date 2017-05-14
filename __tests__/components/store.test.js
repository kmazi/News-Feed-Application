import ApiStore from '../../app/scripts/components/store/apistore';

describe('The constructor', () => {
  it('must create the headline property', () => {
    const status = ApiStore.headlines === null;
    expect(status).toBe(false);
  });
});

describe('The getArticleData function', () => {
  it('must set the headline property', () => {
    ApiStore.getArticleData(
      { source: [{ id: 'abc-news', source: 'ABC News International' }] });
    expect(ApiStore.headlines.source[0].id).toBe('abc-news');
  });

  it('must emit a change event', () => {
    let testdata = 'will I be changed?';
    ApiStore.getArticleData('No news source available');
    ApiStore.on('change', () => {
      testdata = ApiStore.headlines;
    });
    expect(testdata).toBe('No news source available');
  });
});

describe('The getArticleFilteredData function', () => {
  it("shouldn't change the headlines prop when the input data type is string",
    () => {
      ApiStore.headlines = 'No data yet!';
      ApiStore.getArticleFilteredData(
        "Don't change the value of the headlines prop");
      expect(ApiStore.headlines).toBe('No data yet!');
    });

  it("should change the value of the headlines prop when input isn't string",
    () => {
      ApiStore.headlines = 'Will now set the value now';
      ApiStore.getArticleFilteredData({ source: { id: 'bbc-news' } });
      expect(ApiStore.headlines.source.id).toBe('bbc-news');
    });

  it('should emit a change event when the value of headlines prop changes',
    () => {
      let info = 'initial data';
      ApiStore.getArticleFilteredData({ source:
        { id: 'bbc-news', news: 'Jenevive is in love with me' } });
      ApiStore.on('change', () => {
        info = ApiStore.headlines.source.news;
      });
      expect(info).toBe('Jenevive is in love with me');
    });
});
