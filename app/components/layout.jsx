import React from 'react';
import jquery from 'jquery';
import GoogleLogin from 'react-google-login';
import * as ApiActions from './../actions/apiActions';
import ApiDataStore from './../store/apistore';
import Headline from './headlines.jsx';
import Source from './sources.jsx';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceFeed: { source: 'loading...' }
    };
    this.successGoogleLogin = this.successGoogleLogin.bind(this);
  }

  componentWillMount() {
    const articleUrl = 'https://newsapi.org/v1/articles';
    const key = process.env.NEWS_API_KEY;
    const apiData = { source: 'cnn', apiKey: key };

    jquery.get(articleUrl, apiData, (res) => {
      this.setState({ sourceFeed: res });
    });

    ApiDataStore.on('click', () => {
      this.setState({ sourceFeed: ApiDataStore.articles });
    });
  }

  successGoogleLogin = (response) => {
    const userInfo = response.profileObj,
      userName = userInfo.familyName,
      userEmail = userInfo.email,
      userId = userInfo.googleId;
    ApiActions.signInUser(userName, userEmail, userId);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div id="news-header">
            <div id="site-name" className="pull-left">iNews</div>
            <GoogleLogin className="pull-right btn btn-default btn-primary"
              clientId={process.env.GOOGLE_CLIENT_KEY}
              buttonText="Google+ Login"
              onSuccess={this.successGoogleLogin}
              onFailure={this.responseGoogle} />
          </div>

          <div id="news-banner">
            <h1 className="text-center">
              Get updated news from over 70 reliable sources<br/> around the world.</h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <Source />
            <Headline data={this.state.sourceFeed}
              filter={this.state.sourceFeed.source} />
          </div>
        </div>

        <footer>
          <span>iNews &copy;2017</span>
        </footer>

      </div>
    );
  }
}
