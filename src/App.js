import React, { Component} from "react";
import { Route } from "react-router-dom";
import Header from "./Common/Header";
import Add from "./View/Add";
import Home from "./View/Home";
import View from "./View/List";
import './App.css';

class App extends Component{
  render(){
    return (
      <div id="wrapper">
        <Header />
        <div id="content">
            <Route exact path="/" component={Home}/>
            <Route path="/add" component={Add}/>
            <Route path="/view" component={View}/> 
        </div>
      </div>
    );
  }
}

export default App
