import sinon from 'sinon';
import jQuery from 'jquery';
import { getArticlesFromApi } from '../app/actions/actions';

describe('The getArticlesFromApi', () => {
  afterEach(() => {
    jQuery.ajax.restore();
  });
  it('should call the jquery ajax function', () => {
    const srcId = 'aljazeera',
      srcName = 'Aljazeera English';
    getArticlesFromApi(srcId, srcName);
  });
});
