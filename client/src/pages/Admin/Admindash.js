import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTrade, viewTrades } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import './Admindash.css'
function Admindash() {
    const [trade, setTrade] = useState([]);
    const navigate = useNavigate();
    const [zoomed, setZoomed] = useState(null);
    const [zoomed1, setZoomed1] = useState(null);
    const [zoomed2, setZoomed2] = useState(null);
    const [zoomed3, setZoomed3] = useState(null);
    const [zoomed4, setZoomed4] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewTrades();
                console.log('Response:', response);

                if (response.status === 200) {
                    const tradesArray = Array.isArray(response.data?.data) ? response.data.data : [response.data?.data];
                    setTrade(tradesArray);
                    navigate("/admindash");
                } else {
                    console.error('Error fetching trades:', response.data?.error);
                    toast.error(response.data?.error || 'Error fetching trades');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };


        fetchData();
    }, []);

    const handleDelete = async (id, event) => {
        try {
            event.preventDefault(); // Prevent the default form submission behavior

            // Assuming you have a deleteTrade function in your Apis.js
            const response = await deleteTrade(id);

            if (response.status === 200) {
                const response = await viewTrades();
                if (response.status === 200) {
                    const tradesArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                    setTrade(tradesArray);
                    navigate("/admindash");
                }
                console.log("Trade deleted successfully");
            } else {
                toast.error(response.response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleImageClick = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed === userId) {
            setZoomed(null); // Zoom out
        } else {
            setZoomed(userId); // Zoom in
        }
    };
    const handleImageClick1 = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed1 === userId) {
            setZoomed1(null); // Zoom out
        } else {
            setZoomed1(userId); // Zoom in
        }
    };
    const handleImageClick2 = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed2 === userId) {
            setZoomed2(null); // Zoom out
        } else {
            setZoomed2(userId); // Zoom in
        }
    };
    const handleImageClick3 = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed3 === userId) {
            setZoomed3(null); // Zoom out
        } else {
            setZoomed3(userId); // Zoom in
        }
    };
    const handleImageClick4 = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed4 === userId) {
            setZoomed4(null); // Zoom out
        } else {
            setZoomed4(userId); // Zoom in
        }
    };
    console.log(trade);
    return (
        <div>
            <section>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <Link to="/addtrade" className="btn btn-primary ml-auto">
                                Add trade
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/withdrawaccept" className="btn btn-secondary ml-auto">
                                Withdraws
                            </Link>
                        </div>
                    </div>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Location</th>
                                <th scope="col">Trade name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Returns</th>
                                <th scope="col">Dates</th>
                                <th scope="col">images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(trade) && trade.length > 0 ? (
                                trade.map((trade, index) => (
                                    <tr key={trade._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{trade.locationfrom} to {trade.locationto}</td>
                                        <td>{trade.trade}</td>
                                        <td>{trade.price}</td>
                                        <td>{trade.returnPercentage}</td>
                                        <td>
                                            {` Shipping: ${trade.shippingDate}, Reaching: ${trade.reaching}, Returns: ${trade.returnsDate}`}
                                        </td>
                                        <td>
                                            {trade.image1 && <img alt={`Images ${index + 1}`} onClick={() => handleImageClick(trade._id)} src={`data:image;base64,${trade.image1.toString('base64')}`} className={`img-preview ${zoomed === trade._id ? 'zoom-image zoomed' : ''}`} />}
                                            {trade.image2 && <img alt={`Images ${index + 2}`} onClick={() => handleImageClick1(trade._id)} src={`data:image;base64,${trade.image2.toString('base64')}`} className={`img-preview ${zoomed1 === trade._id ? 'zoom-image zoomed' : ''}`} />}
                                            {trade.image3 && <img alt={`Images ${index + 3}`} onClick={() => handleImageClick2(trade._id)} src={`data:image;base64,${trade.image3.toString('base64')}`} className={`img-preview ${zoomed2 === trade._id ? 'zoom-image zoomed' : ''}`} />}
                                            {trade.image4 && <img alt={`Images ${index + 4}`} onClick={() => handleImageClick3(trade._id)} src={`data:image;base64,${trade.image4.toString('base64')}`} className={`img-preview ${zoomed3 === trade._id ? 'zoom-image zoomed' : ''}`} />}
                                            {trade.image5 && <img alt={`Images ${index + 5}`} onClick={() => handleImageClick4(trade._id)} src={`data:image;base64,${trade.image5.toString('base64')}`} className={`img-preview ${zoomed4 === trade._id ? 'zoom-image zoomed' : ''}`} />}
                                        </td>
                                        <td>
                                            <Link to={`/edittrade/${trade._id}`} className="btn btn-primary">
                                                Edit
                                            </Link>
                                            &nbsp;&nbsp;
                                            <button
                                                className="btn btn-danger"
                                                onClick={(event) => handleDelete(trade._id, event)}
                                            >
                                                Delete
                                            </button>
                                            &nbsp;&nbsp;
                                            <Link
                                                to={`/addprofit/${trade._id}`}
                                                className="btn btn-success"
                                            >
                                                Add profit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No trades available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <button className='btn btn-danger'>Logout</button>
                </div>
            </section >
            <ToastContainer />
        </div >
    );
}

export default Admindash;
