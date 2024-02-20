import React from 'react'
import './Homesecond.css'
function Homesecond() {
    return (
        <div>
            < div className='fullsecond' >
                <div className="howitsworks">
                    <h3 className='works'> How it works</h3>
                    <p className='worksp'>Portexim is available to investors all over the world</p>
                </div>
                <div className="collection text-secondary">
                    <div className="browsecollection active">
                        <i class="fa-solid fa-1"></i>
                        <p className='head'>Browse</p>
                        <p className='head1'>Sign up in less than 3 minutes and browse our collection of trades</p>
                    </div>
                    <div className="browsecollection ">
                        <i class="fa-solid fa-2"></i>
                        <p className='head'>Purchase</p>
                        <p className='head1'>Buy a piece of the ones you love, starting from only RS 2000</p>
                    </div>
                    <div className="browsecollection">
                        <i class="fa-solid fa-3"></i>
                        <p className='head'>Own</p>
                        <p className='head1'>Sit back and track your income and investments online</p>
                    </div>
                    <div className="browsecollection ">
                        <i class="fa-solid fa-4"></i>
                        <p className='head'>Exit</p>
                        <p className='head1'>Hold, exit your trade in a way that suits your financial goals</p>
                    </div>
                </div>
                <div className='imageofhow'>
                    <div className='divdetails text-center'>
                        <div className="line"></div>
                        <p>Our team of trade professionals combine a data driven valuation and analysis process with over
                            2 years of leadership experience at the top trade companies in World,
                            to source the best trade items with the highest investment potential for you.</p>
                    </div>
                    <div className="searchbar"><i class="fa-solid fa-magnifying-glass"></i></div>
                    <img src="img/browse.png" alt="howitsworksimg" />
                </div>
            </div>
        </div>
    )
}

export default Homesecond