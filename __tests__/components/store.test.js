import ApiStore from '../../app/scripts/components/store/apistore';

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

describe('The set');
