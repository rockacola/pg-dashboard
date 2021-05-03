import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
