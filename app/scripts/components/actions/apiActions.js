import dispatcher from '../dispatcher';
import jquery from 'jquery';

const url =  'https://newsapi.org/v1/articles';
const key = '213327409d384371851777e7c7f78dfe';
export function getApiData(source){
        const src = source.target.getAttribute('value');
        
        let data = {source: src, apiKey: key};
        jquery.get(url, data, (res)=>{
            dispatcher.dispatch(
            {
            type: 'GET_API_ARTICLE',
            headlines: res
            }
        );
    });
    
}

export function getApiFilteredData(filter){
        
}