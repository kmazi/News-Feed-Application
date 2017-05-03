import React from 'react';
import news from '../apiCall/news';

export default class Source extends React.Component{
    constructor(){
        super();
            }
    render(){
        return(
           <div>
               
               <div>
                   {this.props.data[0]}
               </div>
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