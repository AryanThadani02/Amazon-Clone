/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import logo from "../assets/HomeCarousel/amazonin.svg";
import { Link } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';
import { myContext } from "./Context";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const [userEmail, setUseremail] = useContext(myContext);

  if (userEmail !== null) {
    navigate('/');
  }

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUseremail(user.email);
        toast.success("Account Created Successfully!", {
          position: "bottom-right",
          theme: "colored",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "bottom-right",
          theme: "colored",
        });
      });
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-12">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <span className="h-[70px] flex items-center justify-center">
              <img
                src={logo}
                className="px-2 py-[2px] h-[95%] rounded-sm"
                alt="amazon logo"
              />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <div className="mt-8 space-y-5">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
