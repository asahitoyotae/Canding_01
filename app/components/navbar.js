"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCircleDollarToSlot,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import "./customComponents.css";
import Settings from "./settings";
import Sidebar from "./sidebar";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <nav className="z-10 text-black">
      <div onClick={() => setActive(true)} className="mobile_device_icon ">
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{
            width: "30px",
            height: "30px",
            color: "black",
          }}
        />
      </div>
      <Settings active={active} setActive={setActive} />
      <Sidebar />

      <div className="big_screen_icons">
        <FontAwesomeIcon
          icon={faCircleDollarToSlot}
          style={{ width: "18px", height: "18px", color: "black" }}
        />
        <FontAwesomeIcon
          icon={faBook}
          style={{ width: "18px", height: "18px", color: "black" }}
        />
        <FontAwesomeIcon
          icon={faHome}
          style={{ width: "18px", height: "18px", color: "black" }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
