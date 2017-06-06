import React from 'react';
import { shallow } from 'enzyme';
import '../../__mocks__/localStorageMock';
import * as Action from '../../app/actions/actions';
import Layout from './../../app/components/layout.jsx';

describe('The layout component', () => {
  it('should render all component correctly', () => {
    const component = shallow(<Layout/>);
    const dom = component.node.props.children;
    const header = dom[0].props.children;
    const newHeader = header[0].props;
    expect(newHeader.id).toBe('news-header');
  });

  it('should not call fetchFavourites when user is not logged in', () => {
    const spy = jest.spyOn(Action, 'fetchFavourites');
    const layout = new Layout();
    layout.getFavourites();
    expect(spy).not.toBeCalled();
  });

  it('should call fetchFavourites function when user is logged in', () => {
    const spy = jest.spyOn(Action, 'fetchFavourites');
    const layout = new Layout();
    layout.state.isLogedIn = true;
    layout.getFavourites();
    expect(spy).toBeCalled();
  });

  it('should call signInUser function to login user in', () => {
    const res = { profileObj: {
      familyName: 'mazi',
      email: 'andela-mugochuwku@andela.com'
    } };
    const spy = jest.spyOn(Action, 'signInUser');
    const layout = new Layout();
    layout.successGoogleLogin(res);
    expect(spy).toBeCalled();
  });
});
