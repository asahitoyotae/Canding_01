import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Terms = ({ showTerms, setShowTerms }) => {
  return (
    <div
      className={`terms_and_conditions ${
        showTerms ? "terms_active" : "terms_inactive"
      }`}
    >
      <h1 className="text-lg font-bold mb-5">Terms and Conditions</h1>
      <p>
        By using our chat app and proceeding with the payment, you acknowledge
        and agree to the following:
      </p>
      <ul className="my-3 pl-7">
        <li>
          The creators of the app, the company, and its affiliates shall not be
          held liable for any damages, losses, or injuries resulting from the
          use of the app or its services. This includes, but is not limited to,
          any direct, indirect, incidental, consequential, or special damages
          arising out of or in connection with the use or inability to use the
          app.
        </li>
        <li>
          The app is provided on an "as is" and "as available" basis, without
          any warranties or representations of any kind, either expressed or
          implied. This includes, but is not limited to, warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </li>
        <li>
          The creators of the app and the company do not guarantee the accuracy,
          completeness, reliability, or timeliness of any information or content
          provided through the app. You acknowledge that any reliance on such
          information or content is at your own risk.
        </li>
      </ul>

      <h1>Payment and Refund Policy</h1>
      <ul className="my-3 pl-7">
        <li>
          Upon proceeding with the payment to unlock the full functionality of
          the app, you understand and agree that no refunds will be issued by
          the app creators or the company. However, you are entitled to report
          any issues or problems encountered while using the app for further
          investigation.
        </li>
        <li>
          In the event that the app experiences technical issues or becomes
          temporarily unavailable after you have made a payment, the creators of
          the app and the company shall not be held responsible for refunding
          the amount. However, they will make reasonable efforts to address the
          issue and restore the app's functionality in a timely manner.
        </li>
      </ul>

      <h1>Intellectual Property</h1>
      <ul className="my-3 pl-7">
        <li>
          All intellectual property rights related to the app, including but not
          limited to trademarks, logos, and copyrights, are the property of the
          creators or their respective owners. You agree not to use, copy,
          modify, or distribute any content from the app without prior written
          consent.
        </li>
      </ul>
      <div
        className={`w-full flex fixed bottom-16 px-6 ${
          showTerms ? "terms_active" : "terms_inactive"
        }`}
      >
        <div className="flex-1"></div>
        <button
          className="terms_button"
          onClick={(e) => {
            e.stopPropagation();
            setShowTerms(false);
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

export default Terms;
