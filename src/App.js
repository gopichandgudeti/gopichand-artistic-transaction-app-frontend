import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import AddTransaction from './components/AddTransaction'
import OfficeTransactions from './components/OfficeTransactions'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={OfficeTransactions} />
    <Route exact path="/add-transaction" component={AddTransaction} />
  </Switch>
)

export default App
