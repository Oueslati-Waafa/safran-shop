import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Pen, Trash } from "react-bootstrap-icons";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "./ProductsDash.css";

export default function ProductsDashRow(props) {
  const [updatedCountInStock, setUpdatedCountInStock] = useState(
    props.product.countInStock
  );

  /* getting admin details */
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  /* delete product */
  const deleteProduct = async (productId) => {
    try {
      if (userToken) {
        // Show confirmation dialog before deleting the product
        const result = await Swal.fire({
          title: "Confirmation",
          text: "Are you sure you want to delete this product?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          reverseButtons: true,
          customClass: {
            confirmButton: "swal-confirm-button",
          },
        });

        // If the user confirms deletion, proceed with the delete operation
        if (result.isConfirmed) {
          await axios.delete(
            `https://safran.onrender.com/products/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          props.removeProduct(productId);
          props.setRefreshProducts(
            (prevRefreshProducts) => prevRefreshProducts + 1
          );

          toast.success("Product deleted successfully", {
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
      } else {
        return;
      }
    } catch (error) {
      toast.error("Error while deleting the product", {
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

  /* update a product */
  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        `https://safran.onrender.com/products/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success("Product updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return response.data;
    } catch (error) {
      toast.error("Error while updating the product", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      if (error.response) {
        // Request was made and server responded with a status code
        console.log(error.response.data); // Error message from the server
        console.log(error.response.status); // Status code
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request
        console.log("Error", error.message);
      }
      throw error; // Throw the error for the caller to handle
    }
  };

  const handleStockInputChange = async (e) => {
    const updatedStock = e.target.value;
    setUpdatedCountInStock(updatedStock);
    try {
      const updatedData = { countInStock: updatedStock };
      await updateProduct(props.product._id, updatedData);
      // Optionally, you can update the local state or perform other actions after successful update
    } catch (error) {
      // Handle any error that occurs during the update process
    }
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      description,
      price,
      weight,
      imageUrl: imgUrl,
    };
    try {
      await updateProduct(props.product._id, updatedData);
      // Optionally, you can update the local state or perform other actions after successful update
      props.updateProductData(props.product._id, updatedData);
      handleModalClose();
    } catch (error) {
      // Handle any error that occurs during the update process
    }
  };

  /* update other details modal */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const [name, setName] = useState(props.product.name);
  const [weight, setWeight] = useState(props.product.weight);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [stock, setStock] = useState(props.product.countInStock);
  const [imgUrl, setImgUrl] = useState(props.product.imageUrl);
  const productImageSources = [
    ["", ""],
    [
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
    ],
    [
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
    ],
  ];
  const [selectedImage, setSelectedImage] = useState(0);
  const handleImageChange = (event) => {
    const selected = event.target.value;
    setSelectedImage(selected);
    setImgUrl(productImageSources[selected]);
  };

  return (
    <>
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
      <tr key={props.index} className="ProductsDashRow">
        <td>{props.product.productNumber} </td>
        <td>
          <img
            src={props.product.imageUrl[0]}
            alt="product image"
            className="product-img"
          />
        </td>
        <td>{props.product.weight} </td>
        <td colSpan={3}>{props.product.name} </td>
        <td>{props.product.price} </td>
        {/*  */}
        <td>
          <Form.Control
            type="number"
            min={0}
            value={updatedCountInStock}
            onChange={handleStockInputChange}
            className="stock-input"
          />
        </td>
        <td>
          <button className="btn btn link" onClick={handleModalOpen}>
            <Pen color="blue" />
          </button>
        </td>
        <td>
          <button
            className="btn btn link"
            onClick={() => {
              deleteProduct(props.product._id);
            }}
          >
            <Trash color="red" />
          </button>
        </td>
      </tr>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isModalOpen}
        onHide={handleModalClose}
      >
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleProductUpdate(e);
            }}
            className="add_prod_form"
          >
            <div className="row row-cols-md-2 row-cols-1">
              <Form.Group className="col">
                <Form.Label>Product name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Super Negin Safranfäden"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>Product weight:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1g / 100g / 1kg ..."
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </div>
            <Form.Group className="col">
              <Form.Label>Product description:</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={3}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="col">
              <Form.Label>Product price:</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
              />
            </Form.Group>
            <div className="row d-flex justify-content-center mt-3">
              <div className="col-12">
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Light weight"
                    name="imageSelection"
                    value={1}
                    checked={
                      JSON.stringify(productImageSources[1]) ===
                      JSON.stringify(imgUrl)
                    }
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Heavy weight"
                    name="imageSelection"
                    value={2}
                    checked={
                      JSON.stringify(productImageSources[2]) ===
                      JSON.stringify(imgUrl)
                    }
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </div>
              <div className="col-4">
                <img
                  className="img-fluid"
                  alt="product image"
                  src={imgUrl[0]}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn footer-btn float-end mt-3 w-25"
            >
              Save
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
