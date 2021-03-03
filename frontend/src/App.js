import { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DashboardScreen from './screens/DashboardScreen'
import MyTripsScreen from './screens/MyTripsScreen'
import AboutScreen from './screens/AboutScreen'
import MemberScreen from './screens/MemberScreen'

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <div className='Content'>
          <Switch>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/trip/:id/members/' component={MemberScreen} exact />
            <Route path='/trip/:id' component={DashboardScreen} exact />
            <Route path='/trips/' component={MyTripsScreen} exact />
            <Route path='/about' component={AboutScreen} />
          </Switch>
        </div>
      </Router>
      <Footer className='Footer' />
    </Fragment>
  )
}

export default App