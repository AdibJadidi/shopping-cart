import React from "react";
import { useCart, useCartActions } from "../Providers/CartProvider";
import Layout from "./../layout/Layout";
import { products } from "./../my-data";
import "./Home.css";
import "./Cart.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decHandler = (cartItem) => {
    dispatch({ type: "DECREMENT_PRODUCT", payload: cartItem });
  };
  const removeHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  if (!cart.length) {
    return (
      <Layout>
        <main className="container">
          <div className="empty-cart">
            <p>Card is empty</p>
            <Link to="/">go to shopping</Link>
          </div>
        </main>
      </Layout>
    );
  }
  return (
    <Layout>
      <main className="container ">
        <section className="cartItemList  ">
          {cart.map((item) => (
            <div className="cartItem " key={item.id}>
              <div className="cartItem__img-container">
                <img src={item.image} alt="" />
              </div>
              <div className="cartItem__detail ">
                <div>{item.name}</div>
                <div>${item.offPrice * item.quantity}</div>
              </div>
              <div className="control__quantity">
                <div onClick={() => decHandler(item)} class="minus-icon"></div>
                {/* <button onClick={() => decHandler(item)}>-</button> */}
                <span type="text">{item.quantity}</span>
                <div onClick={() => incHandler(item)} class="plus-icon"></div>
                {/* <button onClick={() => incHandler(item)}>+</button> */}
              </div>
              <div className="cartItem__off">
                <div>{(item.price - item.offPrice) * item.quantity} $ off</div>
              </div>
              <div className="cartItem__delete">
                <span
                  onClick={() => removeHandler(item)}
                  class="remove-icon"
                ></span>
                {/* <button onClick={() => removeHandler(item)}>X</button> */}
              </div>
            </div>
          ))}
        </section>
        <section className="cartSummary">
          <h2 className="cartSummary__title">Cart Summery</h2>
          <div className="cartSummary__item">
            <p>cart total</p>
            <p>{originalTotalPrice}$</p>
          </div>
          <div className="cartSummary__item">
            <p>cart discount</p>
            <p>{originalTotalPrice - total}$</p>
          </div>
          <div className="cartSummary__item net">
            <p>net price</p>
            <p>{total}$</p>
          </div>
          <Link to="/signup?redirect=checkout">
            <button>GO TO CHECKOUT</button>
          </Link>
        </section>
      </main>
    </Layout>
  );
}

export default CartPage;
