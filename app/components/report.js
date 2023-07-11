"use client";

import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Report = ({ showReportFrom, setshowReportForm }) => {
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const email = e.target.email.value || "";
    const message = e.target.message.value;

    if (message == "") return;
    const url = "http://localhost:9000/users/report";
    const body = {
      email: email,
      message: message,
    };

    try {
      const response = await axios.post(url, body, { headers: {} });
      if (response.data.success) {
        setSuccess({ success: true, message: "Thank you for your feedback!" });
        setLoading(false);
        e.target.message.value = "";
        e.target.email.value = "";

        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        setSuccess({
          success: false,
          message: "An error occured along the way! Please try again later.",
        });
        setLoading(false);
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setSuccess({
        success: false,
        message: "An error occured along the way! Please try again later.",
      });
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  };
  return (
    <div
      className={`terms_and_conditions ${
        showReportFrom ? "terms_active" : "terms_inactive"
      } flex flex-col items-center justify-center`}
    >
      <h2 className="text-lg font-bold my-4">
        Report Issue or Give us Feedback
      </h2>
      <p className="report_encouragement mb-4">
        We value your feedback! Your input helps us improve our app and provide
        you with a better user experience. Please don't hesitate to share any
        suggestions, report any issues, or ask any questions you may have. We
        appreciate your contribution to making our app even better!
      </p>
      <form
        onSubmit={handleSubmitReport}
        className="report_form flex flex-col items-center w-full justify-left"
      >
        <div className="flex flex-col w-full relative">
          <label>Email</label>
          <input type="email" name="email" placeholder="(optional)" />
          <div>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-4">
          <label>Feedback</label>
          <textarea
            type="text"
            name="message"
            placeholder="provide feedback or report issue"
            required={true}
          ></textarea>
        </div>
        <div>
          {loading ? (
            <div>. . . . .</div>
          ) : success == null ? (
            <button type="submit">Submit</button>
          ) : success.success ? (
            <div>Success! Thank you for your Feedback</div>
          ) : (
            <div>Error! Please try again later</div>
          )}
        </div>
      </form>
      <div
        className={`w-full flex fixed bottom-16 px-6 ${
          showReportFrom ? "terms_active" : "terms_inactive"
        }`}
      >
        <div className="flex-1"></div>
        <button
          className="terms_button"
          onClick={(e) => {
            e.stopPropagation();
            setshowReportForm(false);
          }}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ width: "20px", height: "20px", color: "black" }}
          />{" "}
        </button>
      </div>
    </div>
  );
};

export default Report;
