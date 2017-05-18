import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ApiDataStore extends EventEmitter {
  constructor() {
    super();
    this.headlines = {};
    this.sourcelist = [];
  }

  setArticleData(data) {
    this.headlines = data;
    this.emit('change');
  }

  setFilteredArticle(data) {
    if (typeof data !== 'object') {
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
    this.emit('click');
  }

  handleAllActions(action) {
    switch (action.type) {
      case 'GET_API_ARTICLE': {
        this.setArticleData(action.headlines);
        break;
      }
      case 'GET_API_FILTERED_ARTICLE': {
        this.setFilteredArticle(action.headlines);
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
