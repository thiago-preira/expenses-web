/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import DateFilter from "../components/DateFilter";
import { months } from "../components/DateFilter/DateFilterData";
import Modal from "../components/Modal";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";

import api from "../api";
import Categorizer from "../components/Categorizer";

function Home() {
  const today = new Date();
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setcurrentYear] = useState(today.getFullYear());
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(undefined);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = async () => {
    const daysInMonth = months[currentMonth].days;
    const monthNumber = months[currentMonth].number;
    const response = await api.get(
      `/transactions?startDate=${currentYear}-${monthNumber}-01&endDate=${currentYear}-${monthNumber}-${daysInMonth}`
    );
    setTransactions(response.data.transactions);
    setExpenses(response.data.expenses);
    setIncome(response.data.income);
    setTotal(response.data.total);
  };
  const fetchCategories = async () => {
    const response = await api.get("/categories");
    setCategories(response.data);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [currentMonth, currentYear]);

  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setcurrentYear(event.target.value);
  };

  const openModal = (transaction) => {
    setCurrentTransaction(transaction);
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const handleCategorize = async (category) => {
    const response = await api.put(
      `/transactions/${currentTransaction.id}/category/${category.id}`
    );
    const index = transactions.findIndex(
      (trx) => trx.id === currentTransaction.id
    );
    transactions[index] = response.data;
    setTransactions([...transactions]);
    onModalClose();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns">
          <DateFilter
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="one-third column"></div>
      </div>
      <div className="row">
        <div className="one-third column">
          <Card text="Income" value={income}>
            <GiIcons.GiReceiveMoney size={40} />
          </Card>
        </div>
        <div className="one-third column">
          <Card debit text="Expenses" value={expenses}>
            <GiIcons.GiPayMoney size={40} />
          </Card>
        </div>
        <div className="one-third column">
          <Card text="Total" value={total}>
            <GiIcons.GiMoneyStack size={40} />
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={
                    transaction.transactionType === "CREDIT"
                      ? "credit-table"
                      : "debit-table"
                  }
                >
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>
                    {transaction.amount.toLocaleString("en", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.category?.name}</td>
                  <td>
                    <FaIcons.FaTags
                      size={25}
                      onClick={() => openModal(transaction)}
                    />
                  </td>
                </tr>
              ))}
              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal
          header={`${currentTransaction.transactionType} - ${currentTransaction.description}`}
          handleClose={onModalClose}
          footer={`${currentTransaction.amount.toLocaleString("en", {
            style: "currency",
            currency: "EUR",
          })}`}
        >
          <Categorizer
            categories={categories}
            transaction={currentTransaction}
            onSelect={handleCategorize}
          />
        </Modal>
      )}
    </div>
  );
}

export default Home;
