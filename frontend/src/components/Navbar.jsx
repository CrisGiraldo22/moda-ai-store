import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Moda AI Store</div>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>

        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Products
        </NavLink>

        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;