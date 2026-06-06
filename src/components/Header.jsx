import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ADD_ROUTE, HOME_ROUTE, navMenu } from "../constants/routes";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-white fixed w-full z-20 top-0 inset-s-0 shadow">
      <div className="container flex flex-wrap max-w-4xl smx-auto items-center mx-auto justify-between p-4">
        <Link to={HOME_ROUTE}>
          <h1 className="text-yellow-600 text-3xl font-semibold">Reminders</h1>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to={ADD_ROUTE}
            className="text-white bg-orange-500 hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-sm mr-2 px-3 py-2 focus:outline-none"
          >
            Add Reminder
          </Link>
          <button
            type="button"
            className="text-3xl md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <span className="text-2xl">✕</span> : "≡"}
          </button>
        </div>
        <nav
          className={`md:static md:flex md:w-auto md:order-1 md:bg-transparent md:shadow-none md:rounded-none ${
            menuOpen
              ? "flex absolute right-4 top-full w-auto bg-gray-100 shadow-2xl"
              : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-5 md:p-0  font-medium border-amber-950 md:space-x-8 rtl:space-x-reverse md:flex-row ">
            {navMenu.map((menu, index) => {
              const active = location.pathname === menu.route;
              return (
                <li key={index} className={active ? "text-orange-500" : ""}>
                  <Link to={menu.route} onClick={() => setMenuOpen(false)}>
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
