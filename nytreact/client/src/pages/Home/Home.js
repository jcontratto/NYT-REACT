import React, { Component } from "react";
import Delete from "../../components/Delete";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormButton } from "../../components/Form";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      item: {},
      title: "",
      startdate: "",
      enddate: "",
      savedArticles: []
    };
  }

  // componentDidMount() {
  //     this.loadArticles();
  // }

  // loadArticles = () => {
  //     API.getArticles()
  //         .then(res =>
  //             this.setState({ articles: res.data, title: "", startdate: "", enddate: "" })
  //         )
  //         .cath(err => console.log(err));
  // };

  // deleteArticles = id => {
  //     API.deleteArticles(id)
  //       .then(res => this.loadArticles())
  //       .catch(err => console.log(err));
  //   };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.startdate && this.state.enddate) {

      API.searchArticles({
        q: this.state.title,
        start_date: this.state.startdate,
        end_date: this.state.enddate
      })
        .then(res => {
          this.setState({
            articles: res.data
          })

        })
        .catch(err => console.log(err));
    }
  };

  saveArticle = (articleData) => {
    API.saveArticle(articleData).then(res => {
      console.log(res.data)
      this.setState({
        savedArticles: this.state.articles.concat([res.data])
      })
    })
  }

  checkForSaved = (article) => {
    const articleIds = this.state.savedArticles.map((article) => {
      return article.id
    })
    const isSaved = articleIds.indexOf(article.id) !== -1
    return isSaved
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Search</h1>
            </Jumbotron>
            <form>
              <h2>Search Article</h2>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <h2>Enter Start Date</h2>
              <Input
                value={this.state.startdate}
                onChange={this.handleInputChange}
                name="startdate"
                placeholder="YYYYMMDD (required)"
              />
              <h2>Enter End Date</h2>
              <Input
                value={this.state.enddate}
                onChange={this.handleInputChange}
                name="enddate"
                placeholder="YYYYMMDD (required)"
              />
              <FormButton
                disabled={!(this.state.startdate && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit
                  </FormButton>
            </form>
          </Col>
        </Row>
        {this.state.articles.map((article) => {

          return (
            <div className="card" key={article.id}>
              <div className="card-header">
              </div>
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.summary}</p>
                <p className="card-date">{article.date}</p>
                <a target="_blank" href={article.url} className="card-url">{article.url}</a>
                {!this.checkForSaved(article) && <div onClick={() => this.saveArticle(article) } className="btn btn-primary">Save</div>}
              </div>
            </div>
          );
        })}

        {/* <p>"This is saving"</p> */}

        {/* {this.state.savedArticles.map((article) => {
          return (
            <div className="card" key={article.id}>
              <div className="card-header">
              </div>
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.summary}</p>
                <p className="card-date">{article.date}</p>
                <a target="_blank" href={article.url} className="card-url">{article.url}</a>
               
                <a href="#" className="btn btn-primary">Save</a>
              </div>
            </div>
          );
        })} */}
      </Container>
    );
  }
}

export default Home;