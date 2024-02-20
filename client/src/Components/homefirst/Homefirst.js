import React from 'react';
import './homefirst.css';

function Homefirst() {
    return (
        <div className='fulldiv'>
            <div className='homefirstdiv'>
                <div className="textpart">
                    <h2>The modern way for anyone to invest in international trading</h2>
                    <p>Digitally invest in prime international trades from only RUPEES 2000 (USD 22), no matter where you are in the world!</p>
                </div>
                <div className="imagepart">
                    <img src="img/ship.png" alt="" />
                </div>
            </div>
            <div className="info">
                <div className='registered'>
                    <h3>450K+</h3>
                    <p>registered users</p>
                </div>
                <div className='registered'>
                    <h3>RS 239M+</h3>
                    <p>in trade transactions</p>
                </div>
                <div className='registered'>
                    <h3>203</h3>
                    <p>user nationalities</p>
                </div>
                <div className='registered'>
                    <h3>RS 8.4M+</h3>
                    <p>trade income paid</p>
                </div>
            </div>
        </div>
    );
}

export default Homefirst;