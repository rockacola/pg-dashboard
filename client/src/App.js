import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
// import Home from './views/Home'
import Login from './views/Login'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
