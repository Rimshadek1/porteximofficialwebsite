import React from 'react'

function Aboutcomp() {
    return (
        <div>
            {/* topimage */}
            <div className="container-fluid page-header about1 py-5 mb-5">
                <div className="container py-5 text-center">
                    <h1 className="display-4 text-black mb-3 animated slideInDown">About us</h1>
                    <p className="lead text-black mb-4 animated slideInDown mx-auto" style={{ fontSize: '1rem' }}>
                        We are dedicated to empowering individuals to achieve financial prosperity by
                        facilitating international trade through Export and Import services.
                    </p>
                </div>
            </div>
            {/* topimage */}
            {/* feature */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light"
                                    style={{ width: '60px', height: '60px' }}>
                                    <i className="fas fa-chart-line fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">01</h1>
                            </div>
                            <h5>Invest with Confidence</h5>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light"
                                    style={{ width: '60px', height: '60px' }}>
                                    <i className="fas fa-balance-scale fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">02</h1>
                            </div>
                            <h5>Global Trade Expertise</h5>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light"
                                    style={{ width: '60px', height: '60px' }}>
                                    <i className="fas fa-handshake fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">03</h1>
                            </div>
                            <h5>Flexible Investment Options</h5>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light"
                                    style={{ width: '60px', height: '60px' }}>
                                    <i className="fas fa-users fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">04</h1>
                            </div>
                            <h5>Participate in Global Trade</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* feature */}
            {/* about */}
            <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
                <div className="container about px-lg-0">
                    <div className="row g-0 mx-lg-0">
                        <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute img-fluid w-100 h-100" src="img/about.jpg"
                                    style={{ objectFit: 'cover' }} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-lg-5 pe-lg-0">
                                <div className="section-title text-start">
                                    <h1 className="display-5 mb-4">About Us</h1>
                                </div>
                                <p className="mb-4 pb-2">We are a dynamic export-import company with 2 years of experience.
                                    Whether it's facilitating small transactions or managing large-scale trade operations, we are
                                    dedicated to making international business seamless and profitable for our partners.</p>
                                <div className="row g-4 mb-4 pb-2">
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                                style={{ width: '60px', height: '60px' }}>
                                                <i className="fas fa-users fa-2x text-primary"></i>
                                            </div>
                                            <div className="ms-3">
                                                <h2 className="text-primary mb-1" data-toggle="counter-up">147</h2>
                                                <p className="fw-medium mb-0">Satisfied Clients</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                                style={{ width: '60px', height: '60px' }}>
                                                <i className="fas fa-check fa-2x text-primary"></i>
                                            </div>
                                            <div className="ms-3">
                                                <h2 className="text-primary mb-1" data-toggle="counter-up">14</h2>
                                                <p className="fw-medium mb-0">Successful Export and Import</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="/" className="btn btn-primary py-3 px-5">Explore More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about */}
            {/* team */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center">
                        <h1 className="display-5 mb-5">Board members</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item">
                                <div className="overflow-hidden position-relative">
                                    <img className="img-fluid" src="img/team-1.jpg" alt="" />
                                    <div className="team-social">
                                        <a className="btn btn-square" href="/"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href="/"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href="/"><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="text-center border border-5 border-light border-top-0 p-4">
                                    <h5 className="mb-0">Salmanul Fariz P</h5>
                                    <small>Managing Director</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item">
                                <div className="overflow-hidden position-relative">
                                    <img className="img-fluid" src="img/team-2.jpg" alt="" />
                                    <div className="team-social">
                                        <a className="btn btn-square" href="/"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href="/"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href="/"><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="text-center border border-5 border-light border-top-0 p-4">
                                    <h5 className="mb-0">Sinan Abdulatif</h5>
                                    <small>Director & Founder</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item">
                                <div className="overflow-hidden position-relative">
                                    <img className="img-fluid" src="img/team-3.jpg" alt="" />
                                    <div className="team-social">
                                        <a className="btn btn-square" href="/"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href="/"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href="/"><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div className="text-center border border-5 border-light border-top-0 p-4">
                                    <h5 className="mb-0">Rimshad EK</h5>
                                    <small>Director and CEO</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* team */}
        </div>
    )
}

export default Aboutcomp