const db = require('../Config/connection')
var collection = require('../Config/collection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const jwtsecret = process.env.JWTSECRET;
const mongoUrl = process.env.mongoUrl;
const razorpayKey = process.env.RazorpaySecret;
require("dotenv").config();
const { ObjectId } = require('mongodb');
const Razorpay = require('razorpay');
const { log } = require('console');
var instance = new Razorpay({
    key_id: 'rzp_test_u6AqTKt0lLlp8S',
    key_secret: razorpayKey,
});

// Create a transporter using Hostinger SMTP settings
const tarnsporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Check Hostinger's documentation for the correct SMTP host
    port: 465, // Standard SMTP port
    secure: true, // Set to true if you're using a secure connection (SSL/TLS)
    auth: {
        user: 'info@portexim.in', // Your email address hosted on Hostinger
        pass: 'Risasi@123', // Your email password
    },
    connectionTimeout: 10000,
});


exports.userregister = async (req, res) => {
    const userDetails = req.body;

    if (!userDetails.fname || !userDetails.email || !userDetails.password || !userDetails.otp) {
        res.status(400).json({ error: "Please Enter All Input Data" });
    }

    try {
        const presuer = await db.get().collection(collection.userCollection).findOne({ email: userDetails.email });

        if (presuer) {
            res.status(409).json({ error: "This User Already Exists in our database" });
        } else {
            const isEmail = await db.get().collection(collection.otpCollection).findOne({ email: userDetails.email })
            if (isEmail) {

                const otpVerification = await db.get().collection(collection.otpCollection).findOne({ otp: parseInt(userDetails.otp) })
                if (otpVerification) {
                    userDetails.password = await bcrypt.hash(userDetails.password, 10);

                    // Check if the email is 'info@portexim.in'
                    const role = userDetails.email === 'info@portexim.in' ? 'admin' : 'unVerifiedUser';

                    const userDetailss = {
                        fname: userDetails.fname,
                        email: userDetails.email,
                        password: userDetails.password,
                        role: role, // Set the role based on the email
                    }

                    const data = await db.get()
                        .collection(collection.userCollection)
                        .insertOne(userDetailss);

                    res.status(200).json({ storeData: data.insertedId });
                } else {
                    res.status(409).json({ error: "Wrong otp" });
                }
            } else {
                res.status(409).json({ error: "otp is invalid" });
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error", error });
    }
};




// user send otp
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await db.get().collection(collection.userCollection).findOne({ email: email });

        if (!presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await db.get().collection(collection.otpCollection).findOne({ email: email });


            if (existEmail) {


                const updateData = await db.get().collection(collection.otpCollection).findOneAndUpdate(
                    { _id: existEmail._id },
                    { $set: { otp: OTP } },
                    { returnOriginal: false }
                );



                // const mailOptions = {
                //     from: process.env.EMAIL,
                //     to: email,
                //     subject: "Sending Eamil For Otp Validation",
                //     text: `OTP:- ${OTP}`
                // }
                // Define the email message
                const mailOptions = {
                    from: 'info@portexim.in', // Sender's email address
                    to: email, // Recipient's email address
                    subject: 'OTP Verification for Portexim Ventures Pvt Ltd',
                    html: `
    <p>Dear User,</p>
    <p>Thank you for choosing Portexim Ventures Pvt Ltd. Please use the following OTP to verify your email address:</p>
    <h3>OTP: ${OTP}</h3>
    <p>This OTP is valid for a short period. Do not share it with anyone for security reasons.</p>
    <p>If you did not request this OTP, please ignore this email.</p>
    <p>Best Regards,<br>Portexim Ventures Pvt Ltd Team</p>
  `,
                };



                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            } else {
                userDetails = {
                    email,
                    otp: OTP
                }
                const data = await db.get()
                    .collection(collection.otpCollection)
                    .insertOne(userDetails);
                // const mailOptions = {
                //     from: process.env.EMAIL,
                //     to: email,
                //     subject: "Sending Eamil For Otp Validation",
                //     text: `OTP:- ${OTP}`
                // }
                // Define the email message
                const mailOptions = {
                    from: 'info@portexim.in', // Sender's email address
                    to: email, // Recipient's email address
                    subject: 'OTP Verification for Portexim Ventures Pvt Ltd',
                    html: `
    <p>Dear User,</p>
    <p>Thank you for choosing Portexim Ventures Pvt Ltd. Please use the following OTP to verify your email address:</p>
    <h3>OTP: ${OTP}</h3>
    <p>This OTP is valid for a short period. Do not share it with anyone for security reasons.</p>
    <p>If you did not request this OTP, please ignore this email.</p>
    <p>Best Regards,<br>Portexim Ventures Pvt Ltd Team</p>
  `,
                };


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        } else {
            res.status(400).json({ error: "Email already registered" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(400).json({ error: "Please Enter Your password and email" });
        return;
    }

    try {
        const preuser = await db.get().collection(collection.userCollection).findOne({ email: email });

        if (preuser) {
            // Check if the entered password matches the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, preuser.password);

            if (passwordMatch) {
                jwt.sign({
                    email: preuser.email,
                    id: preuser._id,
                    role: preuser.role,
                }, jwtsecret, {}, (err, token) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: "Error generating token" });
                        return;
                    }
                    res.cookie('token', token, { sameSite: 'none', secure: true });

                    res.status(200).json({ message: "User Login Successfully Done", token, role: preuser.role });
                });
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error", error });
    }
};


exports.sendverification = async (req, res) => {
    try {
        // Check if req.cookies is defined
        if (!req.cookies) {
            res.status(401).json({ error: 'Unauthorized: Missing cookie' });
            return;
        }

        // Extract user ID from the JWT token
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ error: 'Unauthorized: Missing token' });
            return;
        }

        jwt.verify(token, jwtsecret, (err, decoded) => {
            try {
                if (err) {
                    res.status(401).json({ error: 'Unauthorized: Invalid token' });
                    return;
                }

                const proofFrontBase64 = req.body.proofFront;
                const proofBackBase64 = req.body.proofBack;
                const proofFrontBuffer = Buffer.from(proofFrontBase64.split(',')[1], 'base64');
                const proofBackBuffer = Buffer.from(proofBackBase64.split(',')[1], 'base64');

                const veri = {
                    userId: decoded.id, // Include user ID in verification data
                    AdhaarFront: proofFrontBuffer,
                    AdhaarBack: proofBackBuffer,
                    bankAccountNumber: req.body.bankAccountNumber,
                    ifscCode: req.body.ifscCode,
                }

                db.get().collection(collection.verifyPhotoCollection).insertOne(veri);

                res.status(200).json({ message: 'Verification submitted successfully!' });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'An error occurred during verification' });
            }
        });
    } catch (error) {
        console.error('Error in sendverification:', error);
        res.status(500).json({ error: 'An error occurred during verification' });
    }
};
exports.userLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
exports.getTradeDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await db.get().collection(collection.tradeCollection).findOne({ _id: new ObjectId(id) });
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.addToCart = async (req, res) => {
    try {
        // Extract userId from cookies
        const token = req.cookies.token;
        jwt.verify(token, jwtsecret, (err, decoded) => {
            const userId = decoded.id;
            let proObj = {
                item: new ObjectId(req.body.tradeId),
                quantity: 1,
            };

            return new Promise(async (resolve, reject) => {
                try {
                    const userCart = await db.get().collection(collection.cartCollection).findOne({ user: new ObjectId(userId) });
                    if (userCart) {
                        let proExist = userCart.products.findIndex(product => product.item.equals(new ObjectId(req.body.tradeId)));
                        if (proExist !== -1) {
                            db.get().collection(collection.cartCollection)
                                .updateOne(
                                    { user: new ObjectId(userId), 'products.item': new ObjectId(req.body.tradeId) },
                                    {
                                        $inc: { 'products.$.quantity': 1 },
                                    }
                                )
                                .then(() => {
                                    res.status(200).json({ status: 'Item added to cart successfully' });
                                    resolve();
                                });
                        } else {
                            // If user's cart already exists, add the new product id to the existing array
                            db.get().collection(collection.cartCollection)
                                .updateOne(
                                    { user: new ObjectId(userId) },
                                    { $push: { products: proObj } }
                                )
                                .then(() => {
                                    res.status(200).json({ status: 'Item added to cart successfully' });
                                    resolve();
                                });
                        }
                    } else {
                        // If user's cart doesn't exist, create a new cart object with a single array for products
                        const cartObj = {
                            user: new ObjectId(userId),
                            products: [proObj]
                        };
                        db.get().collection(collection.cartCollection)
                            .insertOne(cartObj)
                            .then(() => {
                                res.status(200).json({ status: 'Item added to cart successfully' });
                                resolve();
                            });
                    }
                } catch (error) {
                    res.status(500).json({ error: "Internal Server Error" });
                    reject(error);
                }
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.getCartProducts = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const userId = decoded.id;

            try {
                let cartItems = await db.get().collection(collection.cartCollection).aggregate([
                    {
                        $match: { user: new ObjectId(userId) }
                    }, {
                        $unwind: '$products'
                    }, {
                        $lookup: {
                            from: collection.tradeCollection,
                            localField: 'products.item',
                            foreignField: '_id',
                            as: 'product'
                        }
                    }, {
                        $addFields: {
                            item: '$products.item',
                            quantity: '$products.quantity',
                            product: { $arrayElemAt: ['$product', 0] }
                        }
                    }, {
                        $addFields: {
                            'product.price': { $toInt: '$product.price' },
                            'product.shares': { $toInt: '$product.shares' },
                            'product.sharesavailable': { $toInt: '$product.sharesavailable' }
                        }
                    }, {
                        $project: {
                            item: 1,
                            quantity: 1,
                            product: 1
                        }
                    }
                ]).toArray();
                res.status(200).json({ cartItems });
            } catch (error) {
                console.error('Error fetching cart items:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.changeProductQuantity = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const userId = decoded.id;

            const { itemId, productId, quantity, change } = req.body;

            // Convert change and quantity to integers
            const intChange = parseInt(change);

            try {
                // Fetch the current cart item
                const cartItem = await db.get().collection(collection.cartCollection).findOne({
                    user: new ObjectId(userId),
                    _id: new ObjectId(itemId)
                });

                if (!cartItem) {
                    return res.status(404).json({ error: 'Cart item not found' });
                }

                // Calculate the new quantity based on the change
                const productToUpdate = cartItem.products.find(item => item.item.equals(new ObjectId(productId)));

                if (!productToUpdate) {
                    return res.status(404).json({ error: 'Product not found in cart item' });
                }

                const newQuantity = productToUpdate.quantity + intChange;

                // Ensure the new quantity doesn't go below 1
                const finalQuantity = Math.max(1, newQuantity);

                // Update the cart item quantity in the database
                const result = await db.get().collection(collection.cartCollection).updateOne(
                    { user: new ObjectId(userId), 'products.item': new ObjectId(productId) },
                    { $set: { 'products.$.quantity': finalQuantity } }
                );

                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Product quantity updated successfully' });
                } else {
                    res.status(404).json({ error: 'Cart item must be minimum' });
                }
            } catch (error) {
                console.error('Error updating product quantity:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deletecartoneitem = async (req, res) => {
    const details = req.body;

    try {
        const response = await db.get().collection(collection.cartCollection)
            .updateOne(
                { _id: new ObjectId(details.cartId) },
                { $pull: { products: { item: new ObjectId(details.tradeId) } } }
            );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Cart item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Cart item or trade not found' });
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.postRequestAddMoney = async (req, res) => {
    const token = req.cookies.token;
    const status = 'rejected';
    jwt.verify(token, jwtsecret, async (err, decoded) => {
        if (err) {
            // Handle token verification error
            console.error('Token verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const userId = decoded.id;
        const amount = req.body.amount;

        // Check if amount is not empty
        if (!amount || amount.trim() === "") {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const order = {
            userId: new ObjectId(userId),
            amount: amount,
            status: status,
            type: 'Deposit',
            date: new Date(),
        };

        try {
            const response = await db.get().collection(collection.orderedCollection).insertOne(order);

            // Call generateRazorpay function here
            await generateRazorpay(res, response.insertedId, amount);

        } catch (error) {
            console.error('Error inserting order:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

const generateRazorpay = (res, orderId, amount) => {
    try {
        if (!amount) {
            return res.status(400).json({ error: 'Amount is required.' });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: '' + orderId
        };

        instance.orders.create(options, function (err, order) {
            if (err) {
                console.error('Error generating Razorpay order:', err);
                return res.status(500).json({ error: 'Error generating Razorpay order' });
            } else {
                return res.json(order);
            }
        });
    } catch (error) {
        console.error('Error in generateRazorpay:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.verifyPayment = async (req, res) => {
    const crypto = require('crypto');
    let hmac = crypto.createHmac('sha256', razorpayKey);

    try {
        const responseDetails = req.body.res; // Use a different variable name
        hmac.update(responseDetails.razorpay_order_id + '|' + responseDetails.razorpay_payment_id);
        const calculatedSignature = hmac.digest('hex');
        if (calculatedSignature === responseDetails.razorpay_signature) {
            const orderIdFromReceipt = req.body.order.receipt;
            const finded = await db.get().collection(collection.orderedCollection).findOne({
                _id: new ObjectId(orderIdFromReceipt)
            });
            if (finded) {
                const finds = {
                    _id: finded._id,
                    userId: finded.userId,
                    amount: finded.amount,
                    status: 'placed',
                    type: finded.type,
                    date: finded.date,
                }
                const deposit = await db.get().collection(collection.depositCollection).insertOne(finds)
                if (deposit.insertedId) {
                    await db.get().collection(collection.orderedCollection).deleteOne({
                        _id: new ObjectId(orderIdFromReceipt)
                    });
                    res.status(200).json({ status: 'Payment success' });
                } else {
                    res.status(400).json({ status: 'Payment failed: Invalid signature' });
                }
            } else {
                res.status(400).json({ status: 'Payment failed: Invalid signature' });
            }
        } else {
            res.status(400).json({ status: 'Payment failed: Invalid signature' });
        }
    } catch (error) {
        console.error('Error in verifyPayment:', error);
        res.status(500).json({ status: 'Internal server error' });
    }
};
exports.withdrawRequest = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                throw err;
            } else {
                userId = decoded.id
                amount = req.body.amount
                request = 'pending'
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString();
                let withdraw = {
                    userId: userId,
                    amount: parseInt(amount),
                    request: request,
                    username: decoded.email,
                    type: 'Withdrawn Request',
                    date: formattedDate,

                }
                const withs = db.get().collection(collection.withdrawRequestCollection).insertOne(withdraw)
                if (withs) {
                    res.status(200).json({ result: withs.insertedId })
                } else {
                    res.status(400).json({ result: 'Payment request not accepted, Please check after sometime' })
                }
            }
        })
    } catch (error) {
        console.error('Error in verifyPayment:', error);
        res.status(500).json({ status: 'Internal server error' });
    }
};
exports.userTransactions = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                throw err;
            } else {
                const userId = decoded.id;

                const deposit = await db.get().collection(collection.orderedCollection).find({ userId: new ObjectId(userId) }).toArray();
                const deposited = await db.get().collection(collection.depositCollection).find({ userId: new ObjectId(userId) }).toArray();
                const withdrawRequest = await db.get().collection(collection.withdrawRequestCollection).find({ userId: userId }).toArray();
                const accepted = await db.get().collection(collection.transactionCollection).find({ userId: userId }).toArray();
                const purchased = await db.get().collection(collection.purchasedCollection).find({ userId: userId }).toArray();
                const allTransactions = [...deposit, ...withdrawRequest, ...accepted, ...deposited, ...purchased];

                const totalDepositedAmount = deposited.reduce((total, transaction) => {
                    return total + parseFloat(transaction.amount);
                }, 0);
                const totalWithdrawRequestAmount = withdrawRequest.reduce((total, transaction) => {
                    return total + parseFloat(transaction.amount);
                }, 0);
                const totalacceptedAmount = accepted.reduce((total, transaction) => {
                    return total + parseFloat(transaction.amount);
                }, 0);
                const totalpurchasedAmount = purchased.reduce((total, transaction) => {
                    return total + parseFloat(transaction.totalPrice);
                }, 0);
                const balance = totalDepositedAmount - totalWithdrawRequestAmount - totalacceptedAmount - totalpurchasedAmount;
                res.status(200).json({ transactions: allTransactions, balance });
            }
        });
    } catch (error) {
        console.error('Error in', error);
        res.status(500).json({ status: 'Internal server error' });
    }
};

exports.purchase = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                throw err;
            }
            else {
                const userId = decoded.id;
                const data = req.body;
                const itemsIds = data.itemIds.map(itemId => new ObjectId(itemId));
                const currentDate = new Date();
                const details = {
                    userId: userId,
                    totalPrice: parseFloat(data.totalPrice),
                    items: data.items,
                    date: currentDate,
                    status: 'done',
                    type: 'purchased',
                };

                const deleteCartOrder = await db.get().collection(collection.cartCollection).deleteMany({ _id: { $in: itemsIds } });
                if (deleteCartOrder.deletedCount > 0) {
                    const insertResult = await db.get().collection(collection.purchasedCollection).insertOne(details);
                    if (insertResult.insertedId) {
                        res.status(200).json({ status: 'success purchase' });
                    } else {
                        res.status(500).json({ status: 'Failed to insert purchase details' });
                    }
                }

            }
        });
    } catch (error) {
        console.error('Error in purchase:', error);
        res.status(500).json({ status: 'Internal server error' });
    }
};

exports.portfolioValue = async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, jwtsecret, async (err, decoded) => {
        if (err) {
            res.status(500).json({ error: "Failed to verify token" });
        } else {
            const userId = decoded.id;
            const purchases = await db.get().collection(collection.purchasedCollection)
                .find({ userId: userId })
                .toArray();

            let productsInfo = [];
            let totalProfit = 0;
            let profitRecords = [];

            for (const purchase of purchases) {
                const purchaseDate = purchase.date;

                for (const item of purchase.items) {
                    const product = await db.get().collection(collection.tradeCollection)
                        .findOne({ _id: new ObjectId(item.productId) });
                    if (product) { // Check if product exists
                        const singleShare = product.price / parseInt(product.shares);
                        const investmentAmount = singleShare * item.quantity;
                        const profitRecord = await db.get().collection(collection.profitCollection).findOne({
                            productId: item.productId
                        });
                        let singleShareProfit = 0;
                        if (profitRecord) {
                            const totalTradeProfit = parseInt(profitRecord.tradeProfit);
                            singleShareProfit = totalTradeProfit / parseInt(product.shares);
                            profitRecords.push({
                                createdAt: profitRecord.createdAt,
                                productId: item.productId,
                                quantity: item.quantity,
                                totalProfit: singleShareProfit * item.quantity,
                                trade: product.trade,
                                investmentAmount: investmentAmount,
                                returnProfitPercentage: (profitRecord.tradeProfit / product.price) * 100
                            });
                        }

                        const itemProfit = singleShareProfit * item.quantity;

                        totalProfit += itemProfit;

                        productsInfo.push({
                            date: purchaseDate,
                            productId: item.productId,
                            quantity: item.quantity,
                            productName: product.trade,
                            productPrice: product.price,
                            returnPercentage: product.returnPercentage,
                            investmentAmount: investmentAmount,
                            profit: itemProfit
                        });
                    }
                }
            }

            const countTotalPurchases = (productsInfo) => {
                return productsInfo.length;
            };

            const calculateTotalSpent = (purchases) => {
                return purchases.reduce((total, purchase) => total + purchase.totalPrice, 0);
            };
            const totalSpent = calculateTotalSpent(purchases) + totalProfit;

            profitRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            productsInfo.sort((a, b) => new Date(b.date) - new Date(a.date));
            res.status(200).json({
                countTotalPurchases: countTotalPurchases(productsInfo),
                totalSpent,
                productsInfo,
                profitRecords
            });
        }
    });
};




























// exports.portfolioValue = async (req, res) => {
//     const token = req.cookies.token;
//     jwt.verify(token, jwtsecret, async (err, decoded) => {
//         if (err) {
//             res.status(500).json({ error: "Failed to verify token" });
//         } else {
//             const userId = decoded.id;
//             const purchases = await db.get().collection(collection.purchasedCollection)
//                 .find({ userId: userId })
//                 .toArray();

//             let productsInfo = [];
//             let totalProfit = 0;

//             for (const purchase of purchases) {
//                 const purchaseDate = purchase.date;

//                 for (const item of purchase.items) {
//                     const product = await db.get().collection(collection.tradeCollection)
//                         .findOne({ _id: new ObjectId(item.productId) });
//                     if (product) { // Check if product exists
//                         const singleShare = product.price / parseInt(product.shares);
//                         const investmentAmount = singleShare * item.quantity;
//                         const profitRecord = await db.get().collection(collection.profitCollection).findOne({
//                             productId: item.productId
//                         });
//                         let singleShareProfit = 0;
//                         if (profitRecord) {
//                             const totalTradeProfit = parseInt(profitRecord.tradeProfit);
//                             singleShareProfit = totalTradeProfit / parseInt(product.shares);
//                         }

//                         const itemProfit = singleShareProfit * item.quantity;

//                         totalProfit += itemProfit;

//                         productsInfo.push({
//                             date: purchaseDate,
//                             productId: item.productId,
//                             quantity: item.quantity,
//                             productName: product.trade,
//                             productPrice: product.price,
//                             returnPercentage: product.returnPercentage,
//                             investmentAmount: investmentAmount,
//                             profit: itemProfit
//                         });
//                     }
//                 }
//             }

//             const countTotalPurchases = (productsInfo) => {
//                 return productsInfo.length;
//             };

//             const calculateTotalSpent = (purchases) => {
//                 return purchases.reduce((total, purchase) => total + purchase.totalPrice, 0);
//             };
//             const totalSpent = calculateTotalSpent(purchases) + totalProfit;

//             productsInfo.sort((a, b) => new Date(b.date) - new Date(a.date));

//             res.status(200).json({ countTotalPurchases: countTotalPurchases(productsInfo), totalSpent, productsInfo });
//         }
//     });
// };






