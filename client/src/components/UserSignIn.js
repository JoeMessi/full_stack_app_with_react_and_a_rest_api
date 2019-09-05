import React, { Component } from 'react';

export default class UserSignIn extends Component {
  // initial state
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  // change func to handle form inputs
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // submit func that GET the authenticated user
  submit = (e) => {
    e.preventDefault();
    // context from props
    const { context } = this.props;
    // from is either the previous location before landing on '/signin' or '/'
    const { from } = this.props.location.state || {from: { pathname: '/' }};
    // form values from state
    const {
      emailAddress,
      password
    } = this.state;

    // now we can sign-in calling signIn from context
    // which calls getUser method from Data.js to authenticate the user
    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })

  } // end submit func


  render() {
    //const { from } = this.props.location.state;
    //console.log(this.props.location)
    // user credentials from state
    const {
      emailAddress,
      password
    } = this.state;

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          {/* ternary operator -> validation errors ? show them : show nothing */}
          {
            this.state.errors.length ?
            <div>
              <div className="validation-errors">
                <ul>
                  {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            </div> : null
          }
          <div>
            <form onSubmit={this.submit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change} value={emailAddress} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password} /></div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={(e)=> {e.preventDefault(); window.location.href='/';}}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        </div>
      </div>
    );
  }
}
