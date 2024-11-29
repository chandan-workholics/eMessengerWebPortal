import React, { useState, useEffect } from "react";
import wlcmImg from "../welcome-bg--img.png";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";

const WelcomeMsg = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const [noticeBoardData, setNoticeBoardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                interceptor();
                const response = await callAPI.get("/notice/getNoticeBoardDetail");
                setNoticeBoardData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Something went wrong");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-fluid p-0 welcomeMsg-page position-relative">
            {/* Main Content Section */}
            <div className="container pt-3">
                <div className="row pt-5 justify-content-center">
                    {/* Responsive Column */}
                    <div className="col-12 col-md-10 col-lg-6 col-xxxl-6  col-xxl-6 col-xl-6 px-3 px-lg-5 mx-auto">
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : error ? (
                            <div className="text-danger text-center">Error: {error}</div>
                        ) : (
                            <AutoplaySlider
                                className="AutoSliderStyle"
                                play={true}
                                cancelOnInteraction={false}
                                interval={5000}
                            >
                                {noticeBoardData?.data?.map((notice, index) => (
                                    <div key={index}>
                                        <Link
                                            to="#"
                                            onClick={() =>
                                                window.open(
                                                    notice.document_link,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                )
                                            }
                                        >
                                            <img
                                                src={notice.thumbnails}
                                                alt="thumbnail"
                                                className="img-fluid object-fit-contain noticeboardImg"
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </AutoplaySlider>
                        )}
                    </div>
                </div>
            </div>

            <div className="bottomImage">
                {/* Bottom Background Image */}
                <div className="position-absolute bottom-0 start-0 w-100">
                    <img src={wlcmImg} alt="" className="w-100 object-fit-contain" />
                </div>

                {/* Bottom Navigation */}
                <div className="position-absolute bottom-0 end-0 w-100 d-flex justify-content-end">
                    <Link to="/home" className="btn bg-E79C1D rounded-pill me-5 mb-4 px-4">
                        Next
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMsg;
