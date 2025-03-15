import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Font Menu</h1>
        <ul className="flex">
          {[
            { name: "Home", path: "/" },
            { name: "Grid 50", path: "/grid-50" },
            { name: "Grid 100", path: "/grid-100" },
            { name: "Grid 300", path: "/grid-300" },
            { name: "Grid 500", path: "/grid-500" },
            { name: "Dropdown 50", path: "/dropdown-50" },
            { name: "Dropdown 100", path: "/dropdown-100" },
            { name: "Dropdown 300", path: "/dropdown-300" },
            { name: "Dropdown 500", path: "/dropdown-500" },
          ].map((item) => (
            <li key={item.path} className="border-l border-gray-500">
              <Link
                to={item.path}
                className={`block px-6 py-3 rounded-md ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white font-bold"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
