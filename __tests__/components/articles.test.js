import React from 'react';
import ReactDom from 'react-dom';
import ReactRenderer from 'react-test-renderer';
import LocalMock from '../../__mocks__/localStorageMock';
import * as Action from '../../app//actions/actions';
import Article from './../../app/components/articles.jsx';

describe('The articles component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Article />, div);
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
});
