import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <div className="brand">
          <Link 
            to="/" 
            className="brand-link"
            onClick={() => setIsOpen(false)}
          >
            Ecomm
          </Link>
        </div>

        {/* Hamburger */}
        <div 
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>

        <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
          <Link 
            to="/" 
            className="nav-item"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link 
            to="/cart" 
            className="nav-item cart-link"
            onClick={() => setIsOpen(false)}
          >
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
