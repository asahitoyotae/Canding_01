"use client";

import {
  faCartShopping,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import paymentStore from "../payment/storePayment";

const Premium = () => {
  const [showPaypal, setShowPaypal] = useState(false);
  const [amount, setAmount] = useState(17);
  const { choosenService, setService } = paymentStore();
  return (
    <div onClick={() => setShowPaypal(true)} className="shopping_cart">
      <FontAwesomeIcon icon={faCartShopping} />
      <div
        className={`overflow-y-auto shopping_container ${
          showPaypal == true ? "shopping_active" : "shopping_inactive"
        }`}
      >
        <div
          onClick={() => setAmount(5)}
          className={` duration-500 w-full py-6 px-3 text-black my-3 rounded-md ${
            amount == 5 ? "bg-teal-400" : "bg-gray-200"
          }`}
        >
          1-Week
        </div>
        <div
          onClick={() => setAmount(17)}
          className={` duration-500 w-full py-6 px-3 text-black my-3 rounded-md ${
            amount == 17 ? "bg-teal-400" : "bg-gray-200"
          }`}
        >
          1-Month
        </div>
        <div className="mt-7 overflow-y-auto">
          <PayPalScriptProvider
            options={{
              clientId:
                "AQa2AA9WcI2rHiUzdfZ1uRnqQdMf0KaKl3tQ-P3ELuvUBS-ca6gN8_Hz8iZbonq9pMOE9sMZUTzRqvSP",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={false}
              forceReRender={[amount]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: `${amount}`,
                        },
                      },
                    ],
                  })
                  .then((orderId) => {
                    //Your code here after create the order
                    setService(amount);
                    return orderId;
                  });
              }}
              onApprove={function (data, actions) {
                return actions.order.capture().then(function (event) {
                  console.log(
                    event.purchase_units[0].amount.value,
                    "amount purchase"
                  );
                  setShowPaypal(false);
                  setService(event.purchase_units[0].amount.value); // Your code here after capture the order
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
        <div className="flex">
          <div className="flex-1"></div>
          <button
            className="bg-gray-800 px-4 py-2 rounded-lg pt-3"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPaypal(false);
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ width: "20px", height: "20px", color: "white" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
