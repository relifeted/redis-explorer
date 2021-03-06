import React from 'react'
import autobind from 'autobind-decorator'
import connectToStores from 'alt/utils/connectToStores'
import hostsStore from '../../stores/hostsStore'
import hostsActions from '../../actions/hostsActions'
import {RouteHandler} from 'react-router'
import mui from 'material-ui'
import Header from '../../components/Header'

// Create an mui theme manager.
const themeManager = new mui.Styles.ThemeManager()

/**
 * Wrap the Main component so we can handle transitions.
 */
class MainHandler extends React.Component {

  static willTransitionTo () {
    hostsActions.connectToHost(hostsStore.getState().activeHost)
  }

  render () {
    return <Main />
  }
}

/**
 * Main component.
 */
@connectToStores
@autobind
class Main extends React.Component {

  static propTypes = {
    activeHost: React.PropTypes.object
  }

  static getStores () {
    return [hostsStore]
  }

  static getPropsFromStores () {
    return hostsStore.getState()
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext () {
    return {
      muiTheme: themeManager.getCurrentTheme()
    }
  }

  render () {
    return (
      <div className='main'>
        <Header {...this.props}/>
        <RouteHandler/>
      </div>
    )
  }
}

export default MainHandler
export {themeManager}
