import React from "react";
import "./styles.css";
function Card({ children, text, value, debit }) {
  const isPositive = value >= 0;
  return (
    <div className="card">
      {children}
      <div className="card_content">
        <h4>{text}</h4>
        <h5 className={`${!debit && isPositive ? "credit" : "debit"}`}>
          {value.toLocaleString("en", {
            style: "currency",
            currency: "EUR",
          })}
        </h5>
      </div>
    </div>
  );
}

export default Card;
