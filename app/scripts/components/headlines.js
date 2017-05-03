import React from 'react';
import news from '../apiCall/news';

export default class Headline extends React.Component{
    constructor(){
        super();
            }
    render(){
        return(
           <div>
               <h3 className='btn btn-default'>Filter Headlines</h3>
               <div>
                   <button className='btn btn-default btn-primary'>Top</button>
                   <button className='btn btn-default btn-primary'>Popular</button>
                   <button className='btn btn-default btn-primary'>Latest</button>
               </div>
               <div className='row'>
                        
               </div>
           </div>
        );
    }
}