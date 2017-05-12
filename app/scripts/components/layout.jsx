import React from 'react';
import jquery from 'jquery';
import ApiDataStore from './store/apistore';
import * as ApiActions from './actions/apiActions';
import GoogleLogin from 'react-google-login';
import Headline from './headlines';
import '../../styles/main.scss';
import {Link} from 'react-router';
import {listSources} from '../apiCall/news';



export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {source: [{id:'loading...'}], source1: {source:'loading...'}};
    this.getHeadlineData = this.getHeadlineData.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  componentWillMount() {
    const url = 'https://newsapi.org/v1/sources';
    const url1 = 'https://newsapi.org/v1/articles';
    const key = '213327409d384371851777e7c7f78dfe';
    const apiData = { source: 'abc-news-au', apiKey: key };

      jquery.get(url,(data)=>{
      this.setState({source:data.status === 'ok'? data.sources: [{id:'Sources are unavailable'}]});
      });
      jquery.get(url1, apiData, (res)=>{
      this.setState({source1: res});
      });

      ApiDataStore.on('change', ()=>{
      this.setState({source1: ApiDataStore.headlines});
      });

  }

  getHeadlineData(e){
    e.preventDefault();
    ApiActions.getApiData(e);
  }
     
  responseGoogle = (response) => {
    console.log(response.profileObj.email);
  }

  render(){
    return(
      <div className="row">
        <div id="news-header">
          <div id="site-name" className="pull-left">iNews</div>
          <GoogleLogin className="pull-right"
          clientId="612880892062-b1up84kvbqgnh2mt5vjlh1cqb4554ult.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle} />  
        </div>
  
        <div>
          <div className='jumbotron'>
            <h2>Get upto date news from around the world from different reliable sources.</h2>
          </div>
        </div>

          <div class="col-md-3" id="news-source">
            <h3 className=''>News Channels</h3>
            <div>
              {this.state.source.map((data, i)=>{
                return <div key={i}>
                  <a className='h5' href='#' value={data.id} onClick={this.getHeadlineData}>
                    {data.name}</a>
                </div>
              })}
            </div>
          </div>

          <div className="col-md-8" id="news-headline">
            <Headline data={this.state.source1} filter={this.state.source1.source}/>
          </div>                
        </div>
      );
    }
}