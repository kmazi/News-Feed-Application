import React from 'react';
import {Link} from 'react-router';
import Source from './sources';
import Headline from './headlines';
import {listSources} from '../apiCall/news';
import jquery from 'jquery';
import ApiDataStore from './store/apistore';
import * as ApiActions from './actions/apiActions';
import GoogleLogin from 'react-google-login';


export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {source: [{id:'loading...'}], source1: {source:'loading...'}};
        this.getHeadlineData = this.getHeadlineData.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    componentWillMount() {
        const url = 'https://newsapi.org/v1/sources';
        const url1 = '';

        jquery.get(url,(data)=>{
            this.setState({source:data.status === 'ok'? data.sources: [{id:'Sources are unavailable'}]});
        });
        jquery.get();

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
            
            <div className='row'>
                <GoogleLogin
                    clientId="612880892062-b1up84kvbqgnh2mt5vjlh1cqb4554ult.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
                <div>
                    <div>iNews</div>
                    <div className='jumbotron'>
                        <h2>Get upto date news from around the world from different reliable sources.</h2>
                    </div>
                </div>

                <div class='col-md-3'>
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
                <div className='col-md-8'>
                    <h3 className=''>Filter Headlines</h3>
        
                    <Headline data={this.state.source1} filter={this.state.source1.source}/>
                </div>
                                
            </div>
        );
    }
}