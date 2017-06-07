import React from 'react';
import Axios from 'axios';
import PopUp from 'sweetalert2';
import PropTypes from 'prop-types';
import Store from './../store/store';
import * as Action from './../actions/actions';
/**
 * Controls the rendering of the headlines or articles
 * @extends React.Component
 */
class Article extends React.Component {
  /**
   * Creates an article component
   */
  constructor() {
    super();
    this.state = {
      articles: [],
      sourceName: '...',
      filter: ''
    };
    this.favouriteArticles = [];
    this.addFavourite = this.addFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
  }
  /**
   * Executes when the component is to be mounted
   */
  componentWillMount() {
    // listen for click event from the store
    Store.on('click', () => {
      this.setState({
        articles: Store.articles,
        sourceName: Store.sourceName,
        filter: Store.filter
      });
    });
    // listen for favourites event from the store
    Store.on('favourites', () => {
      this.setState({
        articles: Store.savedArticles,
        filter: '',
        sourceName: 'Favourite Articles'
      });
    });
  }
  /**
   * Function that executes after component has mounted
   */
  componentDidMount() {
    const articleUrl = 'https://newsapi.org/v1/articles';
    const sourceUrl = 'https://newsapi.org/v1/sources';
    Axios.get(sourceUrl).then((res) => {
      const index = this.getRandomInt(0, 70);
      const sourceId = res.data.sources[index].id;
      const srcName = res.data.sources[index].name;
      const key = process.env.NEWS_API_KEY;
      const paramInfo = { params: { source: sourceId, apiKey: key } };
      // make asynchronous call to newsapi.org for articles
      Axios.get(articleUrl, paramInfo).then((res) => {
        this.setState({ articles: res.data.articles, sourceName: srcName });
      });
    });
  }
  /**
   * Gets a random number between 0-70
   * @param {number} min - the minimum number to generate
   * @param {number} max - the maximum number to generate
   * @return {number} the number between 0 and 70
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  /**
   * Adds selected article to favourite list
   * @param {object} event - object containing the information about an
   * html element
   */
  addFavourite(event) {
    event.preventDefault();
    const favourite = {};
    favourite.urlToImage = event.target.getAttribute('data-articleImg');
    favourite.title = event.target.getAttribute('data-articleTitle');
    favourite.description = event.target.getAttribute('data-articleDesc');
    favourite.url = event.target.getAttribute('data-articleUrl');
    // Add article to storage if the user is authenticated
    if (this.props.isAuthenticated) {
      this.favouriteArticles.push(favourite);
      localStorage.setItem('favouriteArticles',
      JSON.stringify(this.favouriteArticles));
      PopUp({
        title: 'Favourite Articles',
        text: 'You have successfully added an article to your favourite list',
        type: 'success',
        confirmButtonText: 'ok'
      });
      event.target.style.display = 'none';
    } else {
      PopUp({
        title: 'Not Logged in',
        text: 'Log in to add articles to favourite list',
        type: 'info',
        confirmButtonText: 'ok'
      });
    }
  }
  /**
   * Removes a stored favourite article
   * @param {object} event - Object containing properties of the html element
   * displaying the selected favourite article
   */
  removeFavourite(event) {
    event.preventDefault();
    const key = event.target.getAttribute('data-articleUrl');
    Action.removeFavourite(key);
  }
  /**
   * Adds either the add or remove favourite button
   * @param {object} article - An object containing information about
   * the article to display
   * @return {object} returns an appropriate button to add or remove favourite
   * articles
   */
  favouriteAddDel(article) {
    const display = { display: 'inline' };
    let button = (<a href="#" data-articleImg={article.urlToImage}
      data-articleTitle={article.title}
      data-articleDesc={article.description}
      data-articleUrl={article.url}
      style={display}
      onClick={this.removeFavourite}>remove from favourites</a>);
    if (this.state.sourceName !== 'Favourite Articles') {
      button = (<a href="#" data-articleImg={article.urlToImage}
        data-articleTitle={article.title}
        data-articleDesc={article.description}
        data-articleUrl={article.url}
        onClick={this.addFavourite}>add to favourites</a>);
    }
    return button;
  }
  /**
   * Function that fires when the article component is about to be rendered
   * @return {object} - An object containing the loaded articles
   */
  renderArticles() {
    const articles = this.state.articles;
    const containsArticles = articles.length > 0 &&
      typeof articles === 'object';
    let articleContents = null;
    if (articles === 'No articles stored in your favourite list') {
      articleContents = 'No articles in your favourite list';
      PopUp({
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
                  {this.favouriteAddDel(article)}
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
  /**
   * Fired when the component is about to be rendered
   * @return {object} - an object containing the react object to render
   */
  render() {
    return (
      <div className="col-md-9" id="news-headline">
        <div data-content="news-header" className="row">
          <h3 className="pull-left">
            <span className="">{this.state.filter}&nbsp;</span>
            Headlines from {this.state.sourceName}</h3>
        </div>
        <div>
          {this.renderArticles()}
        </div>

      </div>
    );
  }
}

Article.propTypes = {
  isAuthenticated: PropTypes.bool
};
export default Article;
