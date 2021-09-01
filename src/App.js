import 'react-app-polyfill/ie11';
import React, {Component, useState, useEffect} from 'react';
import {Switch,Route} from 'react-router-dom';
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import Article from "./components/article";
import CreatePost from "./components/post";
import Home from "./components/home";
import './index.scss';


const App = withRouter(({ location }) => {


      return (

          <div>
            <Header/>
            <TransitionGroup className="transition-group">
              <CSSTransition
                  key={location.key}
                  classNames="transition-element fade"
                  transitionAppear={true}
                  transitionEnter={true}
                  transitionLeave={true}
                  timeout={{
                    appear: 300,
                    enter: 300,
                    exit: 300,
                  }}
                  unmountOnExit={true}
                  appear
              >
                <Switch location={location} className='container'>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/sign-up' component={Register}/>
                  <Route exact path='/create-post' component={CreatePost}/>
                  <Route exact path='/ueber-mich' component={Article}/>


                </Switch>
              </CSSTransition>
            </TransitionGroup>


          </div>
      )
    }
);

export default App;

