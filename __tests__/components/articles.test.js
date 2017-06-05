import React from 'react';
import ReactDom from 'react-dom';
import ReactRenderer from 'react-test-renderer';
import LocalMock from '../../__mocks__/localStorageMock';
import Article from './../../app/components/articles.jsx';
import * as Action from '../../app/actions/actions';

describe('The articles component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    expect(ReactDom.render(<Article />, div)).not.toThrowError(/Exception/);
  });

  it('should render with the exact content', () => {
    const component = ReactRenderer.create(<Article />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  const eventMock = {
    target: {
      getAttribute: (attrib) => {
        return `${attrib} mock`;
      }
    }
  };
  eventMock.preventDefault = () => {
    // just a mock!
  };
  const spy = jest.spyOn(LocalMock, 'setItem');
  describe('before adding favourite articles', () => {
    it('should check if the user is authenticated', () => {
      const article = new Article();
      article.state.isAuthenticated = false;
      article.addFavourite(eventMock);
      expect(spy).not.toBeCalled();
    });
  });

  it('should allow user to add favourite article when they are logged in',
  () => {
    const article = new Article();
    article.state.isAuthenticated = true;
    article.addFavourite(eventMock);
    expect(spy).toBeCalled();
  });

  it('should display remove from favourites',
  () => {
    const article = new Article();
    const articleObj = {};
    articleObj.urlToImage = 'testData';
    articleObj.title = 'test';
    articleObj.description = 'tests';
    article.state.isAuthenticated = true;
    article.state.sourceName = 'Favourite Articles';
    const test = article.favouriteAddDel(articleObj);
    expect(test.props.children).toBe('remove from favourites');
  });

  it('should display add to favourites',
  () => {
    const article = new Article();
    const articleObj = {};
    articleObj.urlToImage = 'testData';
    articleObj.title = 'test';
    articleObj.description = 'tests';
    article.state.isAuthenticated = true;
    article.state.sourceName = 'cnn';
    const test = article.favouriteAddDel(articleObj);
    expect(test.props.children).toBe('add to favourites');
  });

  it('should be able to remove favourite articles', () => {
    const removeSpy = jest.spyOn(Action, 'removeFavourite');
    const article = new Article();
    article.removeFavourite(eventMock);
    expect(removeSpy).toBeCalled();
  });
});
