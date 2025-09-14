import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <span>SpotNFix</span>
      </h1>
      <div className="header-buttons">
        <Link to="/login">
          <button className="btn btn">Resident Sign In</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-dark">Administrator Sign In</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
