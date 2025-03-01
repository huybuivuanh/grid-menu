import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Font Menu</h1>
        <ul className="flex space-x-10">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/grid-50" className="text-gray-300 hover:text-white">
              Grid 50
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/grid-300" className="text-gray-300 hover:text-white">
              Grid 300
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/grid-500" className="text-gray-300 hover:text-white">
              Grid 500
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/grid-1000" className="text-gray-300 hover:text-white">
              Grid 1000
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/dropdown-50" className="text-gray-300 hover:text-white">
              Dropdown 50
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/dropdown-300" className="text-gray-300 hover:text-white">
              Dropdown 300
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link to="/dropdown-500" className="text-gray-300 hover:text-white">
              Dropdown 500
            </Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link
              to="/dropdown-1000"
              className="text-gray-300 hover:text-white"
            >
              Dropdown 1000
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
