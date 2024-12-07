import { useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import Button from "../Button";
import Logo from "../Logo";
import Navlink from "./Navlink";
import NavInnerLink from "./Navinnerlink";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center mx-auto w-full py-4 px-4 md:w-[90%]">
        {/* Hamburger Icon - small screen*/}
        <button className="text-gray-500 block md:hidden" onClick={toggleMenu}>
          <img
            className="h-8 w-8"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+"
            alt="Open Menu"
          />
        </button>

        {/* Logo */}
        {/* --------------------------------------------------- */}
        <Logo to="/" className="md:mx-auto">
          <img src="" alt="X" className="h-8 md:h-12" />
        </Logo>

        <Button
          to="/login"
          linkClassName="md:hidden block"
          className="h-10 w-24 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Login
        </Button>
        {/* Full-Screen Overlay Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col md:flex-row items-center justify-between gap-10 transition-transform transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:relative md:bg-transparent`}
        >
          {/* Close Button (Visible in Overlay Mode) */}
          <button
            className="absolute top-4 left-4 text-gray-500 md:hidden"
            onClick={toggleMenu}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+"
              alt="Close Menu"
              className="h-8 w-8"
            />
          </button>
          <div></div>
          <div className=" md:block hidden "></div>

          {/* Navbar Content (Logo, Links, Post Button) */}
          <nav className="flex flex-col md:flex-row items-center md:gap-12 gap-8">
            {/* Logo for smaller screen*/}
            <Link href="/" className="md:hidden block">
              <img src="" alt="XXX" className="h-12" />
            </Link>

            <ul className="list-none p-0 m-0 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <Link to="/">Dashboard</Link>
              <Link to="/">Services</Link>
              <Link to="/">What's New</Link>
              <Link to="/">About</Link>
            </ul>
          </nav>

          {/* Post Button */}
          <Button
            to="/login"
            className="block h-10 w-24 bg-blue-400 text-white rounded-lg hover:bg-blue-600 border-none"
          >
            Login
          </Button>
          <div className="block md:hidden"></div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-gray-100 md:block hidden shadow-xl"></div>
    </>
  );
}

export default Navbar;