// components/Header.jsx
import { Menu, X, LogOut } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
// import UserContext from "../context/UserContex";
// import { useContext } from "react";
function Header({ isMenuOpen, setIsMenuOpen }) {
  // const { user, logout } = useContext(UserContext);
  return (
    <div className=" bg-gray-100 sticky top-0 z-50">
      {/* Top Banner */}
      <div className=" text-white bg-red-600 flex justify-between items-center text-sm">
        <div className=" px-4 py-2">Enjoy the Beso while we fix your car</div>

        <div className="bg-gray-600 flex-1  px-4 py-2">
          Monday - Saturday 7:00AM - 6:00PM
        </div>
        <div className="bg-gray-600  px-4 py-2">Welcome Admin</div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className=" text-white px-3 py-1 rounded-l-full">
                  <Link to="/">
                    <img src={logo} alt="logo" className="" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                HOME
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                ABOUT US
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                SERVICES
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                CONTACT US
              </Link>
              <Link
                to="/admin"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                ADMIN
              </Link>
              <Link
                to="/login"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center"
              >
                {/* <LogOut className="w-4 h-4 mr-2" /> */}
                LOG OUT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
