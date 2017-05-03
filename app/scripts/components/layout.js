import React from 'react';
import {Link} from 'react-router';
import Source from './sources';
import Headline from './headlines';
import {listSources} from '../apiCall/news';
import axios from 'axios';

export default class Layout extends React.Component {
    constructor(prop){
        super(prop);
        this.state = {};
        this.getSources = this.getSources.bind(this);
    }

    getSources(){
        const url = 'https://newsapi.org/v1/sources';
        const data = axios.get(url).then(res => {
            const data = listSources(res.data.sources);1
        });
    }
    render(){
        this.getSources();
        return(
            <div className='row'>
                
                    <div class='col-md-4'>
                        <Source/>
                    </div>
                    <div className='col-md-8'>
                        <Headline/>
                    </div>
                                
            </div>
        );
    }
}