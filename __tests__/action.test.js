import Dispatcher from '../app/dispatcher';
import MockSourceObj from '../__mocks__/mockObjects';
import * as Action from '../app/actions/actions';

describe('The articleDispatcher', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.articleDispatcher(MockSourceObj, 'Ars Technica');
    expect(spy).toHaveBeenCalled();
  });
});

describe('The filteredArticleDispatcher', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.filteredArticleDispatcher(MockSourceObj, 'Ars Technica');
    expect(spy).toHaveBeenCalled();
  });
});

describe('The errorDispatcher', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.errorDispatcher('GET_FILTERED_ARTICLES');
    expect(spy).toHaveBeenCalled();
  });
});

describe('The searchThroughSources', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.searchThroughSources('get', MockSourceObj);
    expect(spy).toHaveBeenCalled();
  });
});

describe('The signInUser', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.signInUser('kmazi', 'kingsleyu13@gmail.com');
    expect(spy).toHaveBeenCalled();
  });
});

describe('The signOutUser', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.signOutUser('kmazi', 'kingsleyu13@gmail.com');
    expect(spy).toHaveBeenCalled();
  });
});

describe('The fetchFavourites', () => {
  const spy = jest.spyOn(Dispatcher, 'dispatch');
  it('should call the dispatcher', () => {
    Action.fetchFavourites();
    expect(spy).toHaveBeenCalled();
  });
});
