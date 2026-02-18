import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import ProductDetails from "./pages/ProductDetails";

function App() {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Add to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === product._id
      );

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

  // Decrease quantity
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

  // Remove item
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item._id !== productId
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total quantity for badge
  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  );

  return (
    <div className="app-wrapper">
      {/* Navbar */}
      <Navbar cartCount={totalItems} />

      {/* Main Content */}
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<Home onAddToCart={handleAddToCart} />}
          />

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
            element={
              <ProductDetails onAddToCart={handleAddToCart} />
            }
          />

          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
