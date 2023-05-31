import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import axios from "axios";

export default function ProductPage() {
  const [productId, setProductId] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/");
    setProductId(parts[2]);
  }, [location]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/products/getAll").then((result) => {
      setProducts(result.data);
      console.log(products);
    });
  }, [productId]);

  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:9090/products/${productId}`)
        .then((result) => {
          setCurrentProduct(result.data);
        });
    } else {
      return;
    }
  }, [productId]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mightLike, setMightLike] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    function getRandomItems(arr, count) {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    setMightLike(getRandomItems(products, 4));
  }, [products]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.productNumber === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { ...currentProduct, quantity: 1 };
      cart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const userToken = savedUser.token;

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

  const [liked, setLiked] = useState(false);

  const handleToggleLike = (productId) => {
    if (likedProducts.some((item) => item.id === productId)) {
      // Object with matching id found in likedProducts
      fetch(`http://localhost:9090/users/wishlist/delete/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(savedUser),
      })
        .then(() => {
          setLikedProducts((prevWishlist) =>
            prevWishlist.filter((item) => item.id !== productId)
          );
          setLiked(false);
        })
        .catch((error) => console.log(error));
    } else {
      // Object with matching id not found in likedProducts
      fetch(`http://localhost:9090/users/wishlist/add/${productId}`, {
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
            { id: productId },
          ]);
          setLiked(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="mt-5 py-5 container product-page">
      {currentProduct ? (
        <div className="row">
          <div className="col-md-5 col-12 mb-md-0 mb-5">
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
                  handleToggleLike(productId);
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
                  handleToggleLike(productId);
                }}
              />
            )}
            <div
              className="product-page-img-cont"
              onMouseEnter={() => setHoveredIndex(productId)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <LazyLoadImage
                effect="blur"
                src={
                  hoveredIndex === productId
                    ? currentProduct.imageUrl[1]
                    : currentProduct.imageUrl[0]
                }
                alt="product-image"
                className="img-fluid product-page-img"
              />
            </div>
          </div>
          <div className="col-md-7 col-12 d-flex align-items-center flex-column justify-content-between">
            <div className="product-page-caption d-flex align-items-center w-100 h-100 flex-column">
              <h4>
                {currentProduct.weight} - {currentProduct.name}
              </h4>
              <div className="d-flex justify-content-between w-100 product-page-rate">
                <Rating
                  initialValue={currentProduct.rate}
                  readonly
                  allowFraction
                  size={
                    width < 576
                      ? 25
                      : width > 576 && width < 768
                      ? 30
                      : width > 768 && width < 992
                      ? 35
                      : 45
                  }
                />
                <h3>{currentProduct.price}£</h3>
              </div>
              <p>{currentProduct.description}</p>
            </div>
            <div className="w-100">
              <button
                className="btn product-page-btn float-end"
                onClick={handleAddToCart}
              >
                In den Warenkorb
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Loading ..."
      )}
      <Title content={"Das könnte Ihnen auch gefallen"} />
      <Products products={mightLike} />
    </main>
  );
}
