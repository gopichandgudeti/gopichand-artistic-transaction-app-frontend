import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'

import {FiSave} from 'react-icons/fi'
import {IoIosClose} from 'react-icons/io'
import {IoReloadCircle} from 'react-icons/io5'

import './index.css'

class AddTransaction extends Component {
  state = {
    amount: '',
    description: '',
    transactionType: 'credit',
    showAmountError: false,
    showDescriptionError: false,
    transactionsList: [],
  }

  onClickClearDescription = () => {
    this.setState({description: ''})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  onSubmitTransactionDetails = async event => {
    event.preventDefault()
    const {transactionType, amount, description} = this.state

    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const year = date.getFullYear()
    const formattedDate = `${day}/${month}/${year}`

    if (amount === '' && description === '') {
      this.setState({showAmountError: true, showDescriptionError: true})
    } else if (amount === '') {
      this.setState({showAmountError: true})
    } else if (description === '') {
      this.setState({showDescriptionError: true})
    } else {
      const newTransactionDetails = {
        id: uuidv4(), // Generate a unique ID for each transaction
        type: transactionType,
        amount: parseFloat(amount), // Ensure amount is a number
        description,
        date: formattedDate,
      }
      const url =
        'https://gopichand-transactions-app-backend-2.onrender.com/transactions/'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransactionDetails),
      }

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          this.setState(prevState => ({
            transactionsList: [
              ...prevState.transactionsList,
              newTransactionDetails,
            ],
            amount: '',
            description: '',
            showAmountError: false,
            showDescriptionError: false,
          }))
        } else {
          const errorData = await response.json()
          console.error('Failed to add transaction', errorData)
        }
      } catch (error) {
        console.error('Network error:', error)
      }
    }
  }

  render() {
    const {
      transactionType,
      amount,
      description,
      showAmountError,
      showDescriptionError,
    } = this.state

    return (
      <div className="app-bg-container">
        <div className="form-bg-container">
          <form
            className="form-container"
            onSubmit={this.onSubmitTransactionDetails}
          >
            <h1 className="heading">New Transaction</h1>
            <div className="input-label-container">
              <p className="label">Transaction Type</p>
              <div className="input-error-msg-container">
                <div className="input-bg-container">
                  <select
                    className="select-container"
                    onChange={this.onChangeTransactionType}
                    value={transactionType}
                  >
                    <option key="credit" value="credit">
                      Credit
                    </option>
                    <option key="debit" value="debit">
                      Debit
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-label-container">
              <p className="label">Amount</p>
              <div className="input-error-msg-container">
                <div className="input-bg-container">
                  <input
                    type="number"
                    className="input-container"
                    value={amount}
                    key="AMOUNT"
                    onChange={this.onChangeAmount}
                  />
                </div>
                {showAmountError && <p className="error-msg">*Required</p>}
              </div>
            </div>

            <div className="input-label-container">
              <p className="label">Description</p>
              <div className="input-error-msg-container">
                <div className="input-bg-container">
                  <div className="description-input-container">
                    <textarea
                      rows="5"
                      cols="15"
                      key="DESCRIPTION"
                      className="input-container "
                      value={description}
                      onChange={this.onChangeDescription}
                    />
                    <button
                      type="button"
                      className="reload-btn"
                      onClick={this.onClickClearDescription}
                    >
                      <IoReloadCircle
                        aria-label="reload"
                        className="reload-icon"
                      />
                    </button>
                  </div>
                </div>
                {showDescriptionError && <p className="error-msg">*Required</p>}
              </div>
            </div>

            <div className="btns-container">
              <button type="submit" className="save-btn">
                <Link to="/office-transactions" className="link">
                  <FiSave aria-label="save" /> SAVE
                </Link>
              </button>

              <button type="button" className="cancel-btn">
                <IoIosClose aria-label="close" className="cancel-icon" /> CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddTransaction
