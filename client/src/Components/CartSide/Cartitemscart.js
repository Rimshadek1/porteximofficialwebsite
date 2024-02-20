import React from 'react'
import { Link } from 'react-router-dom'

function Cartitemscart() {
    return (
        <div>
            <nav id="navbar" className='text-black bg-white side'>
                <ul className="navbar-items flexbox-col">
                    <li className="navbar-logo flexbox-left">
                        <Link to='/home' className="navbar-item-inner flexbox">
                            <img src="img/portexim.png" style={{ height: '25px' }} alt="portexim logo" />
                        </Link>
                    </li>
                    <li className="navbar-item flexbox-left">
                        <Link to='/itemtoexport' className="navbar-item-inner flexbox-left ">
                            <div className="navbar-item-inner-icon-wrapper flexbox ">
                                <i className="fa-solid fa-ship" ></i>
                            </div>
                            <span className="link-text">Items to export</span>
                        </Link>
                    </li>
                    <li className="navbar-item flexbox-left">
                        <Link to='/wallet' className="navbar-item-inner flexbox-left">
                            <div className="navbar-item-inner-icon-wrapper flexbox ">
                                <i class="fa-solid fa-wallet"></i>
                            </div>
                            <span className="link-text">Wallet</span>
                        </Link>
                    </li>
                    <li className="navbar-item flexbox-left">
                        <Link to='/portfolio' className="navbar-item-inner flexbox-left">
                            <div className="navbar-item-inner-icon-wrapper flexbox ">
                                <i class="fa-solid fa-signal"></i>
                            </div>
                            <span className="link-text">Portfolio</span>
                        </Link>
                    </li>
                    <li className="navbar-item flexbox-left">
                        <Link to='#' className="navbar-item-inner flexbox-left">
                            <div className="navbar-item-inner-icon-wrapper flexbox">
                                <i class="fa-solid fa-award"></i>
                            </div>
                            <span className="link-text">Rewards</span>
                        </Link>
                    </li>
                    <li className="navbar-item flexbox-left">
                        <Link to='/cart' className="navbar-item-inner flexbox-left">
                            <div className="navbar-item-inner-icon-wrapper flexbox active">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <span className="link-text">Cart</span>
                        </Link>
                    </li>
                    <li className="navbar-item flexbox-left">
                        <Link to='#' className="navbar-item-inner flexbox-left">
                            <div className="navbar-item-inner-icon-wrapper flexbox">
                                <i class="fa-regular fa-comments"></i>
                            </div>
                            <span className="link-text">Help & Support</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default Cartitemscart