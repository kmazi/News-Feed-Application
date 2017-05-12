import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ApiDataStore extends EventEmitter {
    constructor() {
        super();
        this.headlines = {};
    }

    getArticleData(data) {
        this.headlines = data;
        this.emit('change');
    }

    getArticleFilteredData(data){
        if(typeof data === 'string')
        {
            alert(data);
        }
        else{
            this.headlines = data;
            this.emit('change');
        }
        
    }

    handleAllActions(action){
        switch(action.type){
            case 'GET_API_ARTICLE': {
                this.getArticleData(action.headlines);
            }
            case 'GET_API_FILTERED_ARTICLE': {
                this.getArticleFilteredData(action.headlines);
            }
        }
    }
}

const apidatastore  = new ApiDataStore;
dispatcher.register(apidatastore.handleAllActions.bind(apidatastore));
export default apidatastore;