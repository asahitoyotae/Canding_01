import React from "react";
import "./choices.css";
import chatStore from "../store/conversation/store";

const Alert = () => {
  const { alert } = chatStore();
  return (
    <div
      className={`alert_container ${alert ? "alert_active" : "alert_inactive"}`}
    >
      Error! content not copied
    </div>
  );
};

export default Alert;
