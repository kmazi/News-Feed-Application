import React from 'react';
import jquery from 'jquery';
import GoogleLogin from 'react-google-login';
import ApiDataStore from './store/apistore';
import Headline from './headlines';
import Source from './sources';
import '../../styles/main.scss';

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
    const key = '213327409d384371851777e7c7f78dfe';
    const apiData = { source: 'cnn', apiKey: key };

    jquery.get(articleUrl, apiData, (res) => {
      this.setState({ sourceFeed: res });
    });

    ApiDataStore.on('change', () => {
      this.setState({ sourceFeed: ApiDataStore.headlines });
    });
  }

  successGoogleLogin = (response) => {
    
  }

  render() {
    return (
      <div>
        <div className="row">
          <div id="news-header">
            <div id="site-name" className="pull-left">iNews</div>
            <GoogleLogin className="pull-right"
              clientId="612880892062-b1up84kvbqgnh2mt5vjlh1cqb4554ult.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.successGoogleLogin}
              onFailure={this.responseGoogle} />
          </div>

          <div id="news-banner">
            <h1 className="text-center">
              Get upto date news from reliable sources around the world.</h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <Source />
            <Headline data={this.state.sourceFeed}
              filter={this.state.sourceFeed.source} />
          </div>
        </div>

      </div>
    );
  }
}
