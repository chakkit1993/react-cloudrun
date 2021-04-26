import React from 'react';
import logo from './logo.svg';
import './App.css';


import {
  BrowserRouter ,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";
import About from "./containers/Auth/About/About";
import PageNotFound from './containers/PageNotFound/PageNotFound';
import Dashboard from './containers/Dashboard/Dashboard';
import UserLayout from './hoc/Layout/UserLayout';
import Courses from "./containers/Courses/Courses";
import MyCourses from "./containers/Courses/MyCourses";
import CourseDetail from "./components/CourseList/CourseDetail/CourseDetail";
import UsersManager from "./containers/UsersManager/UsersManager";
import CoursesManager from "./containers/CoursesManager/CoursesManager";


const RouteUser = ({ Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (
        <UserLayout>
          <Component />
        </UserLayout>
      )}
    />
  );
};

const RouteAdmin = ({ Component, isAdmin, ...props }) => {
  return (
    <Route
      {...props}
      render={() =>
        isAdmin ? (
          <UserLayout>
            <Component />
          </UserLayout>
        ) : (
          <PageNotFound />
        )
      }
    />
  );
};



function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          {/* With Layout */}
          <RouteUser path="/" exact Component={Dashboard} />
          <RouteUser path="/about" exact Component={About} />
          <RouteUser path="/courses" exact Component={Courses} />
          <RouteUser path="/my-courses" exact Component={MyCourses} />
          <RouteUser path="/courses/:id" Component={CourseDetail} />
          <RouteUser path="/logout" Component={Logout} />
          <RouteUser
          path="/users-management"
          Component={UsersManager}
          // isAdmin={isAdmin}
        />
        <RouteUser
          path="/courses-management"
          Component={CoursesManager}
          // isAdmin={isAdmin}
        />


          {/* Without Layout */}
          <Route path="/sign-in" component={Auth} />
          <Route path="/sign-up" component={Auth} />
          {/* Page Not Found */}
          <Route component={PageNotFound} />

        </Switch>
  </BrowserRouter>
  );
}

export default App;
