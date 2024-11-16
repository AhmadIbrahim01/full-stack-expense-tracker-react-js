import React, { useState } from 'react';
import "../styles/base/base.css";
import "./IncomeForm.css"


const IncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState('');
  const [transaction, setTransaction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      addIncome(Number(amount));
      setAmount('');
    }
  };

  return (
    <form className='income-form' onSubmit={handleSubmit}>
      <div className="form-container flex center wrap">
        <input
          type="text"
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
          placeholder="Transaction"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="submit"
          value="Add Amount"
          className="green-button"
        />
      </div>
    </form>
  );
};

export default IncomeForm;
