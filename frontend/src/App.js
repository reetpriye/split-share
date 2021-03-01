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
            <Route exact path='/' component={HomeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/dashboard' component={DashboardScreen} />
            <Route path='/members' component={MemberScreen} />
            <Route path='/trips/' component={MyTripsScreen} />
            <Route path='/about' component={AboutScreen} />
          </Switch>
        </div>
      </Router>
      <Footer className='Footer' />
    </Fragment>
  )
}

export default App
