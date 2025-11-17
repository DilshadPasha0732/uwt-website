import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import uwtlogo from "../../assets/uwtlogo.jpeg";

const Header = ({ isAuth }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={uwtlogo} alt="logo" srcSet="" className="imagelogo"/>
        <h1>United World tutors</h1>
        
      </div>
     

      <div className="link">
      <Link to={"/booktrail"} className="trailDemo">
        Book Trial Class
      </Link>

        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {isAuth ? (
          <Link to={"/account"}>Account</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
