import React from "react";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { useCartActions } from "../Providers/CartProvider";
import { products } from "./../my-data";
import "./Home.css";

function HomePage() {
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    toast.success(`${product.name} added to cart!`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="product-list">
          {products.map((product) => {
            return (
              <div className="product-card font-face-light" key={product.id}>
                <div className="product-card__img-conatiner">
                  <img src={product.image} />
                </div>
                <div className="product-card__detail">
                  <h2 className="product-card__title">{product.name}</h2>
                  <h3 className="product-card__price">${product.price}</h3>
                  <h3 className="product-card__offprice">
                    ${product.offPrice}
                  </h3>
                </div>
                <button
                  onClick={() => addProductHandler(product)}
                  className="product-card__button"
                >
                  ADD TO CART
                </button>
              </div>
            );
          })}
        </section>
      </main>
    </Layout>
  );
}

export default HomePage;
