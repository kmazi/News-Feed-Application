import React from 'react';
import ReactDom from 'react-dom';
import Headlines from './../../app/components/headlines.jsx';

describe('The headlines component', () => {
  it('must render without throwing error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Headlines/>, div);
  });
});
