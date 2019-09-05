import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
// import withContext func that wraps a component in context
import withContext from './components/Context';
// HOC functional component that wraps an instance of the <Route/> component
// used for making some routes that require authentication private
import PrivateRoute from './PrivateRoute';

// components with Context
const HeaderContx = withContext(Header);
const CoursesContx = withContext(Courses);
const CourseDetailContx = withContext(CourseDetail);
const UserSignUpContx = withContext(UserSignUp);
const UserSignInContx = withContext(UserSignIn);
const UserSignOutContx = withContext(UserSignOut);
const CreateCourseContx = withContext(CreateCourse);
const UpdateCourseContx = withContext(UpdateCourse);


export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
             {/*Header always showing, location extracted and passed down as props*/}
             <Route render={({location})=> <HeaderContx location={location.pathname} />} />
          <Switch>
              <Route exact path='/' component={ CoursesContx } />

              {/*<Route  path='/courses/create' component={ CreateCourse } />*/}
              <PrivateRoute path='/courses/create' component={ CreateCourseContx }  />

              {/*<Route path='/courses/:id/update' component={ UpdateCourse } />*/}
              <PrivateRoute path='/courses/:id/update' component={ UpdateCourseContx }/>

              <Route path='/courses/:id' component={ CourseDetailContx } />
              <Route path='/signin' component={ UserSignInContx } />
              <Route path='/signup' component={ UserSignUpContx } />
              <Route path='/signout' component={ UserSignOutContx } />

              <Route path='/forbidden' component={ Forbidden } />
              <Route path='/error' component={ UnhandledError } />
              <Route component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );

  } // end render
} // end App
