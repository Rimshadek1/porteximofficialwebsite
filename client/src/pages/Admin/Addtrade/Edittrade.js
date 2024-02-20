import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { viewTradesEdit, updateTradeDetails } from "../../../services/Apis";

function Edittrade() {
    const { id } = useParams();
    const [values, setValues] = useState({
        locationfrom: "",
        locationto: "",
        date: "",
        trade: "",
        price: "",
        returnPercentage: "",
        shippingDate: "",
        reaching: "",
        returnsDate: "",
        fundClosing: "",
        overview: "",
        shares: "",
        sharesavailable: "",
        images: [null, null, null, null, null],
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await viewTradesEdit(id);



                if (response.status === 200) {

                    // Update the setValues call to include existing base64 images
                    setValues({
                        ...response.data?.data,
                        images: response.data?.data.images || [null, null, null, null, null],
                    });
                } else {
                    toast.error(response.response.data.error);
                    navigate("/admindash");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id, navigate]);




    const handleImageChange = (index) => (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValues((prevValues) => {
                    const newImages = [...prevValues.images];
                    newImages[index] = reader.result;
                    return { ...prevValues, images: newImages };
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = (index) => {
        setValues((prevValues) => {
            const newImages = [...prevValues.images];
            newImages[index] = null;
            return { ...prevValues, images: newImages };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Append other form data
        data.append('locationfrom', values.locationfrom);
        data.append('locationto', values.locationto);
        data.append('date', values.date);
        data.append('trade', values.trade);
        data.append('price', values.price);
        data.append('returnPercentage', values.returnPercentage);
        data.append('shippingDate', values.shippingDate);
        data.append('reaching', values.reaching);
        data.append('returnsDate', values.returnsDate);
        data.append('fundClosing', values.fundClosing);
        data.append('overview', values.overview);
        data.append('shares', values.shares);
        data.append('sharesavailable', values.sharesavailable);
        // Append each image to the FormData
        values.images.forEach((image, index) => {
            if (image) {
                // Append images as files
                data.append(`image${index + 1}`, image);
            }
        });

        // Submit the form data to the server
        try {
            const response = await updateTradeDetails(id, data);

            if (response.status === 200) {
                toast.success("Trade details updated successfully!");
                navigate("/admindash");
            } else {
                toast.error(response.response.data.error);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating trade details");
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <form onSubmit={handleSubmit}>
                        <legend>Edit Trade</legend>

                        <div className="form-group mt-4">
                            <label htmlFor="locationfrom">Location from</label>
                            <input
                                type="text"
                                className="form-control"
                                name="locationfrom"
                                id="locationfrom"
                                placeholder="Location from"
                                required
                                onChange={(e) =>
                                    setValues({ ...values, locationfrom: e.target.value })
                                }
                                value={values.locationfrom}
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
                                onChange={(e) =>
                                    setValues({ ...values, locationto: e.target.value })
                                }
                                value={values.locationto}
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
                                onChange={(e) => setValues({ ...values, date: e.target.value })}
                                value={values.date}
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
                                onChange={(e) => setValues({ ...values, trade: e.target.value })}
                                value={values.trade}
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
                                onChange={(e) => setValues({ ...values, price: e.target.value })}
                                value={values.price}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Return">Expected Return:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Return"
                                id="Return"
                                required
                                placeholder="Percentage of Return"
                                pattern="^[0-9]{1,2}(\.[0-9]{1,2})?$"
                                title="Please enter a valid percentage (e.g., 10 or 10.5)"
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        returnPercentage: e.target.value,
                                    })
                                }
                                value={values.returnPercentage}
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
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        shippingDate: e.target.value,
                                    })
                                }
                                value={values.shippingDate}
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
                                onChange={(e) =>
                                    setValues({ ...values, reaching: e.target.value })
                                }
                                value={values.reaching}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Returns Date">Expected Returns Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="ReturnsDate"
                                placeholder="Returns Date"
                                id="ReturnsDate"
                                required
                                onChange={(e) =>
                                    setValues({ ...values, returnsDate: e.target.value })
                                }
                                value={values.returnsDate}
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
                                onChange={(e) =>
                                    setValues({ ...values, fundClosing: e.target.value })}
                                value={values.fundClosing}
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
                                onChange={(e) =>
                                    setValues({ ...values, overview: e.target.value })}
                                value={values.overview}
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
                                onChange={(e) =>
                                    setValues({ ...values, shares: e.target.value })}
                                value={values.shares}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="shares">Shares Available</label>
                            <input
                                type="number"
                                className="form-control"
                                name="shares"
                                placeholder="shares"
                                id="shares"
                                required
                                onChange={(e) =>
                                    setValues({ ...values, sharesavailable: e.target.value })}
                                value={values.sharesavailable}
                            />
                        </div>
                        {values.images.map((base64Image, index) => (
                            <div key={index} className="form-group basic">
                                <div className="input-wrapper">
                                    <label className="label" htmlFor={`image${index}`}>
                                        {`Photo${index + 1} (size below 200 KB only accepted)`}
                                    </label>
                                    <input
                                        type="file"
                                        required
                                        className="form-control"
                                        id={`image${index}`}
                                        autoComplete="off"
                                        placeholder={`Your Profile Picture ${index + 1}`}
                                        name={`image${index}`}
                                        onChange={handleImageChange(index)}
                                        accept=".jpg, .png"
                                    />
                                </div>
                                {base64Image && (
                                    <>
                                        <button type="button" onClick={() => handleImageDelete(index)}>
                                            Delete Image
                                        </button>
                                        <img
                                            alt={`Images ${index + 1}`}
                                            width="200px"
                                            height="200px"
                                            src={base64Image}
                                        />
                                    </>
                                )}
                            </div>
                        ))}





                        <button type="submit" className="btn btn-primary mt-2">
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Edittrade;
