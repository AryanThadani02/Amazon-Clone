/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/HomeCarousel/amazonin.svg";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOutletContext } from "react-router-dom";
import { auth } from "./firebase";
import { myContext } from "./Context";

export function SignIn() {
  const navigate = useNavigate();
  
  const [name, setName] = useOutletContext();
  const [userEmail, setUseremail] = useContext(myContext);

  useEffect(() => {
    if (userEmail) {
      console.log(userEmail);
      navigate('/');
    }
  }, [userEmail, navigate]);
  
  const handleToast = () => {
    toast("hello", {
      position: "bottom-right",
      autoClose: 1800,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUseremail(user.email);
        toast("Logged in Successfully!", {
          position: "bottom-right",
          autoClose: 1800,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setName(user.displayName);
        navigate(-1);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage, {
          position: "bottom-right",
          autoClose: 1800,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <span className="h-[70px] flex items-center justify-center">
            <img
              onClick={() => handleToast()}
              src={logo}
              className="px-2 py-[2px] h-[95%] rounded-sm"
              alt="amazon logo"
            />
          </span>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
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
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
