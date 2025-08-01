import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SplashScreen from "./SplashScreen";
import mobileAppIcon from "../mobileApp-Icon.png";


const SignIn = () => {

  const [isLoadingSplash, setIsLoadingSplash] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSplash(false);
    }, 2000);
  }, []);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const navigate = useNavigate();
  let otpTimeout;

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

  const handleMobileSubmit = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://apps.actindore.com/api/parents/otp",
        { mobile_no: mobile }
      );

      if (response.status === 200 && response.data.status) {

        setShowOtpInput(true);
        setFormVisible(false);

        otpTimeout = setTimeout(() => {
          setShowOtpInput(false);
          setFormVisible(true);

        }, 90000);
      } else {
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    if (e) e.preventDefault(); // for form submission or keydown

    setOtpLoading(true);
    try {
      const response = await axios.post(
        "https://apps.actindore.com/api/parents/otp-verify",
        { mobile_no: mobile, otp: otp }
      );

      if (response.status === 200 && response.data.status) {
        const { token: newToken } = response.data;
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          setOtpLoading(false);
          navigate("/welcome-message");
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to verify OTP.");
        setOtp("");
        setShowOtpInput(false);
        setFormVisible(true);
      }
    } catch (error) {
      toast.error("Error during OTP verification. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };


  useEffect(() => {
    return () => clearTimeout(otpTimeout); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoadingSplash ? (
    <SplashScreen />
  ) : (
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
                <img src={require("../Img/login image.png")} alt="Login Illustration" className="w-75" />
              </div>
              <div className="login-bottom d-flex justify-content-center mt-5">
                <img src={require("../Img/lb.png")} alt="Img" className="me-4" />
                <img src={require("../Img/lb1.png")} alt="Img" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
          <div className="container px-xl-5">
            <div className="right py-4 row justify-content-center align-items-center">
              <img src={require("../Img/e-logo.png")} alt="eMessenger Logo" />
              <h2 className="text-010A48 fw-semibold text-center">
                Hi, Welcome 👋
              </h2>
              <p className="text-78828A text-center">
                Agrawal Group's Communication App
              </p>
            </div>

            {formVisible && (
              <form onSubmit={handleMobileSubmit}>
                <div className="row d-flex justify-content-center px-xl-5">
                  <div className="mb-4 col-12 px-4">
                    <label htmlFor="mobile" className="form-label">
                      Enter registered mobile no
                    </label>
                    <input
                      type="text"
                      className={`form-control text-8E8E8E py-3 fw-light rounded-4 ${error ? "is-invalid" : ""
                        }`}
                      id="mobile_no"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={handleMobileChange}
                      required
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="mb-4 col-12 px-4">
                    <button
                      type="submit"
                      className="btn log-btn w-100 bg-E79C1D border-0 fw-semibold text-white py-3 rounded-4"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="sign-up text-center">
                    <Link className="text-DA251C fw-semibold fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      How to install App?
                    </Link>
                  </div>
                </div>
              </form>
            )}

            {showOtpInput && (
              <form onSubmit={handleOtpSubmit}>
                <div className="row d-flex justify-content-center px-xl-5">
                  <div className="mb-4 col-12 px-4">
                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control text-8E8E8E py-3 fw-light rounded-3"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleOtpSubmit(e);
                        }
                      }}
                      maxLength={4}
                      required
                    />

                    <button
                      type="submit"
                      className="btn log-btn w-100 bg-E79C1D border-0 fw-semibold text-white py-3 rounded-3 mt-3"
                      disabled={otpLoading}
                    >
                      {otpLoading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>

                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
        <div className="d-lg-none bg-273341 login-bottom d-flex justify-content-center py-3 px-2 position-absolute start-0 bottom-0">
          <img src={require("../Img/lb.png")} alt="img" className="me-4" />
          <img src={require("../Img/lb1.png")} alt="img" />
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

      {/* Modal */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style={{ borderRadius: '16px' }}>
            <div class="modal-body">
              <div className="d-flex">
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="row align-items-center">
                <div class="col-md-6">
                  <img src={mobileAppIcon} alt="Mobile App" class="app-image w-100 ps-4 pb-4" />
                </div>
                <div class="col-md-6 pe-4">
                  <h2 class="fw-bold text-center">DOWNLOAD <br /> OUR APP</h2>
                  <p>Get notifications of all our latest information straight to your phone. </p>
                  <div class="app-buttons text-center">
                    <Link to='/'>
                      <img src={require("../Img/lb.png")} alt="img" className="mb-3" />
                    </Link>
                    <Link to='/'>
                      <img src={require("../Img/lb1.png")} alt="img" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignIn;
