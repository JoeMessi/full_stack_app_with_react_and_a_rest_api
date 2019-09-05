import React, { Component } from 'react';

export default class CreateCourse extends Component {
  // inital state of the CreateCourse Component
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
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

  // FUNC that handles a POST request to the REST API to create a new course
  handleSubmit = async (e) => {
    e.preventDefault();
    // context from props
    const { context } = this.props;
    // authenticated user from context
    const authUser = context.authenticatedUser;
    // authenticated user credentials
    const authUserId = authUser.id;
    const username = authUser.emailAddress;
    const password = authUser.password;
    // data from state, to be sent
    const data = this.state;
    // append authenticated user id to data
    data.userId = authUserId;

    // POST request
    const res = await context.data.api("/courses", "POST", data, true, {username, password});
      if (res.status === 201) { // created
        // go back to "/"
        window.location.href = "/";
      }else if (res.status === 400) { // bad request
        return res.json().then(data => {
          this.setState({errors: data.errors});
        });
      }else if (res.status === 500) {
        window.location.href = '/error';
      }else {
        throw new Error();
      }
  } // end handleSubmit func


  render() {
    // form values from state
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    // context from props
    const { context } = this.props;
    // authenticated user from context
    const authUser = context.authenticatedUser;

    return(
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
        {/* ternary operator -> validation errors ? show them : show nothing */}
        {
          this.state.errors.length ?
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          </div> : null
        }
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" onChange={this.change} value={title} className="input-title course--title--input" placeholder="Course title..." />
                </div>
                <p>By {authUser.firstName} {authUser.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" onChange={this.change} value={description} className="" placeholder="Course description..."></textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" onChange={this.change} value={estimatedTime} className="course--time--input"
                        placeholder="Hours" /><
                    /div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" onChange={this.change} value={materialsNeeded} className="" placeholder="List materials..."></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={(e) => {e.preventDefault(); window.location.href='/';}}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
