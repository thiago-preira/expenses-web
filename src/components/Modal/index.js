import React from "react";
import "./styles.css";
function Modal({ children, handleClose, header, footer }) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <h5>{header}</h5>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <h5>{footer}</h5>
        </div>
      </div>
    </div>
  );
}

export default Modal;
