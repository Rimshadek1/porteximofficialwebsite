import React, { useEffect, useState } from 'react';
import './cartitemsdetails.css';
import ProgressBar from '../../Progressbar';
import { deleteCartOneItem, purchase, updateCartItemQuantity, viewCartTrades } from '../../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import { useWallet } from '../wallet/walletContext/WalletContext';
import { Link } from 'react-router-dom';

function Cartitemsdetails() {
    const [cart, setCart] = useState([]);
    const { balance } = useWallet();

    const fetchData = async () => {
        try {
            const response = await viewCartTrades();
            if (response && response.status === 200) {
                setCart(response.data.cartItems);
            } else {
                toast.error(response?.response?.data?.error || 'Error fetchings items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('An error occurred while fetching cart items');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleQuantityChange = async (itemId, productId, quantity, change) => {
        try {
            const data = { itemId, productId, quantity, change }
            const response = await updateCartItemQuantity(data); // Implement your API function for updating quantity
            if (response && response.status === 200) {
                // Update local state to reflect the changes
                setCart(prevCart => {
                    const updatedCart = prevCart.map(item => {
                        if (item._id === itemId && item.product._id === productId) {
                            // Update the quantity of the specific item
                            const updatedQuantity = Math.max(1, item.quantity + change);
                            return { ...item, quantity: updatedQuantity };
                        }
                        return item;
                    });
                    return updatedCart;
                });

                // Successfully updated quantity
                console.log('Quantity updated successfully');
            } else {
                toast.error(response?.response?.data?.error || 'Error updating quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('An error occurred while updating quantity');
        }
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice += (item.product.price / item.product.shares) * item.quantity;
        });
        return totalPrice.toFixed(2);
    };

    const handleDeleteOnetrade = async (cartId, tradeId) => {
        try {
            const response = await deleteCartOneItem({ cartId, tradeId });
            if (response.status === 200) {
                toast.success('Item deleted successfully');
                fetchData();
            } else {
                toast.error(response.response.data.error);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('An error occurred while deleting the item');
        }
    };
    const calculateFundedPercentage = (item) => {
        const percentage = item.product.shares !== 0 ? ((item.product.shares - item.product.sharesavailable) / item.product.shares) * 100 : 0;
        return percentage.toFixed(2);
    };
    const handleSubmit = async () => {
        // Initialize an array to store items for payment
        const itemsForPayment = [];
        const itemIds = [];
        // Iterate through each item in the cart
        cart.forEach(item => {
            // Extract relevant information
            const { _id: itemId, product: { _id: productId }, quantity } = item;
            itemIds.push(itemId);
            // Push the extracted information to the array
            itemsForPayment.push({ productId, quantity });
        });
        if (calculateTotalPrice() <= balance) {
            const data = {
                totalPrice: calculateTotalPrice(),
                items: itemsForPayment,
                itemIds: itemIds
            }
            const response = await purchase(data);
            if (response.status === 200) {
                toast.success('item added to your portfolio');
                fetchData();
            } else {
                toast.error(response.error)
            }
        } else {
            toast.error('insufficent fund in wallet')
        }
    }

    return (
        <div className='fullcartitemdetail'>
            <div className="upper">
                <h1 className="left">Cart</h1>
                <Link
                    className={`right but`} to='/itemtoexport'>
                    {'Add more'}
                </Link>
            </div>
            <div className="fullcartitemdetails">
                <div className='cartitems'>
                    {cart && cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div className="cartitem" key={index}>
                                <div className="first">
                                    {/* Add your image source here */}
                                    <img src={item.product.image1 ? `data:image;base64,${item.product.image1.toString('base64')}` : ''} alt="tradeitem" />
                                    <button onClick={() => handleDeleteOnetrade(item._id, item.product._id)}>Remove</button>
                                </div>
                                <div className="second">
                                    <h6>{item.product.trade}</h6>
                                    <div className='income'>
                                        <p className='inc'>Total shares available</p>
                                        <p className='pr'>{item.product.sharesavailable}/{item.product.shares}</p>
                                    </div>
                                    <div className="appreciation">
                                        <p className='inc'>Expected Returns</p>
                                        <p className='pr'>{item.product.returnPercentage} %</p>
                                    </div>
                                </div>
                                <div className="third">
                                    <div className="thirdtotal">
                                        <div className='amountofcart'>
                                            <i className="fa-solid fa-minus" onClick={() => handleQuantityChange(item._id, item.product._id, item.quantity, -1)}></i>
                                            <p>{item.quantity}</p>
                                            <i className="fa-solid fa-plus" onClick={() => handleQuantityChange(item._id, item.product._id, item.quantity, 1)}></i>
                                        </div>
                                        <div className="fundedicon">
                                            <ProgressBar bgcolor="#ff3c00" progress={calculateFundedPercentage(item)} height="5px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='noitems'>No items in the cart</p>
                    )}
                </div>
                <div className="carttotal">
                    <div className="carttotals">
                        <h6>Total:-  <span className='rights'>{calculateTotalPrice()}</span></h6>
                        <button onClick={handleSubmit}>proceed to payment</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    );
}

export default Cartitemsdetails;
