import React, { useState } from 'react';
import "./IncomeForm.css";


const ExpenseForm = ({ addExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('grocery');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && amount && date) {
      addExpense(name, Number(amount), category, date);
      setName('');
      setAmount('');
      setCategory('grocery');
      setDate('');
    }
  };

  return (
    <form className='expense-form' onSubmit={handleSubmit}>
      <div className="form-container flex center wrap">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Expense Name"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="grocery">Grocery</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="gas">Gas</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="submit"
          value="Add Expense"
          className="red-button"
        />
      </div>
    </form>
  );
};

export default ExpenseForm;
