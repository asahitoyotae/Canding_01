import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = ({ show, setShow }) => {
  useEffect(() => {}, []);

  return (
    <>
      {show && (
        <div className="w-full  h-screen flex items-center justify-center bg-gray-50 fixed left-0 top-0 z-20">
          <div id="paypal_checkout">
            <PayPalScriptProvider
              options={{
                clientId:
                  "AQa2AA9WcI2rHiUzdfZ1uRnqQdMf0KaKl3tQ-P3ELuvUBS-ca6gN8_Hz8iZbonq9pMOE9sMZUTzRqvSP&currency=USD",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "20",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    alert(`Transaction completed by ${name}`);
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
