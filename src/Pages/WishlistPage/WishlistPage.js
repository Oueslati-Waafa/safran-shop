import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "../../Components/Products/Products";
import Title from "../../Components/Title/Title";
import "./WishlistPage.css";

export default function WishlistPage() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [likedProducts, setLikedProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9090/users/wishlist", {
        headers: {
          Authorization: `Bearer ${savedUser.token}`,
        },
        params: {
          savedUser: savedUser,
        },
      })
      .then((result) => {
        setLikedProducts(result.data.wishlist);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <main className="wishlist-cont container mb-5">
      <h1 className="text-center fw-bold display-3 my-5">Wunschzettel</h1>
      <section className="products-cont-home">
        <Title content={"Gefällt mir Produkte"} />
        <Products products={likedProducts} />
      </section>
    </main>
  );
}
