import React, { Component } from "react";
import Delete from "../../components/Delete";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormButton } from "../../components/Form";


class Home extends Component {
  state = {
    articles: [],
    title: "",
    startdate: "",
    enddate: ""
  };

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
        API.saveArticles({
          title: this.state.title,
          startdate: this.state.startdate,
          enddate: this.state.enddate
        })
          .then(res => this.loadArticles())
          .catch(err => console.log(err));
      }
    };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.startdate}
                onChange={this.handleInputChange}
                name="start-date"
                placeholder="Start Date (required)"
              />
              <Input
                value={this.state.enddate}
                onChange={this.handleInputChange}
                name="end-date"
                placeholder="End Date (required)"
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
      </Container>
    );
  }
}

export default Home;


