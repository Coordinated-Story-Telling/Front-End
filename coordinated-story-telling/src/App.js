import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Redirect  } from 'react-router-dom';

import Stories from './components/Stories'
import { Story, StoryEditor } from './components/Story'
import Register from './components/Register'

import './App.css';

import { fetchStory } from './actions/actions'
import { signOut } from './actions/login'
import { connect } from 'react-redux'
import SignIn from './components/SignIn';
import MyStory from './components/MyStory';

class App extends Component {
  constructor() {
    super()
    this.state = {
      filteredStories: [],
      selectedCountry: "All Countries",
      countries: ["All Countries", "Bolivia", "Brazil", "Cambodia", "Colombia", "Ecuador", "El Salvador", "Ghana", "Guatemala", "Haiti", "Honduras", "Kiribati", "Madagascar", "Mongolia", "Nicaragua", "Paraguay", "Peru", "Philippines", "Sierra Leone", "Zimbabwe"],
    }
  }
  componentDidMount = () => {
    this.props.fetchStory()
  }

  filterStoriesByCountry = event => {
    const country = event.target.value
    this.setState({
      selectedCountry: country,
    })
  }

  SignOut = () => {
    this.props.signOut()
    return <Redirect to='/' ></Redirect>
  }

  render() {
    // console.log(this.props)
    return (
      <Router>
        <div className="App">
          <nav>
            <NavLink exact to='/stories'>Stories</NavLink>
            {localStorage.token ? 
              <NavLink to={`/mystories`}>My Stories</NavLink> :
              <NavLink to='/login'>Log In</NavLink>
            }
            
            {localStorage.token ? 
              <button onClick={this.SignOut}>Sign Out</button> :
              <NavLink to='/signup'>Sign Up</NavLink>
            }
          </nav>

          <Route 
          exact path='/' 
          render={() => <Redirect to='/stories' />} />
          <Route 
          exact path='/stories' 
          render={
            props => <Stories 
            {...props} 
            {...this.props} 
            {...this.state}
            filterStoriesByCountry={this.filterStoriesByCountry} />} 
          />
          <Route exact path='/stories/:id' render={props => <Story {...props} {...this.props}/>}/> 
          <Route path='/stories/:id/edit' render={props => <StoryEditor {...props} {...this.props} {...this.state}/>}/> 

          <Route exact path='/mystories' render={ props => { 
            if (localStorage.token) return <MyStory {...props} {...this.props}/>
            return <Redirect to='/' />
          }}/>
          
          <Route path='/login' render={ props => { 
            if (this.props.currentUser) {
              return <Redirect to='/' /> 
            } else {
              return <SignIn 
              {...props} 
              />
            }
          }}/>

          <Route path='/signup' render={ props => { 
            if (this.props.newUser) {
              return <Redirect to='/' />
            } else {
              return <Register 
              {...props} 
              />
            }
          }}/>
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = state => {
  console.log(state)
  return {
    stories: state.story.stories,
    currentUser: state.login.currentUser,
    newUser: state.register.currentUser,
    myStories: state.userStory.myStories,

  }
} 

export default connect(mapStatetoProps, { fetchStory, signOut })(App)
