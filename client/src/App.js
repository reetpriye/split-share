import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import './App.css';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/pages/About';
import Footer from './components/layout/Footer';

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
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/about' component={About} />
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
