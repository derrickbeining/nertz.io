import '../../../node_modules/firebaseui/dist/firebaseui.css'
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import displayAuthPanelIn from '../../firebase/authUI';
// import firebase from 'firebase';
// const auth = firebase.auth();

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    // Note: Form values left uncleared for now, since will be redirecting
    this.state = {
      redirectSignedInUser: false
    }
  }

  componentDidMount() {
    return displayAuthPanelIn('#auth-ui-panel')
  }

  handleSignOut () {
    auth.signOut()
  }


  handleSignIn () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.length < 4 || email.indexOf('@') === -1) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a valid password.');
      return;
    }
    // Sign in with email and pass.
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("This is user after signing in: ", auth.currentUser.email)
      this.setState({
        redirectSignedInUser: true
      })
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('No such email / password combination. Please try again.');
      console.log(error);
      return;
    });
  }


  render () {
    // if (this.state.redirectSignedInUser) {
    //   return <Redirect to={'/join'} />
    // }
      return (

        <div id="auth-ui-panel"
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '50vh',
            justifyContent: 'space-around',
          }}
        />
        // <div>
        //   {true &&
        //   <div>
        //     <h1>Sign In To This AWESOME Game</h1>
        //     <input className="text-input" type="text" id="email" name="email" placeholder="Email"/>
        //     <input className="text-input" type="password" id="password" name="password" placeholder="Password"/>
        //     <br/>
        //     <button className="signin-button" id="quickstart-sign-in" onClick={this.handleSignIn} name="signin">Sign In</button>
        //   </div>
        //   }

        //   {false &&
        //   <div>
        //     <h1>Hi there, {this.state.displayName}!</h1>
        //     <button className="signout-button" id="quickstart-sign-out" onClick={this.handleSignOut} name="signout">Sign Out</button>
        //   </div>
        //   }

        // </div>
      )
  }
}

const styles = {
  btn: {
    background: '#f5eff7',
    backgroundImage: 'linear-gradient(to bottom, #f5eff7, #d6d3d6)',
    borderRadius: '8px',
    boxShadow: '2px 2px 3px #666666',
    fontFamily: 'Arial',
    color: '#4d404d',
    fontSize: '18px',
    padding: '5px 7px 5px 7px',
    textDecoration: 'none',
  }
}

export default SignIn
