import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Rating } from "react-simple-star-rating";
import { toast, ToastContainer } from "react-toastify";
import "./ReviewCard.css";

export default function ReviewCard({
  review,
  removeReview,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const [rvUser, setRvUser] = useState();
  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  useEffect(() => {
    if (review) {
      axios.get(`http://localhost:9090/users/${review.User}`).then((result) => {
        setRvUser(result.data);
      });
    } else {
      return;
    }
  }, [review]);

  const deleteReview = (rvId) => {
    try {
      if (userToken) {
        axios.delete(`http://localhost:9090/products/reviews/${rvId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        removeReview(rvId);
      } else {
        return;
      }
      toast.success("Überprüfung erfolgreich gelöscht", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Die Bewertung kann derzeit nicht gelöscht werden", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editedRating, setEditedRating] = useState(5);
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditedRating = (rate) => {
    setEditedRating(rate);
  };

  return (
    <div className="review-card row d-flex justify-content-sm-between justify-content-center align-items-center px-3 py-2 col-lg-5 col-12">
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
      <div className="review-card-user-info col-sm-3 col-6 d-flex flex-column justify-content-center align-items-center">
        <img
          className="img-fluid personal-info-img rounded-circle img-thumbnail"
          alt="profile image"
          src={rvUser?.imageUrl ? rvUser.imageUrl[0] : ""}
        />
        <p className="personal-info-name mt-3 mb-0">
          {rvUser?.fname} {rvUser?.lname}
        </p>
      </div>
      <div className="review-card-content col-sm-8 col-12 d-flex flex-column">
        <p className="review-card-text text-light">{review.Description}</p>
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-7">
            <Rating
              readonly
              initialValue={review.Rating}
              allowFraction
              emptyColor="#f5f5f5"
              size={
                width > 992
                  ? 25
                  : width < 992 && width > 576
                  ? 50
                  : width < 576 && width > 425
                  ? 40
                  : 30
              }
            />
          </div>
          <button className="col-2 btn btn-link review-card-btn">
            <Trash
              color="gold"
              size={25}
              onClick={() => {
                deleteReview(review?._id);
              }}
            />
          </button>
          <button className="col-2 btn btn-link review-card-btn">
            <Pencil color="gold" size={25} onClick={handleShow} />
          </button>
        </div>
      </div>
      {/*  */}
      <Modal show={show} onHide={handleClose} centered>
        <Form
        // onSubmit={(e) => {
        //   addReview(productId, e);
        // }}
        >
          <Form.Group className="mb-3">
            <Form.Label className="text-light fs-4 fw-bold">
              Editiere deine Notiz
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Hinterlasse die neue Notiz hier"
              className="add-review-form-input"
              value={editedDescription}
              onChange={(e) => {
                setEditedDescription(e.target.value);
              }}
            />
          </Form.Group>
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-6">
              <Rating
                allowFraction
                initialValue={editedRating}
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
                onClick={handleEditedRating}
              />
            </div>
            <button
              type="submit"
              className="edit-rate-btn btn col-2 me-3"
              onClick={handleClose}
            >
              Speichern
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
