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
import YourHome from './components/YourHome'
import EnsureUserLogIn from './components/EnsureUserLogIn'
import EnsureUserHasAccess from './components/EnsureUserHasAccess'
import EnsureUserIsAdmin from './components/EnsureUserIsAdmin'
import EnsureUserIsSuperAdmin from './components/EnsureUserIsSuperAdmin'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={YourHome} />
        <Route path='/sign-in' component={SignIn} />
        <Route component={EnsureUserLogIn}>
          <Route component={EnsureUserIsSuperAdmin}>
            <Route path="/organizations" component={OrganizationsContainer} />
          </Route>
          <Route component={EnsureUserIsAdmin}>
            <Route path="/admin" component={AdminPage} />
          </Route>
          <Route component={EnsureUserHasAccess}>
            <Route path="/:organizationId" component={ProjectsContainer} />
            <Route path="/:organizationId/:projectId" component={ProjectPage} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
