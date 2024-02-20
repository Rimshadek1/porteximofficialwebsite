import React from 'react'
import CartSide from '../../Components/CartSide/CartSide'
import Itemsexit from '../../Components/cart/Itemsexit'
import CartUptrades from '../../Components/CartUp/CartUptrades'

function Exiteded() {
    return (
        <div>
            <CartSide />
            <CartUptrades />
            <Itemsexit />
        </div>
    )
}

export default Exiteded