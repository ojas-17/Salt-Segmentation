import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ width = "100px", linkClassName = "", imgClassName = "" }) => {
  return (
    <Link to="/" className={linkClassName}>
      <img src="" alt="Logo here" style={{ width: width }} className={imgClassName} />
    </Link>
  );
};

export default Logo;