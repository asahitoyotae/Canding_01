import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const About = ({ showAbout, setShowAbout }) => {
  return (
    <div
      className={`terms_and_conditions ${
        showAbout ? "terms_active" : "terms_inactive"
      }`}
    >
      <h1 className="font-bold text-lg my-4">About Chat-AI</h1>

      <h2 className="font-bold text-md my-2 mx-2">Legal Disclaimer</h2>
      <p className="pl-4">
        The information provided in this About page is for general informational
        purposes only and does not constitute legal advice. If you require legal
        advice, please consult with a qualified attorney.
      </p>

      <h2 className="font-bold text-md my-2 mx-2">User Agreement</h2>
      <p className="pl-4">
        By accessing and using our chat app, you agree to be bound by the terms
        and conditions set forth in our User Agreement. This agreement governs
        your rights and responsibilities as a user, as well as the limitations
        of liability and dispute resolution mechanisms. It is essential that you
        read and understand the User Agreement before using our chat app.
      </p>

      <h2 className="font-bold text-md my-2 mx-2">Privacy Policy</h2>
      <p className="pl-4">
        We take your privacy seriously. Our Privacy Policy outlines how we
        collect, use, store, and disclose your personal information when you
        interact with our chat app. We are committed to protecting your data and
        adhering to relevant data protection laws, such as the General Data
        Protection Regulation (GDPR) and the California Consumer Privacy Act
        (CCPA).
      </p>

      <h2 className="font-bold text-md my-2 mx-2">Intellectual Property</h2>
      <p className="pl-4">
        All intellectual property rights associated with our chat app, including
        but not limited to trademarks, copyrights, and patents, are protected by
        applicable laws. You acknowledge and agree that all content provided
        through our chat app is the property of the respective content creators
        or licensors. You may not use, modify, reproduce, or distribute any
        content from our chat app without obtaining proper authorization.
      </p>

      <h2 className="font-bold text-md my-2 mx-2">Third-Party Links</h2>
      <p className="pl-4">
        Our chat app may contain links to third-party websites or services that
        are not owned or controlled by us. We are not responsible for the
        content, privacy practices, or terms and conditions of these third-party
        sites. We encourage you to review the policies of any third-party sites
        you visit through our chat app.
      </p>

      <h2 className="font-bold text-md my-2 mx-2">Limitation of Liability</h2>
      <p className="pl-4">
        To the extent permitted by law, we shall not be liable for any direct,
        indirect, incidental, consequential, or punitive damages arising from
        your use or inability to use our chat app. This includes damages
        resulting from errors, omissions, interruptions, defects, delays,
        computer viruses, loss of profits, or unauthorized access to or
        alteration of your transmissions or data.
      </p>

      <h2 className="font-bold text-md my-2 mx-2">
        Changes to Terms and Policies
      </h2>
      <p className="pl-4">
        We reserve the right to modify or update our terms, policies, and
        features of our chat app at any time. It is your responsibility to
        review these changes periodically. Your continued use of our chat app
        after any modifications constitutes your acceptance of the revised terms
        and policies.
      </p>

      <h2 className="font-bold text-md my-2 mx-2">Contact Us</h2>
      <p className="pl-4">
        If you have any questions or concerns regarding our chat app, legal
        matters, or our policies, please leave us a message in the report issue
        section. We will make every effort to respond to your inquiries in a
        timely manner.
      </p>

      <p className="pl-4">
        Thank you for choosing our chat app. We strive to provide you with an
        exceptional chat experience while maintaining the highest standards of
        legal compliance.
      </p>
      <div
        className={`w-full flex fixed bottom-16 px-6 ${
          showAbout ? "terms_active" : "terms_inactive"
        }`}
      >
        <div className="flex-1"></div>
        <button
          className="terms_button"
          onClick={(e) => {
            e.stopPropagation();
            setShowAbout(false);
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

export default About;
