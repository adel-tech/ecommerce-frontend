function Cart({ cart, onDecrease, onRemove, total }) {
  return (
    <div>
      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item._id}>
          {item.name} - ₹{item.price} × {item.quantity}
          <button onClick={() => onDecrease(item._id)}> - </button>
          <button onClick={() => onRemove(item._id)}> Remove </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
