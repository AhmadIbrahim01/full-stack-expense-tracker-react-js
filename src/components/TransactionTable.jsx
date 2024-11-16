import React from 'react';
import "./TransactionTable.css"

const TransactionTable = ({ transactions }) => {
  return (
    <table id="table">
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {   false
            &&
            transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name || 'N/A'}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category || 'N/A'}</td>
                  <td>{transaction.date}</td>
                  <td><button>Delete</button></td>
                </tr>
              ))
        }
      </tbody>
    </table>
  );
};

export default TransactionTable;
