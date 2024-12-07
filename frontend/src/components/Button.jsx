import { Link } from "react-router-dom";

const Button = ({
  to,
  children,
  type = "button",
  className = "",
  linkClassName = "",
  ...props
}) => {
  const defaultButtonClassName = `py-2 px-6 font-semibold text-[#9e70eb] shadow-md transition-colors duration-300 appearance-none border border-[#9e70eb] rounded-[10rem] cursor-pointer hover:bg-[#9e70eb] hover:text-white ${className}`;

  return (
    <Link to={to} className={linkClassName}>
      <button type={type} className={defaultButtonClassName} {...props}>
        {children}
      </button>
    </Link>
  );
};

export default Button;