import React from 'react';
import GoogleLogin from 'react-google-login';
import PopUp from 'sweetalert2';
import * as Action from './../actions/actions';
import Store from './../store/store';
import Article from './articles.jsx';
import Source from './sources.jsx';
/**
 * The layout component which houses all other components
 * @extends React.Component
 */
export default class Layout extends React.Component {
  /**
   * Creates the layout component
   */
  constructor() {
    super();
    this.state = {
      login: 'Google+ login',
      isLogedIn: false,
      user: {}
    };
    this.getFavourites = this.getFavourites.bind(this);
    this.successGoogleLogin = this.successGoogleLogin.bind(this);
    this.failedGoogleLogin = this.failedGoogleLogin.bind(this);
    this.signOut = this.signOut.bind(this);
  }
/**
 * fires before the component is mounted
 */
  componentWillMount() {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      this.setState({ isLogedIn: true, user: JSON.parse(userProfile) });
    }
    Store.on('login', () => {
      this.setState({
        isLogedIn: Store.isAuthenticated,
        user: Store.user
      });
    });

    Store.on('logout', () => {
      this.setState({
        isLogedIn: Store.isAuthenticated,
        user: Store.user
      });
    });
  }
  // called when user logs in successfully using google+
  /**
   * Signs the user in from google+
   * @param {object} response - response from the google api containing
   * user profile information
   */
  successGoogleLogin(response) {
    const userInfo = response.profileObj;
    Action.signInUser(userInfo.familyName, userInfo.email);
  }
  // Called when user logs out from the application
  /**
   * Signs the user out of the application
   */
  signOut() {
    Action.signOutUser(this.state.user);
  }
  /**
   * fires when user fails to login successfully using google+
   */
  failedGoogleLogin() {
    PopUp({
      title: 'Login Failed',
      text: 'Try to login using your google mail account',
      type: 'error',
      confirmButtonText: 'ok'
    });
  }
  // get the stored articles from local storage
  /**
   * Get favourtie articles from the store
   */
  getFavourites() {
    if (this.state.isLogedIn) {
      Action.fetchFavourites();
    } else {
      PopUp({
        title: 'Not Logged in',
        text: 'Login to view saved articles!',
        type: 'error',
        confirmButtonText: 'ok'
      });
    }
  }
  /**
   * Render the general layout
   * @return {object} returns the react component to be rendered
   */
  render() {
    const minHeight = {
      minHeight: window.innerHeight - 342
    };
    const identity = this.state.isLogedIn ? (<div className="pull-right">
      <span className="">Welcome {this.state.user.name}&nbsp;</span>
      <button onClick={this.signOut}>Log out</button></div>)
      : (<GoogleLogin className="pull-right" id="google"
        clientId={process.env.GOOGLE_CLIENT_KEY}
        buttonText={this.state.login}
        onSuccess={this.successGoogleLogin}
        onFailure={this.failedGoogleLogin} />);
    return (
      <div>
        <div className="row">
          <div id="news-header">
            <div id="site-name" className="pull-left">infoconnect</div>
            {identity}
            <button className="pull-right"
              onClick={this.getFavourites}>Favorites</button>
          </div>

          <div id="news-banner">
            <h1 className="text-center">
              Get updated news from over 70 reliable sources<br />
              around the world.</h1>
          </div>
        </div>

        <div className="container" style={minHeight}>
          <div className="row">
            <Source />
            <Article isAuthenticated={this.state.isLogedIn}/>
          </div>
        </div>

        <footer>
          <span>infoconnect &copy;2017</span>
          <span className="pull-right">powered by
            &nbsp;<a href="http://www.newsapi.org">newsapi</a></span>
        </footer>

      </div>
    );
  }
}
