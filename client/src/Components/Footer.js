import React from 'react'

function Footer() {
    return (
        <div>
            <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-light mb-4">Get In Touch</h4>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>1st Floor, CC 54, 2593-5, Bose Nagar, Kadavanthara, Kochi, Kerala – 682020</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+91 9061 917 719</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@portexim.in</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-instagram"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="text-light mb-4">Export items</h4>
                            <a class="btn btn-link" href="#/">Frozen French Fries</a>
                            <a class="btn btn-link" href="#/">Millets</a>
                            <a class="btn btn-link" href="#/">Garments</a>
                            <a class="btn btn-link" href="#/">Refined Oil</a>

                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-light mb-4">Quick Links</h4>
                            <a className="btn btn-link" href="#/">Home</a>
                            <a className="btn btn-link" href="#/">Our Products</a>
                            <a className="btn btn-link" href="#/">Rebranding</a>
                            <a className="btn btn-link" href="#/">Invest</a>
                            <a className="btn btn-link" href="#/">Newsletter</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-light mb-4">Newsletter</h4>
                            <p>Subscribe to our newsletter for the latest updates on our export-import services and products.
                                Be the first to know about new arrivals, industry insights, and exclusive offers. Don't miss out –
                                stay informed and connected with Port Exim Ventures Pvt Ltd. Mail us to Subscribe</p>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a className="border-bottom" href="/portexim.in">portexim.in</a>, All Right Reserved.
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer