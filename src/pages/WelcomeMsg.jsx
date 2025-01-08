import React, { useState, useEffect } from "react";
import wlcmImg from "../welcome-bg--img.png";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";
import callAPI, { interceptor } from "../Common_Method/api";
import '../App.css';

const WelcomeMsg = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const [noticeBoardData, setNoticeBoardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                interceptor();
                const response = await callAPI.get(`/notice/getNoticeBoardDetails?mobilenumber=${user?.mobile_no}`);
                setNoticeBoardData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Something went wrong");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const isPDF = (url) => url.endsWith(".pdf");
    const isYouTube = (url) =>
        url.includes("youtube.com") || url.includes("youtu.be");

    return (
        <div className="container-fluid p-0 welcomeMsg-page position-relative">

            <div className="container pt-5 pt-lg-0">
                <div className="row pt-5 justify-content-center">

                    <div className="col-12 col-md-10 col-lg-6 col-xxxl-6 col-xxl-6 col-xl-6 px-3 px-lg-5 mx-auto">
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
                                    <div key={index} className="position-relative">
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
                                            {isPDF(notice.document_link) || isYouTube(notice.document_link) ? (
                                                <>
                                                    <img
                                                        src={notice.thumbnails || "default-thumbnail.png"}
                                                        alt="thumbnail"
                                                        className="img-fluid object-fit-contain noticeboardImg"
                                                    />

                                                    <div
                                                        className="play-button position-absolute"
                                                        style={{
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            fontSize: "1.5rem", // Reduced font size
                                                            color: "#fff",
                                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                            borderRadius: "50%",
                                                            width: "40px", // Reduced width
                                                            height: "40px", // Reduced height
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        ▶
                                                    </div>
                                                </>
                                            ) : (

                                                <img
                                                    src={notice.thumbnails}
                                                    alt="thumbnail"
                                                    className="img-fluid object-fit-contain noticeboardImg"
                                                />
                                            )}
                                        </Link>
                                    </div>
                                ))}
                            </AutoplaySlider>
                        )}
                    </div>
                </div>
            </div>

            <div className="bottomImage">

                <div className="position-absolute bottom-0 start-0 w-100">
                    <img src={wlcmImg} alt="" className="w-100 object-fit-contain" />
                </div>


                <div className="position-absolute top-0 end-0 w-100 d-flex justify-content-end">
                    <Link to="/home" className="btn bg-E79C1D rounded-pill me-4 mt-4 px-4">
                        Next
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMsg;