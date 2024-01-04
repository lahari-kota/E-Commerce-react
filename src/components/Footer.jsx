import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container bg-black text-white px-2 py-2 text-base ">
      <div className="footer-container-center w-full  flex items-center justify-center flex-col gap-4 min-h-[200px]">
        <div className="footer-links">
          <ul className="flex justify-center items-center gap-4">
            <Link className="links" to="/">
              Home
            </Link>
            <Link className="links" to="/about">
              About
            </Link>
          </ul>
        </div>
        <p className="text-white ">
          Copyright ©2020 - 2023{" "}
          <Link className="text-sky-500">Build With Innovation ,</Link> Inc. All
          rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
