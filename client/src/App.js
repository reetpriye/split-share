import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Trips from './components/pages/Trips';
import About from './components/pages/About';
import Members from './components/pages/Members';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Fragment>
          <div className='Content'>
            <Router>
              <Fragment>
                <Navbar />
                <Alerts />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/members' component={Members} />
                  <Route exact path='/trips' component={Trips} />
                </Switch>
              </Fragment>
            </Router>
          </div>
          <Footer className='Footer' />
        </Fragment>
      </AlertState>
    </AuthState>
  );
};

export default App;
