import React, { useEffect } from "react";

function Success() {
    useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Payment Successful 🎉</h2>
      <p>Your order has been placed.</p>
    </div>
  );
}

export default Success;
