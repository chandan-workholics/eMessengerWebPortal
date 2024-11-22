import React, { useState, useEffect } from "react";
import callAPI from "../Common_Method/api";
import { Link } from "react-router-dom";

const Header = () => {
  const [appScrollNewsList, setAppScrollNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch scroller messages
  useEffect(() => {
    fetchData();
  }, []); // Run on component mount

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await callAPI.get(`./appScrollerMsg/getAppScrollerMsgDetail`);

      // Handling the response and updating the state
      setAppScrollNewsList(response.data || []);
    } catch (error) {
      console.error("Error fetching welcome message data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-2B3848 p-0">
        <div className="container">
          <Link className="navbar-brand text-white fw-semibold" to="/home">
            <img src="Images/e-logo.png" alt="" className="me-1" />
            eMessenger
          </Link>

          {/* Marquee for scrolling messages */}
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
                  {appScrollNewsList.length > 0 ? (
                    appScrollNewsList.map((item, index) => (
                      <span key={index} className="me-4">
                        {item.detail}
                      </span>
                    ))
                  ) : (
                    "No scroller messages available."
                  )}
                </marquee>
              )}
            </li>
          </ul>

          {/* Rest of the navbar for profile and other items */}
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
