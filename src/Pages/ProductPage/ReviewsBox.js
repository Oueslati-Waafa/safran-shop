import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import ReviewCard from "./ReviewCard";
import "./ReviewsBox.css";

export default function ReviewsBox({
  productId,
  refreshProduct,
  setRefreshProduct,
}) {
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

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

  return (
    <main className="container reviews-section">
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
              <Form.Label className="text-light fs-4 fw-bold">Notiz</Form.Label>
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
          />
        ))}
      </div>
    </main>
  );
}
