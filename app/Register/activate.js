"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Checkout from "./checkoutButtons";
import "./purchase.css";

const Activate = () => {
  const [show, setShow] = useState();

  return (
    <div onClick={() => setShow((prev) => !prev)} className="purchase_icon">
      <FontAwesomeIcon icon={faCartShopping} />
      <Checkout show={show} setShow={setShow} />
    </div>
  );
};

export default Activate;
