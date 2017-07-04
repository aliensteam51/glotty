import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import ProjectsContainer from './projects/ProjectsContainer'
import ProjectPage from './projects/ProjectPage'
import SignIn from './users/SignIn'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ProjectsContainer} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/projects/:projectId" component={ProjectPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
