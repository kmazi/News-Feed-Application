import React from 'react';
import ReactDom from 'react-dom';
import { shallow } from 'enzyme';
import Sources from './../../app/components/sources.jsx';

describe('The sources component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Sources />, div);
  });

  it('must render the input element for search', () => {
    const anchor = shallow(<Sources />);
    expect(anchor).toBe(true);
  });
});
