/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuMapPin } from "react-icons/lu";
import { RiEnglishInput } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import logo from "../assets/logo.png";
import india from "../assets/india.png";
import { amazonCategories } from "./data";
import { CLEAR_CART } from "../redux/reducer";
import './Header.css';

const Header = ({ name, setName, query, setQuery, setUseremail, call }) => {
  const { cartItems } = useSelector((store) => store.productCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast("Logged Out", {
          position: "bottom-right",
          autoClose: 1800,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setName(null);
        setUseremail(null);
        dispatch({ type: CLEAR_CART });
      })
      .catch((error) => {
        toast(error.message, {
          position: "bottom-right",
          autoClose: 1800,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const search = async () => {
    navigate("/productdisplay");
    await call();
  };

  return (
    <header className="bg-[rgb(19,25,33)] text-white md:sticky top-0 z-50">
      <div className="flex items-center justify-between p-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Amazon Logo" className="h-10" />
          <span className="hidden md:inline font-semibold">.in</span>
        </Link>

        {/* Location (only visible on large screens) */}
        <div className="hidden lg:flex items-center space-x-2">
          <LuMapPin className="text-white" />
          <div className="text-xs leading-tight">
            <p>Deliver to</p>
            <p className="font-bold">Jodhpur 342008</p>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar query={query} setQuery={setQuery} search={search} />

        {/* Language & Sign In / Logout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src={india} alt="India Flag" className="h-5" />
            <div className="flex items-center space-x-1">
              <RiEnglishInput className="text-xl" />
              <FaCaretDown />
            </div>
          </div>

          {name ? (
            <button onClick={handleSignOut} className="text-sm font-semibold">Logout</button>
          ) : (
            <Link to="/signin" className="text-sm font-semibold">Sign In</Link>
          )}
        </div>

        {/* User Account */}
        <Link to="/signin" className="hidden lg:flex flex-col items-center">
          <span className="text-xs">Hello, {user?.displayName || "sign in"}</span>
          <span className="font-bold flex items-center">
            Account & Lists
            <FaCaretDown className="ml-1" />
          </span>
        </Link>

        {/* Orders */}
        <Link to="/orders" className="hidden xl:flex flex-col items-center">
          <span className="text-xs">Returns</span>
          <span className="font-bold">Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative flex items-center">
          <FiShoppingCart className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute top-[-17px] right-[-5px] h-5 w-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden p-2">
        <SearchBar query={query} setQuery={setQuery} search={search} isMobile />
      </div>

      {/* Second Navigation */}
      <SecondNav />
    </header>
  );
};

const SearchBar = ({ query, setQuery, search, isMobile }) => (
  <div className={`flex items-center border-4 border-yellow-400 rounded-lg ${isMobile ? "w-full" : "hidden md:flex w-full lg:w-1/2 xl:w-1/2"} md:mx-2 mx-auto `}>
    <select className="h-10 text-black bg-gray-100 px-2 w-20 sm:w-auto">
      {amazonCategories.map((category, index) => (
        <option key={index} value={category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}>
          {category}
        </option>
      ))}
    </select>
    <input
      type="text"
      className="flex-grow h-10 px-2 text-black outline-none w-36 sm:w-full"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button onClick={search} className="h-10 px-4 bg-yellow-400">
      <IoSearch className="text-2xl text-white" />
    </button>
  </div>
);

const SecondNav = () => (
  <nav className="bg-[rgb(35,47,62)] text-white flex items-center justify-evenly overflow-x-auto py-2">
    {[
      { label: "All Products", link: "/product" },
      { label: "Laptops", link: "/product/laptops" },
      { label: "Mobiles", link: "/product/phones" },
      { label: "Electronics", link: "/product/electronics" },
      { label: "Home & Kitchen", link: "/product/homeandkitchen" },
      { label: "Phones", link: "/product/phones" },
      { label: "Fashion", link: "/product/fashion" },
      { label: "Car & Motorbike", link: "/product/carandmotorbike" },
      { label: "Today's Deal", link: "/product/todaysdeal" },
      { label: "Beauty Products", link: "/product/beautyproducts" },
      { label: "Amazon Pharmacy", link: "/product/amazonpharmacy" },
      { label: "Grocery", link: "/product/groceryandgourmetfood" },
      { label: "Handmade", link: "/product/handmade" },
      { label: "Games", link: "/product/videogame" },
    ].map(({ label, link }, index) => (
      <Link key={index} to={link} className="px-2 text-sm hover:border-white border-transparent border-b-2">
        {label}
      </Link>
    ))}
  </nav>
);

export default Header;
