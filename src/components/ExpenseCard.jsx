import React from 'react';

const ExpenseCard = ({ title, amount, className }) => {
  return (
    <div className="card flex column">
      <h1 className={className}>{amount}</h1>
      <p>{title}</p>
    </div>
  );
};

export default ExpenseCard;
