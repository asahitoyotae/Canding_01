"use client";

import {
  faCartShopping,
  faChevronRight,
  faDove,
  faDragon,
  faFrog,
  faMedal,
  faOtter,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import paymentStore from "../payment/storePayment";
import Terms from "./terms";
//import jwt from "jsonwebtoken";
var jwt = require("jsonwebtoken");

const Premium = () => {
  const [size, setSize] = useState();
  const [userIcon, setUserIcon] = useState({
    icon: faCartShopping,
    color: "#ffc439",
  });
  const [amount, setAmount] = useState(17);

  const {
    setShowTerms,
    showTerms,
    choosenService,
    setService,
    setToken,
    setShowPaypal,
    showPaypal,
  } = paymentStore();

  useEffect(() => {
    setSize(window.innerWidth);
    const isPaying = localStorage.getItem("__validity__");
    if (isPaying) {
      jwt.verify(
        isPaying,
        process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
        (err, dec) => {
          if (err) {
            setUserIcon({
              icon: faCartShopping,
              color: "#ffc439",
            });
          } else {
            setUserIcon({
              icon: faMedal,
              color: "#f98433",
            });
          }
        }
      );
    } else {
      setUserIcon({
        icon: faCartShopping,
        color: "#ffc439",
      });
    }
  }, [showPaypal]);
  return (
    <div
      onClick={() => {
        const isPaying = localStorage.getItem("__validity__");
        if (isPaying) {
          jwt.verify(
            isPaying,
            process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
            (err, dec) => {
              if (err) {
                setShowPaypal(true);
              } else {
                return;
              }
            }
          );
        } else {
          setShowPaypal(true);
        }
      }}
      className="shopping_cart"
      style={{
        width: size > 500 ? "60px" : size > 400 ? "50px" : "40px",
        height: size > 500 ? "50px" : size > 400 ? "40px" : "30px",
        backgroundColor: userIcon.color,
      }}
    >
      <FontAwesomeIcon
        icon={userIcon.icon}
        style={{
          color: "white",
          width: size > 500 ? "40px" : size > 400 ? "30px" : "20px",
          height: size > 500 ? "40px" : size > 400 ? "30px" : "20px",
        }}
      />

      <div
        className={` new_cart ${
          showPaypal == true ? "shopping_active" : "shopping_inactive"
        }`}
      >
        <div className="shopping_container ">
          <div
            className="grid grid-cols-9 gap-4 duration-500 w-full py-4 px-3 text-black my-3 rounded-md ${
            bg-white"
          >
            <div className="col-span-2 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faFrog}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="catalog_mid col-span-5 text-sm ">
              <p>Frog </p>
              <p>Free account is limited for up to 3 request only.</p>
            </div>
            <div className="col-span-2 text-xl font-bold text-center flex items-center justify-center"></div>
          </div>
          <div
            onClick={() => setAmount(5)}
            className={`relative grid grid-cols-9 gap-4 duration-500 w-full py-4 px-3 text-black my-3 rounded-md ${
              amount == 5 ? "bg-orange-200" : "bg-white"
            }`}
          >
            <div className="col-span-2 flex justify-center">
              <FontAwesomeIcon
                icon={faDove}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="catalog_mid col-span-5 text-sm ">
              <p>Dove</p>
              <p>
                Ideal for students in need of writing assignments, copywriting,
                article writing and more.
              </p>
            </div>
            <div className="col-span-2 text-xl font-bold text-center flex items-center justify-center">
              7 Days
            </div>
            <div className="price">5.00 usd</div>
          </div>
          <div
            onClick={() => setAmount(17)}
            className={`relative grid grid-cols-9 gap-4 duration-500 w-full py-4 px-3 text-black my-3 rounded-md ${
              amount == 17 ? "bg-orange-200" : "bg-white"
            }`}
          >
            <div className="col-span-2 flex justify-center flex-col">
              <FontAwesomeIcon
                icon={faDragon}
                style={{ width: "50px", height: "50px" }}
              />{" "}
            </div>
            <div className="catalog_mid col-span-5 text-sm ">
              <p>Dragon </p>
              <p>
                Perfect for Students and Individuals engage in article writting,
                copywritng etc. Best for developers.
              </p>
            </div>
            <div className="col-span-2 text-xl font-bold text-center flex items-center justify-center">
              30 Days
            </div>
            <div className="price">17.00 usd</div>
          </div>
          <p className="terms_memo">
            by proceeding to payment you accept our{" "}
            <span
              onClick={() => {
                console.log("terms");
                setShowTerms(true);
              }}
            >
              Terms and Conditions
            </span>
          </p>
          <div className="mt-7 w-full">
            <PayPalScriptProvider
              options={{
                clientId:
                  "AQa2AA9WcI2rHiUzdfZ1uRnqQdMf0KaKl3tQ-P3ELuvUBS-ca6gN8_Hz8iZbonq9pMOE9sMZUTzRqvSP",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", color: "white" }}
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
                    const paidAmount = event.purchase_units[0].amount.value;
                    const payload = {
                      orderId: data.orderID,
                      payerId: data.payerID,
                      amount: paidAmount,
                    };
                    const days = paidAmount == 17 ? "30 days" : "7 days";
                    const secret = process.env.NEXT_PUBLIC_AUTH_KEY_VALID;
                    const token = jwt.sign(
                      payload,
                      secret,
                      { expiresIn: days },
                      (error, token) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("token", token);
                          localStorage.setItem("__validity__", token);
                          setToken(token);
                          setShowPaypal(false);
                          setService(event.purchase_units[0].amount.value);
                          setUserIcon({
                            icon: faMedal,
                            color: "#f98433",
                          }); // Your code here after capture the order
                        }
                      }
                    );
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
          <div className="flex w-full">
            <div className="flex-1"></div>
            <button
              className="back_button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPaypal(false);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "20px", height: "20px", color: "black" }}
              />
            </button>
          </div>
        </div>
      </div>
      {showPaypal && (
        <Terms showTerms={showTerms} setShowTerms={setShowTerms} />
      )}
    </div>
  );
};

export default Premium;
