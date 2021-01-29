import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/pages/About';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <Fragment>
      <div className='Content'>
        <Router>
          <Fragment>
            <Navbar />
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
  );
};

export default App;
