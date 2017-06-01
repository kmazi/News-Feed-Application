import React from 'react';
import Axios from 'axios';
import swal from 'sweetalert2';
import Store from './../store/store';

class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      sourceName: 'CNN',
      filter: '',
      isAuthenticated: false
    };
    this.addFavourite = this.addFavourite.bind(this);
  }

  componentWillMount() {
    const articleUrl = 'https://newsapi.org/v1/articles';
    const key = process.env.NEWS_API_KEY;
    const paramInfo = { params: { source: 'cnn', apiKey: key } };
    // make asynchronous call to newsapi.org for articles
    Axios.get(articleUrl, paramInfo).then((res) => {
      this.setState({ articles: res.data.articles });
    });

    // listen for click event from the store
    Store.on('click', () => {
      this.setState({
        articles: Store.articles,
        sourceName: Store.sourceName,
        filter: Store.filter
      });
    });

    Store.on('login', () => {
      this.setState({
        isAuthenticated: Store.isAuthenticated,
        user: Store.user
      });
    });

    Store.on('logout', () => {
      this.setState({
        isAuthenticated: Store.isAuthenticated,
        user: Store.user
      });
    });

    Store.on('favourites', () => {
      this.setState({
        articles: Store.savedArticles,
        filter: '',
        sourceName: 'Favourite Articles'
      });
    });
  }

  addFavourite(event) {
    event.preventDefault();
    const favourite = {};
    favourite.urlToImage = event.target.getAttribute('data-articleImg');
    favourite.title = event.target.getAttribute('data-articleTitle');
    favourite.description = event.target.getAttribute('data-articleDesc');
    favourite.url = event.target.getAttribute('data-articleUrl');
    if (this.state.isAuthenticated) {
      localStorage.setItem(favourite.url, JSON.stringify(favourite));
      swal({
        title: 'Favourite Articles',
        text: 'You have successfully added an article to your favourite list',
        type: 'success',
        confirmButtonText: 'ok'
      });
    } else {
      swal({
        title: 'Not Logged in',
        text: 'Log in to add articles to favourite list',
        type: 'info',
        confirmButtonText: 'ok'
      });
    }
  }

  shouldRenderDelButton(article) {
    let button = null;
    if (this.state.sourceName !== 'Favourite Articles') {
      button = (<a href="#" data-articleImg={article.urlToImage}
        data-articleTitle={article.title}
        data-articleDesc={article.description}
        data-articleUrl={article.url}
        onClick={this.addFavourite}>add to favorites</a>);
    }
    return button;
  }
  // Contains logic that renders articles
  renderArticles() {
    const articles = this.state.articles;
    const containsArticles = articles.length > 0 &&
      typeof articles === 'object';
    let articleContents = null;
    if (articles === 'No articles stored in your favourite list') {
      articleContents = 'No articles in your favourite list';
      swal({
        title: 'Favourite Articles',
        text: 'Your favourite list is empty!',
        type: 'info',
        confirmButtonText: 'ok'
      });
    } else
      // If articles from newsapi.org is ready, render this component snippet
      if (containsArticles) {
        articleContents = articles.map((article, i) => {
          return (
            <div key={i} data-content="news" className="row">
              <div className="col-md-5">
                <img alt="article image" src={article.urlToImage} />
              </div>
              <div className="col-md-7">
                <h4 className="text-center"> {article.title}</h4>
                <p>{article.description}</p>
                <div >
                  <a href={article.url} target="blank">Read more..</a>
                  {this.shouldRenderDelButton(article)}
                </div>
              </div>
            </div>
          );
        });
      } else {
        articleContents = <h4>{articles}</h4>;
      }
    return articleContents;
  }

  render() {
    return (
      <div className="col-md-9" id="news-headline">
        <div data-content="news-header" className="row">
          <h3 className="pull-left">
            <span className="badge">{this.state.filter}</span>
            Headlines from {this.state.sourceName}</h3>
        </div>
        <div>
          {this.renderArticles()}
        </div>

      </div>
    );
  }
}

export default Article;
