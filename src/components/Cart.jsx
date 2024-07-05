/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, DECREMENT, REMOVE_ITEM } from "../redux/reducer";
import ReactStars from "react-rating-stars-component";
import isPrime from "../assets/HomeCarousel/isPrime.png";
import Payment from "./Payment";
import emptycart from '../assets/HomeCarousel/emptyCart.jpg';

function Cart({ name, setName }) {
  const [total, setTotal] = React.useState(0);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.productCart);

  const handleAddQuantity = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  const handleRemove = (product) => {
    dispatch(REMOVE_ITEM(product));
  };

  const handleReduceQuantity = (product) => {
    dispatch(DECREMENT(product));
  };

  useEffect(() => {
    const x = store.cartItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.product_price.replace(/[^0-9.-]+/g, ""));
    }, 0);
    setTotal(x);
  }, [store.cartItems]);

  return (
    <>
      <h1 className="text-black text-2xl font-semibold text-center">Shopping Cart</h1>
      <div className="flex flex-col items-center py-6 overflow-x-auto">
        {store?.cartItems?.length === 0 && <img src={emptycart} alt="cart" />}
        <div className="flex flex-col items-start gap-4 w-full max-w-[800px] mx-auto">
          {store?.cartItems?.map((product) => (
            <div key={product.asin} className="flex flex-col md:flex-row items-center bg-[rgb(247,247,247)] p-5 rounded-lg shadow-lg w-full">
              <div className="w-full md:w-1/3 xl:w-[280px] flex justify-center pt-7 relative">
                <img
                  src={product.product_photo}
                  alt="product image"
                  className="h-[217px] w-[177px] mb-5"
                />
                {product.is_amazon_choice && (
                  <span className="text-white bg-[rgb(0,47,54)] absolute top-0 left-0 px-3 text-md">
                    Amazon's <span className="text-orange-400"><i>Choice</i></span>
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-between px-6 gap-2 w-full md:w-2/3">
                <h1 className="font-bold">{product.product_title}</h1>
                <div className="flex items-center gap-2">
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
                </div>
                <span className="text-[rgb(86,89,89)] text-md">{product.sales_volume}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{product.product_price}</span>
                  <span className="text-[rgb(86,89,89)] text-sm">
                    M.R.P: <s>{product.product_original_price}</s>
                  </span>
                </div>
                {product.is_prime && (
                  <img width="50px" height="15px" src={isPrime} alt="Prime" />
                )}
                <div className="pt-5 md:flex justify-between items-center w-full mx-auto">
                  <div className="flex items-center gap-3">
                    <span 
                      onClick={() => handleReduceQuantity(product)}
                      className="rounded-full w-[30px] h-[30px] bg-sky-500 text-white font-semibold flex justify-center items-center hover:cursor-pointer pb-1 duration-500 hover:scale-125"
                    >
                      -
                    </span>
                    <span className="w-[30px] h-[30px] flex justify-center items-center border border-black rounded-sm bg-[rgb(247,247,247)] text-black">
                      {product?.quantity || 0}
                    </span>
                    <span 
                      onClick={() => handleAddQuantity(product)}
                      className="rounded-full w-[30px] h-[30px] bg-sky-500 text-white font-semibold flex justify-center items-center hover:cursor-pointer pb-1 duration-500 hover:scale-125"
                    >
                      +
                    </span>
                  </div>
                  <div 
                    onClick={() => handleRemove(product)}
                    className="text-red-400 duration-500 hover:scale-105 hover:cursor-pointer hover:text-red-600"
                  >
                    Remove
                  </div>
                  <span className="text-2xl font-semibold">
                    ₹ {product.quantity * parseFloat(product.product_price.replace(/[^0-9.-]+/g, ""))}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {total > 0 && (
            <div className="flex justify-between w-full text-2xl border-t-[1px] border-black mt-4">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>
          )}
        </div>
      </div>
      <div className={`${total > 0 ? "flex justify-center" : "hidden"}`}>
        <Payment total={total} />
      </div>
    </>
  );
}

export default Cart;
