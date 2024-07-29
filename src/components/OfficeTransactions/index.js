import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const myTransactions = [
  {
    id: 1,
    date: '27/07/2024',
    description: 'for company expences',
    credit: 5000,
    debit: 0,
    runningBal: '',
  },
  {
    id: 2,
    date: '27/07/2024',
    description: 'for company expences',
    credit: 4000,
    debit: 0,
    runningBal: 9000,
  },
]

class TransactionsList extends Component {
  state = {
    transactionsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions = async () => {
    const url =
      'https://gopichand-transactions-app-backend-2.onrender.com/transactions/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const formattedData = data.map(each => ({
      date: each.date,
      description: each.description,
      amount: each.amount,
      runningBal: each.running_balance,
      type: each.type,
    }))

    this.setState({transactionsList: formattedData, isLoading: false})
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {transactionsList, isLoading} = this.state

    return (
      <div className="app-bg-container">
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <>
            <h1>Transactions</h1>
            <table>
              <thead>
                <tr>
                  <th>Office Transactions</th>
                  <th>.</th>
                  <th>.</th>
                  <th>.</th>
                  <th>
                    <Link to="/">
                      <button type="button" aria-label="Add Transaction">
                        Add Transaction
                      </button>
                    </Link>
                  </th>
                </tr>

                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Credit</th>
                  <th>Debit</th>
                  <th>Running balance</th>
                </tr>
              </thead>
              <tbody>
                {transactionsList.map(each => (
                  <tr>
                    <td>{each.date}</td>
                    <td>{each.description}</td>
                    <td>{each.type === 'credit' ? each.amount : ''}</td>
                    <td>{each.type === 'debit' ? each.amount : ''}</td>
                    <th>{each.runningBal}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    )
  }
}

export default TransactionsList
