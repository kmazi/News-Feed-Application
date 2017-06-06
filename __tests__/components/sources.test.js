import React from 'react';
import ReactDom from 'react-dom';
import { shallow } from 'enzyme';
import ReactRenderer from 'react-test-renderer';
import * as Action from '../../app//actions/actions';
import Sources from './../../app/components/sources.jsx';

describe('The sources component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    const outCome = ReactDom.render(<Sources />, div);
    expect(outCome).not.toThrowError(/Exception/);
  });

  it('should show loading... initially before loading from api', () => {
    const anchor = shallow(<Sources />);
    expect(anchor.text().includes('loading...')).toBe(true);
  });

  it('should render all component correctly', () => {
    const component = ReactRenderer.create(<Sources />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should filter articles properly', () => {
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
    const spy = jest.spyOn(Action, 'getFilteredArticle');
    const source = new Sources();
    source.filterArticles(eventMock);
    expect(spy).toBeCalled();
  });

  it('should show articles properly', () => {
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
    const spy = jest.spyOn(Action, 'getArticlesFromApi');
    const source = new Sources();
    source.getArticles(eventMock);
    expect(spy).toBeCalled();
  });
});
