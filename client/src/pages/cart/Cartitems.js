import React from 'react'
import Cartitemscart from '../../Components/CartSide/Cartitemscart'
import Cartitemsdetails from '../../Components/cart/cartitems/Cartitemsdetails'
import CartCartup from '../../Components/CartUp/CartCartup'

function Cartitems() {
    return (
        <div>
            <Cartitemscart />
            <CartCartup />
            <Cartitemsdetails />
        </div>
    )
}

export default Cartitems