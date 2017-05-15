import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ApiDataStore extends EventEmitter {
  constructor() {
    super();
    this.headlines = {};
    this.sourcelist = [];
  }

  getArticleData(data) {
    this.headlines = data;
    this.emit('change');
  }

  getArticleFilteredData(data) {
    if (typeof data === 'string') {
      alert(data);
    } else {
      this.headlines = data;
      this.emit('change');
    }
  }

  searchSources(data, source) {
    let list = [];
    source.forEach((element) => {
      if (element.id.includes(data)) {
        list.push(element);
      }
    });
    this.sourcelist = list;
    this.emit('change');
  }

  handleAllActions(action) {
    switch (action.type) {
      case 'GET_API_ARTICLE': {
        this.getArticleData(action.headlines);
        break;
      }
      case 'GET_API_FILTERED_ARTICLE': {
        this.getArticleFilteredData(action.headlines);
        break;
      }
      case 'SEARCH_THROUGH_SOURCES': {
        this.searchSources(action.data, action.source);
        break;
      }
      default:
    }
  }
}

const apidatastore = new ApiDataStore();
dispatcher.register(apidatastore.handleAllActions.bind(apidatastore));
export default apidatastore;
