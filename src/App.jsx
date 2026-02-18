import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import ProductDetails from "./pages/ProductDetails";

function App() {
  // Load initial cart from localStorage if exists, else empty array
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

const handleAddToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity ?? 0) + 1 }
          : item
      );
    } else {
      updatedCart = [...prevCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};


  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* NAVBAR */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>
          Home
        </Link>

        
        {/* <Link to="/cart">Cart ({cart.length})</Link> */}
        <Link to="/cart">
          Cart ({cart.reduce((total, item) => total + (item.quantity ?? 0), 0)})
        </Link>


      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onDecrease={handleDecreaseQuantity}
              onRemove={handleRemoveFromCart}
              total={totalPrice}
            />
          }
        />
        <Route
    path="/products/:id"
    element={<ProductDetails onAddToCart={handleAddToCart} />}
  />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
