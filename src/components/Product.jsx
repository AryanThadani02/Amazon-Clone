/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { productObject, allproducts } from "../components/data.js";
import isPrime from "../assets/HomeCarousel/isPrime.png";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../redux/reducer";
import { toast, Bounce } from 'react-toastify';
import Sidebar from "./Sidebar.jsx";
import { useParams } from "react-router-dom";

function Product() {
  const { selectedPage } = useParams();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products per page
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.productCart);

  useEffect(() => {
    if (selectedPage) {
      setSortedProducts([...productObject[selectedPage]]);
    } else {
      setSortedProducts([...allproducts]);
    }
  }, [selectedPage]);

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
        sortedArray = selectedPage ? [...productObject[selectedPage]] : [...allproducts];
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
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Max number of page buttons to display
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

    let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbers);

    if (currentPage <= halfMaxPageNumbers) {
      endPage = Math.min(totalPages, maxPageNumbers);
    }

    if (currentPage + halfMaxPageNumbers >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          1
        </button>,
        <span key="start-ellipsis" className="px-4 py-2">...</span>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="end-ellipsis" className="px-4 py-2">...</span>,
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col xl:flex-row overflow-x-auto">
      <Sidebar onSortChange={handleSortChange} />
      <div className="flex flex-col items-center gap-5 py-10 w-full">
        {currentProducts.map((product) => (
          <div key={product.asin} className="flex flex-col md:flex-row items-center w-full md:w-4/5 xl:w-[800px] bg-[rgb(247,247,247)] p-5 rounded-lg shadow-lg">
            <div className="flex-shrink-0 w-full md:w-1/3 xl:w-[280px] flex justify-center items-center pt-7 relative">
              <img
                src={product.product_photo}
                alt="product image"
                className="w-[98%] h-[50%] min-h-[50%] min-w-[177px] xl:h-[217px] xl:w-[177px] duration-500 hover:scale-105 mb-5"
              />
              <span
                className={` ${!product.is_amazon_choice ? "hidden" : ""} text-white bg-[rgb(0,47,54)] absolute top-0 left-0 px-3 text-md`}
              >
                Amazon's <span className="text-orange-400"><i>Choice</i></span>
              </span>
            </div>
            <div className="flex flex-col justify-between px-6 gap-2 w-full md:w-2/3">
              <h1 className="font-bold w-full">{product.product_title}</h1>
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
                /> 
                <span className="text-blue-500">{product.product_num_ratings}</span>
              </span>
              <span className="text-[rgb(86,89,89)] text-md">{product.sales_volume}</span>
              <span className="flex gap-2 items-center">
                <span className="text-xl">{product.product_price}</span>
                <span className="text-[rgb(86,89,89)] text-sm">
                  M.R.P: <s>{product.product_original_price}</s>
                </span>
              </span>
              <span className={`${product.is_prime ? "" : "hidden"} `}>
                <img width="50px" height="15px" src={isPrime} alt="" />
              </span>
              <div className="pt-5 flex justify-between items-center w-full">
                {
                  product?.addedtocart 
                  ? (
                    <span className="flex items-center gap-3">
                      <span className="rounded-full w-[30px] h-[30px] bg-sky-500 text-white font-semibold flex justify-center items-center hover:cursor-pointer pb-1">-</span>
                      <span className="w-[30px] h-[30px] flex justify-center items-center border border-black rounded-sm bg-[rgb(247,247,247)] text-black">{product?.quantity ? product.quantity : "0"}</span>
                      <span className="rounded-full w-[30px] h-[30px] bg-sky-500 text-white font-semibold flex justify-center items-center hover:cursor-pointer pb-1">+</span>
                    </span>
                  ) : (
                    <button onClick={() => handleAddToCart(product)} className="cursor-pointer w-[150px] brightness-100 transition-all bg-yellow-500 text-white px-6 py-2 rounded-lg border-yellow-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                      Add to cart
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
