import React from 'react';
import ReactDom from 'react-dom';
import { shallow } from 'enzyme';
import ReactRenderer from 'react-test-renderer';
import Sources from './../../app/components/sources.jsx';

describe('The sources component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Sources />, div);
  });

  it('should show loading... initially before loading from api', () => {
    const anchor = shallow(<Sources />);
    expect(anchor.text().includes('loading...')).toBe(true);
  });

  it('should render all component correctly', () => {
    const component = ReactRenderer.create(<Sources/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
