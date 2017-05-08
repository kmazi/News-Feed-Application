import dispatcher from '../dispatcher';
import jquery from 'jquery';

const url =  'https://newsapi.org/v1/articles';
const key = '213327409d384371851777e7c7f78dfe';
export function getApiData(source){
        const src = source.target.getAttribute('value');
        const data = {source: src, apiKey: key};

        jquery.ajax({
            url: url,
            data: data,
            success: (res)=>{
              dispatcher.dispatch(
                {
                type: 'GET_API_ARTICLE',
                headlines: res
                }
               );
              },
             error(xhr){
                dispatcher.dispatch(
                {
                  type: 'GET_API_ARTICLE',
                  headlines: "Error in loading headlines"
                }
               );
             }
        });
        
}

export function getApiFilteredData(e){
       const src = e.target.getAttribute('data-filter');
       const filter = e.target.getAttribute('value');
       const data = {apiKey: key, source: src, sortBy: filter} 

       jquery.ajax({
            url: url,
            data: data,
            success: (res)=>{
              dispatcher.dispatch(
                {
                type: 'GET_API_FILTERED_ARTICLE',
                headlines: res
                }
               );
              },
             error(jqXHR, textStatus, errorThrown ){
                dispatcher.dispatch(
                {
                  type: 'GET_API_FILTERED_ARTICLE',
                  headlines: "Error in loading headlines: "+ filter + ' headlines aren\'t available'
                }
               );
             }
        });

}