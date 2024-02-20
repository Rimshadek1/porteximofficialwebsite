import React from 'react';
import './homeforth.css';

function Homefourth() {
    return (
        <div className='fullfourth'>
            <div className="how">
                <h2>Trade investing made easy</h2>
                <p>90% of the world's millionaires made their fortunes through export-import business, but it’s highly
                    inaccessible, illiquid, and complicated - that’s where we come in!</p>
            </div>
            <div className="cards">
                <div className="card1">
                    <i class="fa-solid fa-coins"></i>
                    <h6>Invest in export-import from only RS 2000</h6>
                    <p>With fractionalised properties there is no mortgage or large down payments required</p>
                </div>
                <div className="card1">
                    <i class="fa-solid fa-chart-line"></i>
                    <h6>Diversify your portfolio</h6>
                    <p>Explore a variety of trade opportunities to diversify your investment portfolio</p>
                </div>
                <div className="card1">
                    <i class="fa-solid fa-globe"></i>
                    <h6>Global market access</h6>
                    <p>Access international markets and discover new trade possibilities with ease</p>
                </div>
                <div className="card1">
                    <i class="fa-solid fa-clock"></i>
                    <h6>Save time and effort</h6>
                    <p>We handle the complexities, allowing you to focus on your business growth</p>
                </div>
            </div>
        </div>
    );
}

export default Homefourth;
