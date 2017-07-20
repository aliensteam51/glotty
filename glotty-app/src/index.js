import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import OrganizationsContainer from './projects/OrganizationsContainer'
import ProjectsContainer from './projects/ProjectsContainer'
import ProjectPage from './projects/ProjectPage'
import SignIn from './users/SignIn'
import AdminPage from './admins/AdminPage'
import EnsureUserLogIn from './components/EnsureUserLogIn'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SignIn} />
        <Route component={EnsureUserLogIn}>
          <Route path="/admin" component={AdminPage} />
          <Route path="/organizations" component={OrganizationsContainer} />
          <Route path="/:organizationId" component={ProjectsContainer} />
          <Route path="/:organizationId/:projectId" component={ProjectPage} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
