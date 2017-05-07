import {EventEmitter} from 'events';
import jquery from 'jquery';
import dispatcher from '../dispatcher';

class ApiDataStore extends EventEmitter{
    constructor(){
        super();
        this.headlines = {};
    }

    getArticleData(data){
        this.headlines = data;
        this.emit("change");
    }

    handleAllActions(action){
        switch(action.type){
            case 'GET_API_ARTICLE': {
                this.getArticleData(action.headlines);
            }
        }
    }
}

const apidatastore  = new ApiDataStore;
dispatcher.register(apidatastore.handleAllActions.bind(apidatastore));
export default apidatastore;