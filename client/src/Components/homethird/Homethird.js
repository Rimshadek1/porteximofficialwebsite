import React from 'react'
import './Homethird.css'

function Homethird() {
    return (
        <div className='thirdfull'>
            <div className="how">
                <h2>So, how will you make money?</h2>
                <p>Portexim was built to empower everyone to own and build wealth through export-import</p>
            </div>
            <div className="iconimage">
                <div className="iconmonth">
                    <div className="divmonth">
                        <i class="fa-solid fa-inbox"></i>
                        <h6>Trade income</h6>
                        <p>Consistent passive income from trade</p>
                    </div>
                </div>
                <div className="iconmonth">
                    <div className="divmonth-with-icon">
                        <img src="img/home2.png" alt="home" />
                        <i className="fa-solid fa-heart"></i>
                    </div>
                </div>
                <div className="iconmonth">
                    <div className="divmonth third">
                        <i class="fa-solid fa-seedling"></i>
                        <h6> capital appreciation</h6>
                        <p>Watch your investment value appreciates</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homethird