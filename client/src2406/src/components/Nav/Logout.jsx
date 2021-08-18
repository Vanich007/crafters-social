import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser} from './redux/actions';
import Signup from './components/Signup';
import Login from './components/Login';


class App extends Component {
  componentDidMount = () => {
    this.props.getProfileFetch()
  }

  handleClick = event => {
    event.preventDefault()
    // Удаление token из localStorage
    localStorage.removeItem("token")
    // удаление из Redux хранилица
    this.props.logoutUser()
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
        </Switch>
          {this.props.currentUser.username
            ? <button onClick={this.handleClick}>Log Out</button>
            : null
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reducer.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);