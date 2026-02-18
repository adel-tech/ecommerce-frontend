import axios from "axios";

function Cart({ cart, onDecrease, onRemove, total }) {
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-zh5i.onrender.com/api/stripe/create-checkout-session",
        { cartItems: cart }
      );

      // 🔥 Redirect directly using Stripe session URL
      window.location.href = data.url;

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to redirect to checkout. Try again.");
    }
  };

  return (
  <div className="cart-container">
    <h2 className="cart-title">Your Cart</h2>

    {cart.length === 0 && (
      <p className="empty-text">Your cart is empty</p>
    )}

    {cart.map((item) => (
      <div key={item._id} className="cart-item">
        
        <div className="item-info">
          <h4>{item.name}</h4>
          <p>₹{item.price} × {item.quantity}</p>
        </div>

        <div className="cart-actions">
          <button
            className="btn btn-ghost"
            onClick={() => onDecrease(item._id)}
          >
            −
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => onRemove(item._id)}
          >
            Remove
          </button>
        </div>

      </div>
    ))}

    {cart.length > 0 && (
      <div className="cart-summary">
        <h3>Total: ₹{total}</h3>

        <button
          className="btn btn-primary checkout-btn"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    )}
  </div>
);
}

export default Cart;
