/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADD_TO_CART } from "../redux/reducer";
import ReactStars from "react-rating-stars-component";
import { useOutletContext } from "react-router-dom";
import isPrime from "../assets/HomeCarousel/isPrime.png";
import { useDispatch } from "react-redux";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

function ProductDisplay() {
  const [
    name,
    setName,
    query,
    setQuery,
    searchresult,
    setSearchresult,
    id,
    setId,
  ] = useOutletContext();
  const dispatch = useDispatch();

  const [sortedProducts, setSortedProducts] = useState([]);
  
  useEffect(() => {
    setSortedProducts([...searchresult]);
  }, [searchresult]);

  const handleSortChange = (sortOption) => {
    let sortedArray = [...sortedProducts];
    switch (sortOption) {
      case 'priceLowToHigh':
        sortedArray.sort((a, b) => {
          const priceA = a.product_price ? parseFloat(a.product_price.replace(/[^0-9.-]+/g, "")) : 0;
          const priceB = b.product_price ? parseFloat(b.product_price.replace(/[^0-9.-]+/g, "")) : 0;
          return priceA - priceB;
        });
        break;
      case 'priceHighToLow':
        sortedArray.sort((a, b) => {
          const priceA = a.product_price ? parseFloat(a.product_price.replace(/[^0-9.-]+/g, "")) : 0;
          const priceB = b.product_price ? parseFloat(b.product_price.replace(/[^0-9.-]+/g, "")) : 0;
          return priceB - priceA;
        });
        break;
      default:
        sortedArray = [...searchresult];
        break;
    }
    setSortedProducts(sortedArray);
  };

  const handleAddToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    toast.success("Product Added to cart!", {
      position: "bottom-right",
      theme: "colored",
    });
    console.log(product);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <Sidebar onSortChange={handleSortChange} />
      {sortedProducts?.length === 0 ? (
         searchresult?.length === 0 ? (
          <div className="text-center text-black text-2xl h-[50vh] flex justify-center items-center">
            <p>No data available </p>
          </div>
        ) :
        <div className="text-center text-black text-2xl h-[50vh] flex justify-center items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5 py-10">
          {sortedProducts?.map((product) => (
            <div key={product.asin} className="flex flex-col md:flex-row items-center bg-[rgb(247,247,247)] p-5 rounded-lg shadow-lg">
              <div className="w-full md:w-[280px] flex justify-center relative mb-4 md:mb-0">
                <img
                  src={product.product_photo}
                  alt="product image"
                  className="h-[217px] w-[177px] object-contain"
                />
                <span
                  className={` ${!product.is_amazon_choice ? "hidden" : ""} text-white bg-[rgb(0,47,54)] absolute top-0 left-0 px-3 text-md`}
                >
                  Amazon&apos;s <span className="text-orange-400"><i>Choice</i></span>
                </span>
              </div>
              <div className="flex flex-col px-6 gap-2 w-full md:w-auto">
                <h1 className="font-bold text-lg md:text-xl">{product.product_title}</h1>
                <span className="flex items-center gap-2">
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={product.product_star_rating}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="rgb(255,164,29)"
                    edit={false}
                  />{" "}
                  <span className="text-blue-500">
                    {product.product_num_ratings}
                  </span>
                </span>
                <span className="text-[rgb(86,89,89)] text-md">
                  {product.sales_volume}
                </span>
                <span className="flex gap-2 items-center">
                  <span className="text-xl">{product.product_price}</span>
                  <span className="text-[rgb(86,89,89)] text-sm">
                    M.R.P: <s>{product.product_original_price}</s>
                  </span>
                </span>
                <span className={`${product.is_prime ? "" : "hidden"} `}>
                  <img width="50px" height={"15px"} src={isPrime} alt="" />
                </span>
                <div className="h-[80px] pt-5">
                  {product?.addtocart ? (
                    <span className="flex items-center gap-3">
                      <span className="rounded-full w-[30px] h-[30px] bg-sky-500 text-white font-semibold flex justify-center items-center hover:cursor-pointer pb-1">
                        -
                      </span>
                      <span className="w-[30px] h-[30px] flex justify-center items-center border border-black rounded-sm bg-[rgb(247,247,247)] text-black">
                        {product?.quantity ? product.quantity : "0"}
                      </span>
                      <span className="rounded-full w-[30px] h-[30px] bg-sky-500 text-white font-semibold flex justify-center items-center hover:cursor-pointer pb-1">
                        +
                      </span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="cursor-pointer w-[150px] brightness-100 transition-all bg-yellow-500 text-white px-6 py-2 rounded-lg
                    border-yellow-600
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDisplay;
