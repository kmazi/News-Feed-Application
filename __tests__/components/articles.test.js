import React from 'react';
import ReactDom from 'react-dom';
import ReactRenderer from 'react-test-renderer';
import Article from './../../app/components/articles.jsx';

describe('The headlines component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Article/>, div);
  });
});

describe('The snapshot test', () => {
  const component = ReactRenderer.create(<Article/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
