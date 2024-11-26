import React, { useState, useEffect } from "react";
import callAPI from "../Common_Method/api";
import { Link } from "react-router-dom";
import { interceptor } from "../Common_Method/api";

const Header = () => {
  const [appScrollNewsList, setAppScrollNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      interceptor();

      const response = await callAPI.get(`./appScrollerMsg/getAppScrollerMsgDetail`);
      if (response.data) {
        setAppScrollNewsList(response.data || []);
      } else {
        console.warn("No data received from API.");
        setAppScrollNewsList([]);
      }
    } catch (error) {
      console.error("Error fetching scroller messages:", error.message);
      setAppScrollNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-2B3848 p-0">
        <div className="container">
          <Link className="navbar-brand text-white fw-semibold" to="/home">
            <img src="Images/e-logo.png" alt="eMessenger Logo" className="me-1" />
            eMessenger
          </Link>

          <ul className="navbar-nav w-100">
            <li className="nav-item d-flex align-items-center mx-lg-5 mx-0 mx-md-4 my-lg-0 my-2 w-100">
              {loading ? (
                <marquee className="py-1 text-white bg-364659 rounded-3 fw-normal">
                  Loading message...
                </marquee>
              ) : (
                <marquee
                  className="py-1 text-white bg-364659 rounded-3 fw-normal"
                  aria-current="page"
                >
                  {appScrollNewsList?.data?.map((item, index) => (
                    <span key={index} className="me-4">
                      {item.detail || "No detail provided"}
                    </span>
                  ))}

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
                  <img src="Images/profile.png" alt="Profile Icon" className="me-1" />
                  <p className="mb-0 me-1 lh-1">
                    {user?.student_name ? user?.student_name : ''}
                    <br />
                    {user?.mobile_no ? user?.mobile_no : ''}
                  </p>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="">
                    Welcome {user?.student_name ? user?.student_name : ''} !
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
                  <Link className="dropdown-item" onClick={logout} to="/" >
                    <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
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
