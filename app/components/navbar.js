"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCircleDollarToSlot,
  faDiceD20,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import "./customComponents.css";
import Settings from "./settings";
import Sidebar from "./sidebar";
import Premium from "./premium";
import Image from "next/image";

const Navbar = () => {
  const [hacker, setHacker] = useState(false);
  useEffect(() => {
    const desktopDevices = [
      "Win32",
      "Win64",
      "MacIntel",
      "Linux x86_64",
      "Linux i686",
      "Linux armv7l",
    ];

    const userDevice = navigator.platform;

    const hacker = window.innerWidth;

    if (desktopDevices.includes(userDevice) || hacker > 654) {
      localStorage.clear();
      setHacker(true);
      return;
    }
    setSize(window.innerWidth);
  }, []);
  const [active, setActive] = useState(false);
  const [size, setSize] = useState();
  useEffect(() => {
    setSize(window.innerWidth);
  }, []);

  if (hacker) {
    return;
  }

  return (
    <nav className="z-10 text-black ">
      <div className="mobile_sidebar">
        <FontAwesomeIcon
          icon={faDiceD20}
          style={{
            width: size > 500 ? "50px" : size > 400 ? "40px" : "30px",
            height: size > 500 ? "50px" : size > 400 ? "40px" : "30px",
            color: "rgb(236, 236, 236)",
          }}
        />
        {/* <Image
          src="/ChatGPT_white_350x350.png"
          alt="Chat Codex"
          width={size > 500 ? 50 : size > 400 ? 40 : 30}
          height={size > 500 ? 50 : size > 400 ? 40 : 30}
        /> */}
        <span className="ml-2 font-bold">Canding - AI</span>
      </div>
      <div className="mobile_device_icon ">
        <Premium />
        <FontAwesomeIcon
          onClick={() => setActive(true)}
          icon={faCircleUser}
          style={{
            width: size > 500 ? "50px" : size > 400 ? "40px" : "30px",
            height: size > 500 ? "50px" : size > 400 ? "40px" : "30px",
            color: "rgb(236, 236, 236)",
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
