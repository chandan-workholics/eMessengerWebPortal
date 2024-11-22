import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import callAPI from "../Common_Method/api";

const Header = () => {
  const [scrollMessage, setScrollMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchScrollerMessage = async () => {
    try {
      const response = await callAPI.get(
        "./api/appScrollerMsg/getAppScrollerMsgDetail"
      );
      if (response.data && response.data.message) {
        setScrollMessage(response.data.message);
      } else {
        setScrollMessage("No message available at the moment.");
      }
    } catch (error) {
      console.error("Error fetching scroller message:", error);
      setScrollMessage("Error fetching message.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScrollerMessage();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-2B3848 p-0">
        <div className="container">
          <Link className="navbar-brand text-white fw-semibold" to="/home">
            <img src="Images/e-logo.png" alt="" className="me-1" />
            eMessenger
          </Link>
          <ul className="d-lg-none d-block mb-0">
            <li className="nav-item dropdown-start py-2">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <img src="Images/profile.png" alt="" className="me-1" />
                </div>
              </Link>
              <ul className="dropdown-menu header-dropdown">
                <li>
                  <Link className="dropdown-item" to="">
                    Welcome Ram!
                  </Link>
                </li>
                <hr className="m-0" />
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fa-regular fa-user me-1"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="fa-solid fa-circle-info me-1"></i>Support
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="fa-solid fa-book me-1"></i>Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center mx-lg-5 mx-0 mx-md-4 my-lg-0 my-2">
              {loading ? (
                <marquee className="py-1 text-white bg-364659 rounded-3 fw-normal">
                  Loading message...
                </marquee>
              ) : (
                <marquee
                  className="py-1 text-white bg-364659 rounded-3 fw-normal"
                  aria-current="page"
                >
                  {scrollMessage || "No scroller message available."}
                </marquee>
              )}
            </li>
          </ul>
          <ul className="navbar-nav d-lg-block d-none">
            <li className="nav-item dropdown bg-273341 py-2">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <img src="Images/profile.png" alt="" className="me-1" />
                  <p className="mb-0 me-1 lh-1">
                    Ram Yadav
                    <br />
                    7415309294
                  </p>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="">
                    Welcome Ram!
                  </Link>
                </li>
                <hr className="m-0" />
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fa-regular fa-user me-1"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="fa-solid fa-circle-info me-1"></i>Support
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="fa-solid fa-book me-1"></i>Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
