"use client";

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faBook,
  faBrain,
  faChevronRight,
  faDiceD20,
  faGlobe,
  faMedal,
  faQuestion,
  faShare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./choices.css";
import chatStore from "../store/conversation/store";
import Terms from "./terms";
import paymentStore from "../payment/storePayment";
import About from "./about";
import Report from "./report";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import jwt from "jsonwebtoken";
import axios from "axios";

const Settings = ({ active, setActive }) => {
  const {
    setGptVersion,
    gptVersion,
    setLanguage,
    language,
    setAlert,
  } = chatStore();
  const { showTerms, setShowTerms } = paymentStore();
  const [showReportFrom, setshowReportForm] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [choice, setChoice] = useState("");
  const { setShowPaypal, valid_text } = paymentStore();

  const [numberOfTap, setNumberOfTap] = useState(0);

  const sharetheApp = () => {
    if (numberOfTap == 13) {
      const payload = {
        orderId: "data.orderID",
        payerId: "data.payerID",
        amount: "free",
      };
      const grantkeys = valid_text;
      jwt.sign(
        payload,
        grantkeys,
        { expiresIn: "7 days" },
        async (error, token) => {
          if (error) {
            console.log(error);
          } else {
            const url = "https://canding-back-01.onrender.com/users/report";
            const body = {
              email: "alert!",
              message: "Some one learned to get free access!",
            };
            try {
              const sendFree = await axios.post(url, body);
              localStorage.setItem("__validity__", token);
              console.log("success");

              setAlert(true);

              setTimeout(() => {
                setAlert(false);
              }, 3000);
            } catch (error) {
              console.log("error in getting free access.");
            }
          }
        }
      );
      setNumberOfTap(0);
    } else {
      setNumberOfTap((e) => e + 1);
    }
  };
  return (
    <div
      className={`overflow-y-auto drop_down z-10 ${
        active ? "active" : "inactive"
      }`}
    >
      <div className="flex items-center justify-center mb-6">
        <FontAwesomeIcon
          icon={faDiceD20}
          style={{ width: "50px", height: "50px", color: "white" }}
        />
        {/* <Image
          src="/ChatGPT_white_350x350.png"
          width={50}
          height={50}
          alt="logo"
        /> */}
        <span className="text-white text-lg ml-3 font-bold">Canding</span>
      </div>
      <p className="text-gray-200 ml-2 mb-1 w-full text-left">Settings</p>
      <ul className="flex justify-center flex-col items-center w-full rounded-xl mb-3">
        <li
          onClick={() => setChoice("gptVersion")}
          className="flex justify-between w-full p-2 relative"
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faBrain}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>GPT Version</span>
          </div>{" "}
          <div>
            {gptVersion}
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
          <div
            className={`choice ${
              choice === "gptVersion" ? "choices_active" : "choices_inactive"
            }`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setGptVersion("gpt-3.5-turbo");
                setTimeout(() => {
                  setChoice("");
                }, 0);
              }}
            >
              GPT-3.5-Turbo
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setGptVersion("gpt-3.5-turbo");
                setTimeout(() => {
                  setChoice("");
                }, 0);
              }}
            >
              GPT-4 (comming soon)
            </div>
          </div>
        </li>
        <li
          onClick={() => setChoice("language")}
          className="flex justify-between w-full p-2 relative"
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faGlobe}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Language</span>
          </div>{" "}
          <div>
            {language}
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
          <div
            className={`choice ${
              choice === "language" ? "choices_active" : "choices_inactive"
            }`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setLanguage("English");
                setTimeout(() => {
                  setChoice("");
                }, 0);
              }}
            >
              English
            </div>
          </div>
        </li>
        <li
          onClick={() => setShowPaypal(true)}
          className="flex justify-between w-full p-2 "
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faMedal}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Get Premium</span>
          </div>{" "}
          <div>
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
        <li
          onClick={() => setshowReportForm(true)}
          className="flex justify-between w-full p-2"
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ width: "15px", height: "15px" }}
            />
            <span>Report Issue</span>
          </div>
          <div>
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
      </ul>
      <p className="w-full text-left ml-2 mb-1 text-gray-200">About</p>
      <ul className="flex justify-center flex-col items-center w-full bg-gray-500 rounded-xl mb-3">
        <li className="flex justify-between w-full p-2 border-b">
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faStar}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Rate App</span>
          </div>{" "}
          <div>
            please rate us 5 star
            {/* <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span> */}
          </div>
        </li>
        <li
          onClick={sharetheApp}
          className="flex justify-between w-full p-2 border-b"
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faShare}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Share</span>
          </div>{" "}
          <div>
            please tell your friends
            {/* <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span> */}
          </div>
        </li>
        <li
          onClick={() => {
            setShowAbout(true);
          }}
          className="flex justify-between w-full p-2 border-b"
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faQuestion}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>About</span>
          </div>{" "}
          <div>
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
        <li
          onClick={() => setShowTerms(true)}
          className="flex justify-between w-full p-2"
        >
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faBook}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Terms and conditions</span>
          </div>{" "}
          <div>
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
      </ul>
      <div className="w-full flex">
        <div className="flex-1"></div>
        <button className="terms_button">
          <FontAwesomeIcon
            onClick={() => setActive(false)}
            icon={faChevronRight}
            style={{
              width: "20px",
              height: "20px",
              color: "black",
            }}
          />
        </button>
      </div>

      {active && <Terms showTerms={showTerms} setShowTerms={setShowTerms} />}
      {active && <About showAbout={showAbout} setShowAbout={setShowAbout} />}
      {active && (
        <Report
          showReportFrom={showReportFrom}
          setshowReportForm={setshowReportForm}
        />
      )}
    </div>
  );
};

export default Settings;
