import React from "react";
import ExpenseCard from "./ExpenseCard";
import "../styles/base/base.css";
import "./Main.css";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import FilterComponent from "./FilterComponent";
import TransactionTable from "./TransactionTable";


export const Main = ({username, userId}) =>{
    return(
        <>
            <h1 style={{textAlign:"center", color:"#FFF"}}>Welcome {username} to your account</h1>
            <h1 style={{textAlign:"center", color:"#FFF"}}>Expense Tracker</h1>
            <div className="cards-container flex wrap center">
                <ExpenseCard title="Income" amount="Null" className="green" />
                <ExpenseCard title="Expenses" amount="Null" className="red" />
                <ExpenseCard title="Balance" amount="Null" className="green" />
                <ExpenseCard title="Transactions" amount="Null" className="green" />
            </div>
            <IncomeForm/>
            <ExpenseForm/>
            <FilterComponent/>
            <TransactionTable  userId={userId}/>
            
        </>
    )
}