import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import axios from "axios";
import "./Products.css";
import { toast, ToastContainer } from "react-toastify";

export default function ProductCard({ product, index, refresh, setRefresh }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const [prodInCart, setProdInCart] = useState();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id == product._id);
    setProdInCart(existingProduct);
  }, [product]);

  const handleAddToCart2 = (prod) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id == prod._id);
    setProdInCart(existingProduct);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { ...prod, quantity: 1 };
      cart.push(newProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const userToken = savedUser?.token;

  const [likedProducts, setLikedProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://safran.onrender.com/users/wishlist", {
        headers: {
          Authorization: `Bearer ${userToken}`,
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

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likedProducts.some((item) => item._id === product._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [product, likedProducts]);

  const handleToggleLike = (productId) => {
    if (likedProducts.some((item) => item._id === productId)) {
      // Object with matching id found in likedProducts
      fetch(`https://safran.onrender.com/users/wishlist/delete/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(savedUser),
      })
        .then(() => {
          setLikedProducts((prevWishlist) =>
            prevWishlist.filter((item) => item._id !== productId)
          );
          setLiked(false);
          setRefresh(refresh + 1);
        })
        .catch((error) => console.log(error));
    } else {
      // Object with matching id not found in likedProducts
      fetch(`https://safran.onrender.com/users/wishlist/add/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
          body: JSON.stringify(savedUser),
        },
      })
        .then(() => {
          setLikedProducts((prevWishlist) => [
            ...prevWishlist,
            { _id: productId },
          ]);
          setLiked(true);
          setRefresh(refresh + 1);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="product-card mb-5" key={product.productNumber}>
      {liked ? (
        <BookmarkHeartFill
          className="product-like-icon"
          size={
            width > 992
              ? 40
              : width < 992 && width > 576
              ? 50
              : width < 576 && width > 425
              ? 40
              : 30
          }
          color="#f5f5f5"
          onClick={() => {
            handleToggleLike(product._id);
          }}
        />
      ) : (
        <BookmarkHeart
          className="product-like-icon"
          size={
            width > 992
              ? 40
              : width < 992 && width > 576
              ? 50
              : width < 576 && width > 425
              ? 40
              : 30
          }
          color="#f5f5f5"
          onClick={() => {
            handleToggleLike(product._id);
          }}
        />
      )}
      <div
        className="product-img-cont mb-5"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Link
          to={`/product/${product._id}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          <LazyLoadImage
            src={
              hoveredIndex === index ? product.imageUrl[1] : product.imageUrl[0]
            }
            alt="product"
            className="img-fluid product-img"
            effect="blur"
          />
        </Link>
      </div>
      <div className="product-caption d-flex align-items-center">
        <h4>
          {product.weight} -{" "}
          <Link
            to={`/product/${product._id}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            {product.name}
          </Link>
        </h4>
        <div className="d-flex justify-content-between w-100 product-rate-cont">
          <Rating
            initialValue={product.rating}
            readonly
            allowFraction
            size={width > 768 ? 35 : 20}
          />
          <h3>{product.price}£</h3>
        </div>
      </div>
      <button
        className="btn product-btn w-100"
        onClick={() => handleAddToCart2(product)}
        disabled={
          product.countInStock === 0 ||
          product.countInStock == prodInCart?.quantity ||
          savedUser === undefined ||
          savedUser === null
            ? true
            : false
        }
      >
        {product.countInStock === 0 ? "Nicht vorrätig" : "In den Warenkorb"}
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}
