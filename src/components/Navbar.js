import React, { useState} from "react";
import { userCart } from "../context/CartContext";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const { cart } = userCart();

    const handleClick = () => setClick(!click);
}
