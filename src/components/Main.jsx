import React from "react";
import ExpenseCard from "./ExpenseCard";
import "../styles/base/base.css";
import "./Main.css";

export const Main = () =>{
    return(
        <>
            <h1 style={{textAlign:"center", color:"#FFF"}}>Expense Tracker</h1>
            <div className="cards-container flex wrap center">
                <ExpenseCard title="Income" amount="120" className="green" />
                <ExpenseCard title="Expenses" amount="22" className="red" />
                <ExpenseCard title="Balance" amount="223" className="green" />
                <ExpenseCard title="Transactions" amount="132" className="green" />
            </div>
        </>
    )
}