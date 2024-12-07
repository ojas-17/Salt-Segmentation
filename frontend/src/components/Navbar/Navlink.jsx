import { Link } from "react-router-dom";

const NavLink = ({ 
    to, 
    className = "", 
    children, 
    ...props 
}) => {
  return (
    <li>
      <Link to={to} className={`no-underline block py-2 md:py-6 text-lg ${className}`} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;