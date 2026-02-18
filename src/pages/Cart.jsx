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
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Segoe UI, sans-serif" }}>
      <h2>Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <p>
            {item.name} - ₹{item.price} × {item.quantity}
          </p>

          <button
            onClick={() => onDecrease(item._id)}
            style={{ marginRight: "10px" }}
          >
            -
          </button>

          <button
            onClick={() => onRemove(item._id)}
            style={{ marginRight: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout} style={checkoutButtonStyle}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

const checkoutButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#6772e5",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "15px",
  fontSize: "16px",
};

export default Cart;
