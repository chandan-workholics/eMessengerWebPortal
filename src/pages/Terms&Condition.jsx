import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const TermsConditions = () => {

    return (
        <>
            <Header />
            <div className="container-fluid p-0 reply-page">
                <div className="idname py-1 border-bottom">
                    <div className="container py-1">
                        <h5 className="text-1F2C37 fw-normal mb-0">Terms & Conditions</h5>
                    </div>
                </div>
                <div className="container mt-3 mt-lg-5">
                    <div className="row">
                        <div className="col-md-6 d-none d-lg-block">
                            <h6>Thank You for your interest our school.</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsConditions;
