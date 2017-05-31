import React from 'react';
import ReactDom from 'react-dom';
import { shallow } from 'enzyme';
import MockSourceObj from '../../__mocks__/mockObjects';
import Sources from './../../app/components/sources.jsx';

describe('The sources component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Sources />, div);
  });

  it('must show loading... initially before loading from api', () => {
    const anchor = shallow(<Sources />);
    expect(anchor.text().includes('loading...')).toBe(true);
  });

  it('must load from the main source when no source is being searched', () => {
    const anchor = shallow(<Sources />);
    anchor.setState({ sources: MockSourceObj.default });
    console.log(anchor);
  });
});
