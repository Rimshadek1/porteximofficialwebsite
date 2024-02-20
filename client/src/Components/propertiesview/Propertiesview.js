import React, { useEffect, useState } from 'react';
import './Proper.css';
import Lightbox from './Lightbox';
import CountryFlag from 'react-country-flag';
import Progressproperties from './Progressproperties';
import { addToCart, viewOnlyOneTrade } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function Propertiesview() {
    const [lightboxImage, setLightboxImage] = useState(null);
    const navigate = useNavigate();
    const currentDate = new Date();
    const openLightbox = (imageUrl) => {
        setLightboxImage(imageUrl);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };
    const [trade, setTrade] = useState([]);
    const fundClosingDate = new Date(trade.fundClosing);
    const timeDifference = fundClosingDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewOnlyOneTrade(id);
                if (response.status === 200) {

                    setTrade(response.data.data);
                } else {
                    console.log(response.response.data.error);
                    toast.error(response.response.data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleAddCart = async (e) => {
        e.preventDefault();
        const data = {
            tradeId: id
        }
        const response = await addToCart(data);
        if (response.status === 200) {
            toast.success('Item add to cart successfully');
            navigate('/cart')
        } else {
            toast.error(response.response.data.error);
        }

    }
    return (
        <div className="fullview">
            <div className="toptexts">
                <p>properties</p>
                <button>Bookmark</button>
            </div>
            <div className="image3">
                <img
                    src={trade.image1 && `data:image;base64,${trade.image1.toString('base64')}`}
                    className="img1"
                    alt="picute"
                    onClick={() => openLightbox('img/portfolio-1.jpg')}
                    style={{ width: '32vw', height: '32vw' }}
                />

                <div className="img23">
                    <img
                        src={trade.image2 && `data:image;base64,${trade.image2.toString('base64')}`}
                        className="img2"
                        alt="picute"
                        onClick={() => openLightbox('img/portfolio-2.jpg')}
                        style={{ width: '20vw', height: '15vw' }}
                    />

                    <img
                        src={trade.image3 && `data:image;base64,${trade.image3.toString('base64')}`}
                        className="img3"
                        alt="picute"
                        onClick={() => openLightbox('img/portfolio-3.jpg')}
                        style={{ width: '20vw', height: '15vw' }}
                    />

                </div>
                <div className="img23">
                    <img
                        src={trade.image4 && `data:image;base64,${trade.image4.toString('base64')}`}
                        className="img2"
                        alt="picute"
                        onClick={() => openLightbox('img/portfolio-2.jpg')}
                        style={{ width: '20vw', height: '15vw' }}
                    />

                    <img
                        src={trade.image5 && `data:image;base64,${trade.image5.toString('base64')}`}
                        className="img3"
                        alt="picute"
                        onClick={() => openLightbox('img/portfolio-3.jpg')}
                        style={{ width: '20vw', height: '15vw' }}
                    />

                </div>
            </div>
            <ToastContainer />
            {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={closeLightbox} />}
            <div className="divdepri">
                <div className="divdet">
                    <div className="secfirst">
                        <h3>{trade.trade}</h3>
                        <div className="secfirst1">
                            <span className='flags'>   <CountryFlag className="flag-lg" countryCode="IN" svg />
                                <span className='flagss'>{trade.locationfrom} to {trade.locationto}</span>
                            </span>
                            <p>A mature trade market with a high return on investment</p>

                        </div>
                        {/* <div className="secfirst2">
                            <span className='flags'>  <i class="fa-solid fa-chart-simple"></i>
                                <span className='flagss'>7.21% annual gross yield</span>
                            </span>
                            <p>With a net yield of 5.46% and a price per square foot of RS 2,692</p>

                        </div> */}
                    </div>
                    <div className="secsecond">
                        <h3>Trade Overview</h3>
                        <p className="overview-text">{trade.overview}</p>
                    </div>
                    <div className="secthird">
                        <h3>Funding timeline</h3>
                        <div className="bing">
                            <div className="date">
                                <div className="circle green"></div>
                                <div className="two">
                                    <div className="date-text">{trade.fundClosing}</div>
                                    <div className="date-text1">Expected closing date</div>
                                    <div className="description">This is a conservative estimate for the closing date of the trade funding.</div>
                                </div>
                            </div>
                            <div className="date">
                                <div className="circle grey"></div>
                                <div className="two">
                                    <div className="date-text">{trade.shippingDate}</div>
                                    <div className="date-text1">Expected shipping time</div>
                                    <div className="description">After the closing date, preparations for shipping will commence, ensuring
                                        timely transportation of goods to the destination.</div>
                                </div>
                            </div>
                            <div className="date">
                                <div className="circle grey"></div>
                                <div className="two">
                                    <div className="date-text">{trade.returnsDate}</div>
                                    <div className="date-text1">Expected returns payment</div>
                                    <div className="description">Following successful shipping and distribution, the expected date for returns payment
                                        to be processed and paid to stakeholders.</div>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
                <div className="divpri">
                    <div className="tradeprice">
                        <p className='trade'>Trade price</p>
                        <h2>RS <span className='price'>{trade.price}</span></h2>

                        <Progressproperties bgcolor="#ff3c00" progress="65" height="10px" width='20vw' left='50%' />
                        <p className='text-danger clock'><i class="fa-regular fa-clock"></i> {remainingDays} days left</p>
                    </div>
                    <div className="detailsoftrade">
                        <div className='detailsoftrade1 mt-4'>
                            <p className="mb-2">Expected Return:<strong >{trade.returnPercentage}%</strong></p>
                            <p className="mb-2">Expected Shipping Date: <strong >{trade.shippingDate}</strong></p>
                            <p className="mb-2">Expected Reaching Date: <strong >{trade.reaching}</strong></p>
                            <p className="mb-2">Expected Returns Date: <strong >{trade.returnsDate}</strong></p>
                        </div>
                    </div>
                    <span className='inputcart'>
                        <div className="alldiv">
                            <div className="indianflag">
                                <CountryFlag className="flag-lg" countryCode="IN" svg />

                            </div>
                            <p>RS</p>
                            <input type="text" placeholder='Enter amount' />

                        </div>
                        <button onClick={handleAddCart}>Add to cart</button>
                    </span>
                </div>
            </div >
            <div className="views">
                <i class="fa-regular fa-star"></i>
                <p>5,064 people viewed this trade</p>
            </div>
        </div >
    );
}

export default Propertiesview;
