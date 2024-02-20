import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";


export const registerfunction = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/register`, data)
}

export const sentOtpFunction = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/logincheck`, data)
}
export const sentVerification = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/sendverification`, data)
}

export const userVerify = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/login`, data)
}
export const addToCart = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/addtocart`, data)
}
export const viewOnlyOneTrade = async (id) => {
    return await commonrequest("GET", `${BACKEND_URL}/gettradedetail/${id}`)
}

export const deleteCartOneItem = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/deletecartoneitem`, data)
}
export const viewCartTrades = async () => {
    return await commonrequest("GET", `${BACKEND_URL}/getcartproducts`)
}
export const updateCartItemQuantity = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/change-product-quantity`, data);
}
export const postRequestAddMoney = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/postRequestAddMoney`, data);
}
export const verifyPayment = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/verifyPayment`, data);
}
export const withdrawRequest = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/withdrawRequest`, data);
}
export const userTransaction = async () => {
    return await commonrequest("GET", `${BACKEND_URL}/usertransaction`);
}
export const purchase = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/purchase`, data);
}
export const portfolioValue = async (data) => {
    return await commonrequest("GET", `${BACKEND_URL}/portfolioValue`, data);
}
export const getTradeDetailsProfit = async (data) => {
    return await commonrequest("GET", `${BACKEND_URL}/getTradeDetailsProfit`, data);
}




// adminphace
export const postTradeDetails = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/addtradedetails`, data)
}
// in apis.js
export const viewTrades = async (data) => {
    return await commonrequest("GET", `${BACKEND_URL}/gettradedetails`, data);
}
export const viewTradesFunded = async (data) => {
    return await commonrequest("GET", `${BACKEND_URL}/viewTradesFunded`, data);
}


export const viewTradesEdit = async (id) => {
    return await commonrequest("GET", `${BACKEND_URL}/gettradedetailsedit/${id}`);
};
export const updateTradeDetails = async (id, updatedData) => {
    return await commonrequest("POST", `${BACKEND_URL}/updatetradedetails/${id}`, updatedData);
};
export const getWithdrwalRequest = async () => {
    return await commonrequest("POST", `${BACKEND_URL}/getWithdrwalRequests`);
};
export const acceptWithdrawal = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/acceptWithdrawals`, data);
};
export const deleteWithdrawal = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/deleteWithdrawal`, data);
};
export const deleteTrade = async (id) => {
    return await commonrequest("DELETE", `${BACKEND_URL}/deletetradedetails/${id}`);
};
export const tradeProfit = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/tradeProfit`, data);
};
export const viewTradeProfit = async (id) => {
    return await commonrequest("GET", `${BACKEND_URL}/viewTradeProfit/${id}`);
};


export const Logout = async () => {
    return await commonrequest("POST", `${BACKEND_URL} / user / logout`)
}