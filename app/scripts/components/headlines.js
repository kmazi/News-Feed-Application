import React from 'react';
import news from '../apiCall/news';
import * as ApiActions from './actions/apiActions';

export default class Headline extends React.Component{
    constructor(props){
        super(props);
        this.getHeadlineFilter = this.getHeadlineFilter.bind(this);
    }
    
    getHeadlineFilter(e){
        e.preventDefault();
        ApiActions.getApiFilteredData(e);
    }

    renderArticles(){
        let imagesize ={
            maxHeight: 300,
            maxWidth: '100%'
        };
        
        const data = this.props.data;
        if(data.source!=='loading...'){
            let headlinedata = data.articles.map((obj, i)=>{
                return <div key={i} data-content="news" className="row">
                        <div className='col-md-5'>
                            <img style={imagesize} src={obj.urlToImage}/>
                        </div>
                        <div className="col-md-7">
                            <h4 className="text-center"> {obj.title}</h4>
                            <p>{obj.description}</p>
                            <div >
                            <a href={obj.url} target="blank">Read more..</a>
                            </div>
                        </div>
                        </div>
            });
            return headlinedata;
        } 
    }
    render(){
        let margin={
          marginTop: 20
        }
        return(
           <div>
               <div className="row">
                 <h3 className="pull-left">Headlines</h3>
                 <div className="pull-right" style={margin}>
                   <button className='btn btn-default btn-primary' data-filter={this.props.filter} value='top' onClick={this.getHeadlineFilter}>Top</button>
                   <button className='btn btn-default btn-primary' data-filter={this.props.filter} value='popular' onClick={this.getHeadlineFilter}>Popular</button>
                   <button className='btn btn-default btn-primary' data-filter={this.props.filter} value='latest' onClick={this.getHeadlineFilter}>Latest</button>
                 </div>
               </div>
               <div>
                    {
                       this.renderArticles()   
                   }
               </div>
                   
           </div>
        );
    }
}