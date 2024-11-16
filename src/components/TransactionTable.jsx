import React from 'react';
import "./TransactionTable.css"
import axios from 'axios';
import { useState, useEffect } from 'react';

const TransactionTable = ({ transactions, userId }) => {


    const [expenses, setExpenses] = useState([]);
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const response = await axios.post('http://localhost/full-stack-expense-tracker-react-js/server/api/getExpenses.php', {
            user_id: userId
          });
  
          const data = response.data;
          if (data.status === 'Expenses Retrieved Successfully') {
            setExpenses(data.expenses);
          } else {
            setMessage(data.status);
          }
        } catch (error) {
          setMessage('Error: Could not connect to the server');
        }
      };
  
      fetchExpenses();
    }, [userId]);


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
        {   userId
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
