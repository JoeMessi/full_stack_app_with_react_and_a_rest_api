import React, { Component } from 'react';
import Data from '../../Data';
import Cookies from 'js-cookie';

// creating a Context and assign it to a variable
// this will set the 'Provider' and 'Consumer' objs
const AppContext = React.createContext();
// now we have both the Provider and the Consumer objs available
// which we can export and use them in other modules.

// export Provider as a Higher-Order Component
export class Provider extends Component {

 state = {
   authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
 }

 constructor() {
   super();
   // new instance of Data class inside our Provider class
   this.data = new Data();
 }


  // sign-in func
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if(user !== null) {
      user[0].username = username;
      user[0].password = password;

      this.setState(() => {
        return {
          authenticatedUser: user[0]
        }
      })
    Cookies.set('authenticatedUser', JSON.stringify(user[0]), { expires: 1 });

    }
    return user;
  }

  // sign-out func
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }


  render() {

  const { authenticatedUser } = this.state;
  // value obj is passed as props to the Provider making available
  // the utility methods of the Data class to all components with context
  const value = {
    authenticatedUser,
    data: this.data,
    actions: {
      signIn: this.signIn,
      signOut: this.signOut
    }
  }

  return(
    <AppContext.Provider value={value} >
      {this.props.children}
    </AppContext.Provider>
  );
} // end render
} // end class Provider


// export Consumer as a variable
export const Consumer = AppContext.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  }
}
