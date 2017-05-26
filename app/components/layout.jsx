import React from 'react';
import GoogleLogin from 'react-google-login';
import * as Action from './../actions/actions';
import Article from './articles.jsx';
import Source from './sources.jsx';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = { loginStatus: 'Google+ login' };
    this.successGoogleLogin = this.successGoogleLogin.bind(this);
  }

  successGoogleLogin(response) {
    const userInfo = response.profileObj,
      userName = userInfo.familyName,
      userEmail = userInfo.email,
      userId = userInfo.googleId;
    Action.signInUser(userName, userEmail, userId);
  }
// get the stored articles from local storage
  getFavourites() {
    Action.fetchFavourites();
  }
// Render the general layout
  render() {
    const minHeight = {
      minHeight: window.innerHeight - 342 };
    return (
      <div>
        <div className="row">
          <div id="news-header">
            <div id="site-name" className="pull-left">infoconnect</div>
            <GoogleLogin className="pull-right" id="google"
              clientId={process.env.GOOGLE_CLIENT_KEY}
              buttonText={this.state.loginStatus}
              onSuccess={this.successGoogleLogin}
              onFailure={this.responseGoogle} />
              <button className="pull-right"
                onClick={this.getFavourites}>Favorites</button>
          </div>

          <div id="news-banner">
            <h1 className="text-center">
              Get updated news from over 70 reliable sources<br/>
              around the world.</h1>
          </div>
        </div>

        <div className="container" style={minHeight}>
          <div className="row">
            <Source />
            <Article />
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
