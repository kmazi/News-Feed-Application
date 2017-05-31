import sinon from 'sinon';
import dispatcher from '../app/dispatcher';
import { getArticlesFromApi } from '../app/actions/actions';

describe('The getArticlesFromApi', () => {
  const spy = sinon.spy();
  // sinon.stub(jQuery, 'ajax');
  const srcId = 'aljazeera';
  const srcName = 'Aljazeera English';
  dispatcher.register(spy);
  getArticlesFromApi(srcId, srcName);
  // const spy = sinon.spy(dispatcher, 'getArticlesFromApi');
  it('should call the jquery ajax function', () => {
    expect(spy.called).toBe(true);
  });
});
