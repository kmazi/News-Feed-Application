import React from 'react';
import news from '../apiCall/news';

export default class Source extends React.Component{
    constructor(){
        super();
            }
    render(){
        return(
           <div>
               <h3 className='btn btn-default'>News Channels</h3>
               <NewsSource />
           </div>
        );
    }
}

export class NewsSource extends React.Component{
    render(){
        return(
            <div>
                
            </div>
        );
    }
}