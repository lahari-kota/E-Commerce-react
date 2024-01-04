import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ currentUser, removeUserInState }) {
  return (
    <div className="nav-container flex justify-center items-center bg-black text-white text-base min-h-[70px]">
      <div className="w-full nav-container-center flex justify-between items-center wrapper">
        <div className="logo">
          <h1 className="text-3xl">Build With Innovation</h1>
        </div>
        <div className="links-container">
          <ul className="flex gap-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-300" : "hover:text-blue-300"
              }
              to="/"
            >
              Home
            </NavLink>
            {currentUser?.id && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-300" : "hover:text-blue-300"
                }
                to="/logout"
                onClick={removeUserInState}
              >
                Logout
              </NavLink>
            )}

            {currentUser?.id && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-300" : "hover:text-blue-300"
                }
                to="/cart"
              >
                Cart
              </NavLink>
            )}

            {!currentUser?.id && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-300" : "hover:text-blue-300"
                }
                to="/login"
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
