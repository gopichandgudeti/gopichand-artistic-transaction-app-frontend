import {Route, Switch} from 'react-router-dom'

import AddTransaction from './components/AddTransaction'
import OfficeTransactions from './components/OfficeTransactions'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={AddTransaction} />
      <Route exact path="/office-transactions" component={OfficeTransactions} />
    </Switch>
  </>
)

export default App
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
