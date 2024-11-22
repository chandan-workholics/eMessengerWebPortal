import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const navigate = useNavigate();
  let otpTimeout;

  // Handle mobile number input change
  const handleMobileChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setError("Mobile number must contain only digits.");
      return;
    }

    if (value.length > 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    setError("");
    setMobile(value);
  };

  // Handle mobile number form submission
  const handleMobileSubmit = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://206.189.130.102:3550/api/parents/otp",
        { mobile_no: mobile }
      );
      const data = await response.data;
      console.log(data, "data=========")
      if (response.status === 200 && data.status) {
        setReceivedOtp(data.otp);
        setShowOtpInput(true);
        setFormVisible(false);

        otpTimeout = setTimeout(() => {
          setShowOtpInput(false);
          setFormVisible(true);
          toast.error("OTP expired. Please try again.");
        }, 8000);

        const { token } = data.token;
        sessionStorage.setItem('token', token);  // Store token in sessionStorage
        console.log(data)
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP form submission
  const handleOtpSubmit = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error("No token provided. Please log in again.");
      navigate("/login");
      return;
    }

    if (otp === receivedOtp) {
      toast.success("OTP verified successfully!");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 2000);
    } else {
      toast.error("Invalid OTP. Please try again.");
      setOtp("");
      setShowOtpInput(false);
      setFormVisible(true);
    }
  };

  // Cleanup OTP timeout on component unmount
  useEffect(() => {
    return () => clearTimeout(otpTimeout); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid p-0 login-page">
      <div className="row mx-auto h-100vh position-relative">
        <div className="col-lg-6 p-0 h-100 d-none d-lg-block">
          <div className="left d-flex align-items-center justify-content-center py-4">
            <div>
              <div className="text-center mb-5">
                <h3 className="text-white text-center">
                  eMessenger App <br />
                  Download
                </h3>
              </div>
              <div className="login-image d-flex justify-content-center align-items-center">
                <img src="Images/login image.png" alt="Login Illustration" />
              </div>
              <div className="login-bottom d-flex justify-content-center mt-5">
                <img src="Images/lb.png" alt="Img" className="me-4" />
                <img src="Images/lb1.png" alt="Img" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center pb-5">
          <div className="container px-xl-5">
            <div className="right py-4 row justify-content-center align-items-center">
              <img src="Images/e-logo.png" alt="eMessenger Logo" />
              <h2 className="text-010A48 fw-semibold text-center">
                Hi, Welcome 👋
              </h2>
              <p className="text-78828A text-center">
                Enter your registered mobile number to proceed.
              </p>
            </div>
            {formVisible && (
              <form onSubmit={handleMobileSubmit}>
                <div className="row d-flex justify-content-center px-xl-5">
                  <div className="mb-4 col-10 px-4">
                    <label htmlFor="mobile" className="form-label">
                      Enter registered mobile no
                    </label>
                    <input
                      type="text"
                      className={`form-control text-8E8E8E py-2 fw-light rounded-3 ${error ? "is-invalid" : ""
                        }`}
                      id="mobile_no"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={handleMobileChange}
                      required
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="mb-4 col-10 px-4">
                    <button
                      type="submit"
                      className="btn log-btn w-100 bg-E79C1D border-0 fw-semibold text-white py-2 rounded-3"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="sign-up text-center">
                    <Link to="/" className="text-DA251C fw-semibold fs-6">
                      How to install App?
                    </Link>
                  </div>
                </div>
              </form>
            )}
            {showOtpInput && (
              <div className="row d-flex justify-content-center px-xl-5">
                <div className="mb-4 col-10 px-4">
                  <label htmlFor="otp" className="form-label">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control text-8E8E8E py-2 fw-light rounded-3"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
                    }}
                    maxLength={4}
                    required
                  />
                  {receivedOtp && (
                    <p className="text-success mt-2">
                      <strong>Received OTP (for testing):</strong> {receivedOtp}
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn log-btn w-100 bg-E79C1D border-0 fw-semibold text-white py-2 rounded-3 mt-3"
                    onClick={handleOtpSubmit}
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-lg-none bg-273341 login-bottom d-flex justify-content-center py-3 px-2 position-absolute start-0 bottom-0">
          <img src="Images/lb.png" alt="img" className="me-4" />
          <img src="Images/lb1.png" alt="img" />
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SignIn;
