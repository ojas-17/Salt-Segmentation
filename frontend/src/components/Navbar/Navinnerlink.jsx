import React from "react";
import { Link } from "react-router-dom";

const NavinnerLink = ({ to, className = "", children, ...props }) => {
  return (
    <li>
      <Link
        to={to}
        className={`no-underline py-6 flex justify-between items-center p-4 min-w-[15rem] rounded-md text-black hover:bg-black hover:text-white ${className}`}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavinnerLink;