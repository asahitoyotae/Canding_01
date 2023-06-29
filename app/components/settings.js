import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faBook,
  faBrain,
  faChevronRight,
  faGlobe,
  faMedal,
  faQuestion,
  faShare,
  faStar,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const Settings = ({ active, setActive }) => {
  return (
    <div className={`drop_down z-10 ${active ? "active" : "inactive"}`}>
      <div className="flex items-center justify-center mb-6">
        <Image
          src="/ChatGPT_white_350x350.png"
          width={50}
          height={50}
          alt="logo"
        />
        <span className="text-white text-lg ml-3">Canding</span>
      </div>
      <p className="text-gray-200 ml-2 mb-1">Settings</p>
      <ul className="flex justify-center flex-col items-center w-full rounded-xl mb-3">
        <li className="flex justify-between w-full p-2 ">
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faBrain}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>GPT Version</span>
          </div>{" "}
          <div>
            gpt-3.5{" "}
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
        <li className="flex justify-between w-full p-2 ">
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faGlobe}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Language</span>
          </div>{" "}
          <div>
            English{" "}
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
        <li className="flex justify-between w-full p-2 ">
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
        <li className="flex justify-between w-full p-2">
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faVolumeHigh}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Spoken Responses</span>
          </div>{" "}
          <div>
            off
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
      </ul>
      <p className=" ml-2 mb-1 text-gray-200">About</p>
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
            5 star
            <span className="ml-3 text-lg">
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "14px", height: "14px" }}
              />
            </span>
          </div>
        </li>
        <li className="flex justify-between w-full p-2 border-b">
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faShare}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Share</span>
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
        <li className="flex justify-between w-full p-2 border-b">
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
        <li className="flex justify-between w-full p-2">
          <div className="flex gap-2 items-center justify center ml-2">
            <FontAwesomeIcon
              icon={faBook}
              style={{ width: "15px", height: "15px" }}
            />{" "}
            <span>Terms of Use</span>
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
      <div className="w-full flex text-gray-200">
        <FontAwesomeIcon
          onClick={() => setActive(false)}
          icon={faChevronRight}
          style={{
            width: "24px",
            height: "24px",
            position: "absolute",
            right: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
