import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ArrowClockwise,
  BookmarkHeart,
  BookmarkHeartFill,
} from "react-bootstrap-icons";
import axios from "axios";
import { Form } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import { toast, ToastContainer } from "react-toastify";

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
  const [refreshProduct, setRefreshProduct] = useState(0);

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
  }, [refreshProduct, productId]);

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

  const [prodInCart, setProdInCart] = useState();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item._id == currentProduct?._id
    );
    setProdInCart(existingProduct);
  }, [currentProduct]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === productId);
    setProdInCart(existingProduct);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { ...currentProduct, quantity: 1 };
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

  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  const [likedProducts, setLikedProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9090/users/wishlist", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          savedUser: user,
        },
      })
      .then((result) => {
        setLikedProducts(result.data.wishlist);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likedProducts.length === 0 || productId === null) {
      return;
    }
    if (likedProducts.some((item) => item._id === productId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [productId, likedProducts]);

  const [loadingLike, setLoadingLike] = useState(true);

  useEffect(() => {
    setLoadingLike(true);
    setTimeout(() => {
      setLoadingLike(false);
    }, 2000);
  }, [productId]);

  const handleToggleLike = (productId) => {
    if (likedProducts.some((item) => item._id === productId)) {
      // Object with matching id found in likedProducts
      fetch(`http://localhost:9090/users/wishlist/delete/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(user),
      })
        .then(() => {
          setLikedProducts((prevWishlist) =>
            prevWishlist.filter((item) => item._id !== productId)
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
          body: JSON.stringify(user),
        },
      })
        .then(() => {
          setLikedProducts((prevWishlist) => [
            ...prevWishlist,
            { _id: productId },
          ]);
          setLiked(true);
        })
        .catch((error) => console.log(error));
    }
  };

  /* product review section */

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:9090/products/${productId}/reviews`)
        .then((result) => {
          setReviews(result.data.reviews);
        });
    } else {
      return;
    }
  }, [productId]);

  const addReview = async (pId, e) => {
    e.preventDefault();

    if (!userToken) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9090/products/${pId}/reviews`,
        {
          rating: rating,
          description: description,
          savedUser: user,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setReviews((prevReviews) => [...prevReviews, response.data.review]);
      setRating(5);
      setDescription("");
      setRefreshProduct(refreshProduct + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const removeReview = (rvId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== rvId)
    );
  };

  const changeReview = (id, newRv) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review._id === id) {
          return newRv;
        }
        return review;
      })
    );
  };

  // console.log(currentProduct.countInStock);

  return (
    <main className="mt-5 py-5 container product-page">
      {currentProduct ? (
        <div className="row">
          <div className="col-md-5 col-12 mb-md-0 mb-5">
            {loadingLike ? (
              <ArrowClockwise
                className="product-page-like-icon"
                size={
                  width > 992
                    ? 40
                    : width < 992 && width > 576
                    ? 35
                    : width < 576 && width > 425
                    ? 40
                    : 30
                }
                color="#f5f5f5"
                onClick={() => {
                  handleToggleLike(productId);
                }}
              />
            ) : liked === true ? (
              <BookmarkHeartFill
                className="product-page-like-icon"
                size={
                  width > 992
                    ? 40
                    : width < 992 && width > 576
                    ? 35
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
                className="product-page-like-icon"
                size={
                  width > 992
                    ? 40
                    : width < 992 && width > 576
                    ? 35
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
                  initialValue={currentProduct.rating}
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
            <div className="w-100 row d-flex justify-content-between align-items-center">
              <div className="col-3">
                <p
                  className={`text-dark fw-bold fs-4 mb-0 ${
                    currentProduct.countInStock === 0 ? "d-none" : null
                  }`}
                >
                  {currentProduct.countInStock}Pcs
                </p>
              </div>
              <button
                className="btn product-page-btn col-8"
                onClick={handleAddToCart}
                disabled={
                  currentProduct.countInStock === 0 ||
                  currentProduct.countInStock == prodInCart?.quantity ||
                  user.length === 0
                    ? true
                    : false
                }
              >
                {currentProduct.countInStock === 0
                  ? "Nicht vorrätig"
                  : "In den Warenkorb"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Loading ..."
      )}
      <Title content={"Das könnte Ihnen auch gefallen"} />
      <Products products={mightLike} />
      <Title content={"Produkthinweise"} />
      <section className="container reviews-section">
        <div className="add-review-box row d-flex justify-content-between align-items-center">
          <div className="user-info col-lg-3 col-12 d-flex flex-column justify-content-center align-items-center">
            <img
              className="img-fluid personal-info-img rounded-circle img-thumbnail"
              alt="profile image"
              src={user?.img}
            />
            <p className="personal-info-name mt-3">
              {user?.fname} {user?.lname}
            </p>
          </div>
          <div className="add-review-form col-lg-8 col-12">
            <Form
              onSubmit={(e) => {
                addReview(productId, e);
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label className="text-light fs-4 fw-bold">
                  Notiz
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Hinterlasse hier eine Notiz"
                  className="add-review-form-input"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-6">
                  <Rating
                    allowFraction
                    initialValue={5}
                    emptyColor="#f5f5f5"
                    size={
                      width > 992
                        ? 40
                        : width < 992 && width > 576
                        ? 50
                        : width < 576 && width > 425
                        ? 40
                        : 30
                    }
                    onClick={handleRating}
                  />
                </div>
                <button type="submit" className="rate-btn btn col-2 me-3">
                  Absenden
                </button>
              </div>
            </Form>
            {reviews.length === 0 ? (
              <small className="text-light muted">
                Seien Sie der Erste, der diesem Produkt eine Bewertung gibt.
              </small>
            ) : null}
          </div>
        </div>
        <div className="reviews-divider"></div>
        <div className="reviews-container row d-lg-flex justify-content-lg-between">
          {reviews?.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              removeReview={removeReview}
              changeReview={changeReview}
              refreshProduct={refreshProduct}
              setRefreshProduct={setRefreshProduct}
            />
          ))}
        </div>
      </section>
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
    </main>
  );
}
