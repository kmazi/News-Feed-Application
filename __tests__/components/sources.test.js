import React from 'react';
import ReactDom from 'react-dom';
import { shallow, mount } from 'enzyme';
import Sources from './../../app/components/sources.jsx';

describe('The sources component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Sources />, div);
  });

  it('must render anchor elements', () => {
    const anchor = mount(<Sources />);
    expect(anchor).toBe(true);
  });
});
