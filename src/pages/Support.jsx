import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Support = () => {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        const raw = JSON.stringify({
            parent_id: user.parents_id,
            description: description,
            status: 1,
            remark: "",
            added_date: Date.now(),
            added_user_id: user.parents_id,
            edited_date: '',
            edited_user_id: user.parents_id,
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: raw,
        };

        try {
            const response = await fetch(
                "https://apps.actindore.com/api/supports/add_support",
                requestOptions
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setSuccessMessage("Your support request has been submitted successfully.");
            setDescription(""); // Clear the description field
        } catch (error) {
            console.error("Error submitting support request:", error);
            setErrorMessage("An error occurred while submitting your request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h5 className="text-1F2C37 fw-normal mb-0">Support</h5>
                    </div>
                </div>
                <div className="container mt-3 mt-lg-5">
                    <div className="row">
                        <div className="col-md-6 d-none d-lg-block">
                            <h1>
                                Let's get you <br /> some help!
                            </h1>
                            <h6>Have any issue? Send us a message</h6>
                            <div className="img-wrapper">
                                <img
                                    src="https://i.ibb.co/bWfN3Qy/undraw-onboarding-o8mv-1.png"
                                    alt="Support Illustration"
                                    className="w-100"
                                />
                            </div>
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <form onSubmit={handleSubmit}>
                                {/* Description Field */}
                                <div className="form-group">
                                    <label
                                        className="fw-bolder mb-2"
                                        htmlFor="describe"
                                    >
                                        Please describe your issue, including your child's name,
                                        class, school name, and registered mobile number.
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="describe"
                                        rows="5"
                                        placeholder="Write here..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn bg-FF0000 text-white rounded-5 mx-auto px-4 mt-3"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Success or Error Messages */}
                    {successMessage && (
                        <div className="alert alert-success mt-3">{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger mt-3">{errorMessage}</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Support;
