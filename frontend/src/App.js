import { Fragment, useState, useLayoutEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DashboardScreen from './screens/DashboardScreen'
import ExpenseScreen from './screens/ExpenseScreen'
import TrashScreen from './screens/TrashScreen'
import AboutScreen from './screens/AboutScreen'
import MemberScreen from './screens/MemberScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import NotSupportedScreen from './screens/NotSupportedScreen'

const App = () => {
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0])
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight])
      }
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
  }

  //eslint-disable-next-line
  const [width] = useWindowSize()

  if (width > 480) {
    return <NotSupportedScreen />
  } else if (width < 280) {
    return <NotSupportedScreen device={'small'} />
  }
  return (
    <Fragment>
      <Route render={props => <Navbar {...props} />} />
      <div className='Content'>
        <Switch>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/expenses/' component={ExpenseScreen} exact />
          <Route path='/expense/:id' component={DashboardScreen} exact />
          <Route path='/expenses/:id/members/' component={MemberScreen} exact />
          <Route
            path='/transactions/:id'
            component={TransactionsScreen}
            exact
          />
          <Route path='/transactions/:id/trash' component={TrashScreen} />
          <Route path='/analytics/:id' component={AnalyticsScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer className='Footer' />
    </Fragment>
  )
}

export default App
