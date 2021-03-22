import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
// import logo from './logo.svg';
import Search from './components/Search';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
         <h1>Welcome to Trip Planner</h1>

        <Jumbotron className="jumbo-style">
          <Container className="Intro">
            <Search />
            <Card className="card">
              <Card.Header as="h5" className="d-flex justify-content-center flex-wrap">
                <Card.Body className="d-flex justify-content-center flex-column">
                  <Card.Text>Trip Planner is the web based application that allows users to plan their trip accordigly to their destination.</Card.Text>
                  <Card.Text>All you have to do is enter the desired location into the search bar and we will take care of the rest.</Card.Text>
                  <Card.Text>Trip Planner is connected to multiple APIs to help us provide you with the best information.</Card.Text>
                  <Card.Text>You enter destination and we will provide with cheapest fligh tickets, weather report, things to do and spots to visit.</Card.Text>
                </Card.Body>
              </Card.Header>
            </Card>
          </Container>
        </Jumbotron>

        </header>
        {/* Testing quck GET POST requests */}
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;