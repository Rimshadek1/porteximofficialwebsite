import React, { useState } from 'react';
import './CartUp.css';
import { Link } from 'react-router-dom';
function WalletCartUp() {
    const [expanded, setExpanded] = useState(false);

    const toggleNavbar = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <div className={`navbarss ${expanded ? 'expanded' : ''}`}>
                <div className="leftsides">
                    <img
                        src="img/portexim.png"
                        style={{ height: '25px', margin: '4vh' }}
                        alt="portexim logo"
                    />
                </div>
                <div className="rightsides" onClick={toggleNavbar}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
            {expanded && (
                <div className="expanded-items">
                    <ul>
                        <li><Link to="/itemtoexport" >Items to export</Link></li>
                        <li><Link to="/wallet" className='active'>Wallet</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="#">Rewards</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="#">Help & Support</Link></li>
                    </ul>
                </div>
            )
            }
        </div >
    )
}

export default WalletCartUp