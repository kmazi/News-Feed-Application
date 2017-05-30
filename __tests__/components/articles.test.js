import React from 'react';
import ReactDom from 'react-dom';
import Article from './../../app/components/articles.jsx';

describe('The headlines component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Article/>, div);
  });
});
