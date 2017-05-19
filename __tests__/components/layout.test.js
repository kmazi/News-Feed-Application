import React from 'react';
import ReactDom from 'react-dom';
import Layout from './../../app/components/layout.jsx';

describe('The layout component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Layout/>, div);
  });
});
