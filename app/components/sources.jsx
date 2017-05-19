import React from 'react';
import jquery from 'jquery';
import * as ApiActions from './../actions/apiActions';
import ApiDataStore from './../store/apistore';

class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = { source: [{ id: 'loading...' }], ids: [] };
    this.nsourcelist = [];
    this.getArticles = this.getArticles.bind(this);
    this.searchSource = this.searchSource.bind(this);
  }

  componentWillMount() {
    const url = 'https://newsapi.org/v1/sources';
    jquery.get(url, (data) => {
      const sourcelist = data.sources.map((d) => {
        return { id: d.id, name: d.name };
      });

      this.setState({
        source: data.status === 'ok' ?
          data.sources : [{ id: 'Sources are unavailable' }],
        ids: sourcelist
      });

      ApiDataStore.on('change', () => {
        this.nsourcelist = ApiDataStore.sourcelist;
        if (this.nsourcelist !== []) {
          this.setState({ source: this.nsourcelist });
        } else {
          this.setState({ source: this.state.ids });
        }
      });
    });
  }

  getArticles(event) {
    event.preventDefault();
    ApiActions.getArticlesFromApi(event.target.getAttribute('value'));
  }

  searchSource(event) {
    const sources = this.state.ids;
    ApiActions.searchThroughSources(event.target.value, sources);
  }

  render() {
    let apisource = this.state.source[0].id;
    if (this.state.source[0].id === 'loading...' ||
      this.state.source[0].id === 'Sources are unavailable') {
      apisource = <a href="#">{this.state.source[0].id}</a>;
    } else {
      apisource = this.state.source.map((data, i) => {
        return (<div key={i}>
          <a className="" href="#" value={data.id}
            onClick={this.getArticles}>
            {data.name}</a>
        </div>);
      });
    }

    return (
      <div className="col-md-3" id="news-source">
        <h3 className="">News Channels</h3>
        <div>
          <input className="form-control" placeholder="search news sources"
            onChange={this.searchSource} />
          {apisource}
        </div>
      </div>
    );
  }
}

export default Source;
