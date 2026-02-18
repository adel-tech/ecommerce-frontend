function Cart({ cart, onDecrease, onRemove, total }) {
  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          {item.name} - ₹{item.price} × {item.quantity}

          <button
            onClick={() => onDecrease(item._id)}
            style={{ marginLeft: "10px" }}
          >
            -
          </button>

          <button
            onClick={() => onRemove(item._id)}
            style={{ marginLeft: "5px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
