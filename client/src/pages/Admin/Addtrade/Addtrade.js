import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { postTradeDetails } from '../../../services/Apis';

function Addtrade() {
    const [locationfrom, setLocationfrom] = useState()
    const [locationto, setLocationto] = useState()
    const [date, setDate] = useState()
    const [trade, setTrade] = useState()
    const [price, setPrice] = useState()
    const [returnPercentage, setReturnDate] = useState()
    const [shippingDate, setShippingDate] = useState()
    const [reaching, setReaching] = useState()
    const [returnsDate, setReturnsDate] = useState()
    const [fundClosing, setFundClosing] = useState()
    const [overview, setOverview] = useState()
    const [shares, setShares] = useState()
    const [sharesAvailable, setSharesAvailable] = useState()
    const navigate = useNavigate();
    const [images, setImages] = useState([null, null, null, null, null]);
    // Image size limit in kilobytes (KB)
    const imageSizeLimitKB = 200;

    const handleImageChange = (index) => (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileSize = file.size;
            const fileSizeInKB = fileSize / 1024;

            if (fileSizeInKB <= imageSizeLimitKB) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const newImages = [...images];
                    newImages[index] = reader.result;
                    setImages(newImages);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Image size must be 200 KB or less. Please compress your image.');
                e.target.value = null;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any form field is empty
        const anyFieldEmpty =
            locationfrom === "" ||
            locationto === "" ||
            date === "" ||
            trade === "" ||
            price === "" ||
            returnPercentage === "" ||
            shippingDate === "" ||
            reaching === "" ||
            overview === "" ||
            shares === "" ||
            sharesAvailable === "" ||
            fundClosing === "" ||
            returnsDate === "";

        if (anyFieldEmpty) {
            toast.error("Fill in all form fields!");
        } else {
            // Proceed with form submission or further processing
            const data = new FormData();
            data.append('locationfrom', locationfrom);
            data.append('locationto', locationto);
            data.append('date', date);
            data.append('trade', trade);
            data.append('price', price);
            data.append('returnPercentage', returnPercentage);
            data.append('shippingDate', shippingDate);
            data.append('reaching', reaching);
            data.append('returnsDate', returnsDate);
            data.append('fundClosing', fundClosing);
            data.append('overview', overview);
            data.append('shares', shares);
            data.append('sharesavailable', sharesAvailable);
            // Append each image to the FormData
            images.forEach((image, index) => {
                if (image) {
                    data.append(`image${index + 1}`, image);
                }
            });

            try {
                const response = await postTradeDetails(data);

                if (response.status === 200) {
                    navigate("/admindash");
                } else {
                    toast.error(response?.response?.data?.error || "Error posting trade details");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error posting trade details");
            }
        }
    };





    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <form onSubmit={handleSubmit}>
                        <legend>Add Trade</legend>

                        <div className="form-group mt-4">
                            <label htmlFor="locationfrom">Location from</label>
                            <input
                                type="text"
                                className="form-control"
                                name="locationfrom"
                                id="locationfrom"
                                placeholder="Location from"
                                required
                                onChange={(e) => setLocationfrom(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="locationto">Location to</label>
                            <input
                                type="text"
                                className="form-control"
                                name="locationto"
                                id="locationto"
                                required
                                placeholder="location to"
                                onChange={(e) => setLocationto(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                id="date"
                                required
                                placeholder="Date of work"
                                onChange={(e) => setDate(e.target.value)}

                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="event">Trade name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="trade"
                                placeholder="trade"
                                id="trade"
                                required
                                onChange={(e) => setTrade(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="event">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                placeholder="Price"
                                id="price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Return">Expected Return percentage:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Return"
                                id="Return"
                                required
                                placeholder="Percentage of Return"
                                pattern="^[0-9]{1,2}(\.[0-9]{1,2})?$"
                                title="Please enter a valid percentage (e.g., 10 or 10.5)"
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Ship">Expected Shipping Date: </label>
                            <input
                                type="date"
                                className="form-control"
                                name="ship"
                                id="ship"
                                required
                                placeholder="Date of ship"
                                onChange={(e) => setShippingDate(e.target.value)}

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Reaching">Expected Reaching Date: </label>
                            <input
                                type="date"
                                className="form-control"
                                name="Reaching"
                                placeholder="Reaching"
                                id="slotReachingmain"
                                required
                                onChange={(e) => setReaching(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Reaching">Expected Returns Date: </label>
                            <input
                                type="date"
                                className="form-control"
                                name="ReturnsDate"
                                placeholder="ReturnsDate"
                                id="ReturnsDate"
                                required
                                onChange={(e) => setReturnsDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Returns Date">Expected funding closing date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="ReturnsDate"
                                placeholder="Returns Date"
                                id="ReturnsDate"
                                required
                                onChange={(e) => setFundClosing(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Overview">Trade Overview</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Overview"
                                placeholder="Overview"
                                id="Overview"
                                required
                                onChange={(e) => setOverview(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="shares">Total Shares</label>
                            <input
                                type="number"
                                className="form-control"
                                name="shares"
                                placeholder="shares"
                                id="shares"
                                required
                                onChange={(e) => setShares(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="sharesavailable">Shares Available</label>
                            <input
                                type="number"
                                className="form-control"
                                name="sharesavailable"
                                placeholder="sharesavailable"
                                id="sharesavailable"
                                required
                                onChange={(e) => setSharesAvailable(e.target.value)}
                            />
                        </div>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div key={index} className="form-group basic">
                                <div className="input-wrapper">
                                    <label className="label" htmlFor={`image${index}`}>
                                        {`Photo${index} (size below 200 kb only accepted)`}
                                    </label>
                                    <input
                                        type="file"
                                        required
                                        className="form-control"
                                        id={`image${index}`}
                                        autoComplete="off"
                                        placeholder={`Your Profile Picture ${index}`}
                                        name={`image${index}`}
                                        onChange={handleImageChange(index - 1)}
                                        accept=".jpg, .png"
                                    />
                                </div>
                                {images[index - 1] && (
                                    <img
                                        alt={`Add your profile please ${index}`}
                                        width="200px"
                                        height="200px"
                                        src={images[index - 1]}
                                    />
                                )}
                            </div>
                        ))}



                        <button type="submit" className="btn btn-primary mt-2">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Addtrade