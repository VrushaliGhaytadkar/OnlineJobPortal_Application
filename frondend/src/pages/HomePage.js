import React from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
const HomePage = () => {
    return (
        <>
            {/* <video autoPlay muted loop id="myVideo">
                <source src="/assets/videos/bg.mp4" type="video/mp4" />
            </video> */}
            <div className="content d-flex justify-content-center align-items-center">
                <div className="card w-20">
                    <img src="/assets/images/logo2.png" alt="logo" />
                    <hr />
                    <div className="card-body" style={{ marginTop: "-10px" }}>
                        <h5 className="card-title justify-content-center align-items-center">Job Search Platform</h5>
                        <p className="card-text">
                            Search and manage your jobs with ease. free and open source job
                            ortal application by Online Job Platform
                        </p>
                        <div className="d-flex justify-content-between mt-5">
                            <p>
                                Not a User  <Link to="/register">   RegisterHere !</Link>{" "}
                            </p>
                            <p>
                                <Link to="/login" className="myBtn">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;