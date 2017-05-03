import React from 'react';
import {Link} from 'react-router';
import Source from './sources';
import Headline from './headlines';
import {listSources} from '../apiCall/news';
import najax from 'najax';

export default class Layout extends React.Component {
    constructor(prop){
        super(prop);
        this.state = {source: [{id:"abc news"},{id:"abc news"},{id:"abc news"},{id:"abc news"},{id:"abc news"}]};
        
    }

    componentDidMount() {
        const url = 'https://newsapi.org/v1/sources';
        najax({url: url, type: 'GET'}).success((data)=>{
            let datasrc = JSON.parse(data);
            datasrc = datasrc.sources;
            this.setState({source: datasrc});
        });
    }

    render(){
        
        return(
        
            <div className='row'>
                
                    <div class='col-md-4'>
                        <h3 className='btn btn-default'>News Channels</h3><br/>
                        
                        <div>
                            {this.state.source.map((data, i)=>{
                               return <h6 key={i}>{data.id}</h6>
                            })}
                        </div>
                
                    </div>
                    <div className='col-md-8'>
                        <Headline/>
                    </div>
                                
            </div>
        );
    }
}