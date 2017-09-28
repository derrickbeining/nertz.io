import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome} from './components'
import {me, updateReduxUsersUponDbUpdates} from './store'
import firebase from 'firebase'
import secrets from '../secrets'


/* FIREBASE */
  // Initialize Firebase

  // firebase.initializeApp(secrets.firebaseConfig);

  // const database = firebase.database()

  // var users = database.ref('users/');
  // users.on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });


  // database.ref('users/' + 15).set({
  //   name: 'Bob',
  //   score: 3
  // });

  // database.ref('users/15').update({
  //   score: 45
  // })
  //   .then(() => )
//   let score = 3

//  // document.querySelector('body').addEventListener("click", () => {
//  //    score++
//  //    database.ref('users/15').push({
//  //        score: score
//  //    })
//  //  })

//   document.querySelector('body').addEventListener("click", () => {

//   })


//   // database.ref('users/').once('value')
//   //   .then(snapshot => {
//   //     console.log('snapshot: ', snapshot, 'snapshot.val(): ', snapshot.val())
//   //   })


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path='/home' component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(updateReduxUsersUponDbUpdates());
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
