import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Modal, Table } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Title from "../../Components/Title/Title";
import ProductsDashRow from "./ProductsDashRow";

export default function ProductsDash(props) {
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://safran.onrender.com/products/getAll").then((result) => {
      setProducts(result.data);
    });
  }, []);
  let filteredProducts = products;
  // const [filterPaymentValue, setFilterPaymentValue] = useState("");
  // const handleFilterPaymentChange = (event) => {
  //   const filter = event.target.value;
  //   setFilterPaymentValue(filter);
  // };
  const [filterStockValue, setFilterStockValue] = useState("");
  const handleFilterStockChange = (event) => {
    const filter = event.target.value;
    setFilterStockValue(filter);
  };
  // Filter the products array based on the selected filter values
  if (filterStockValue === "in") {
    filteredProducts = products.filter((product) => product.countInStock > 0);
  }

  if (filterStockValue === "out") {
    filteredProducts = products.filter((product) => product.countInStock === 0);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  /* getting admin details */
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || [];
    setUser(savedUser);
    setUserToken(savedUser.token);
  }, []);

  /* adding a product */
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imgUrl, setImgUrl] = useState([]);
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
  const addProduct = async (e) => {
    e.preventDefault();
    if (!userToken) {
      return;
    }
    const productData = {
      productNumber: products.length,
      name,
      description,
      price,
      weight,
      imageUrl: imgUrl,
      countInStock: stock,
    };
    try {
      const response = await axios.post(
        "https://safran.onrender.com/products/add",
        productData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const newProduct = response.data;
      const updatedProducts = [...products, newProduct];
      // Update the products array with the newly created product
      setProducts(updatedProducts);

      handleModalClose();
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  };

  /* remove product from array */
  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };
  const updateProductData = (productId, updatedData) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, ...updatedData } : product
      )
    );
  };

  return (
    <div>
      <Title content="Products Dashboard" />
      <section className="filter-container row d-flex justify-content-between mb-3">
        <div className="col-3">
          <Link
            className="me-3 fw-bold fs-5"
            onClick={() => {
              props.setCurrentDash("orders");
            }}
          >
            Orders
          </Link>
          <Link className="fw-bold fs-5">Products</Link>
        </div>
        <div className="col-6 row d-flex justify-content-end">
          <div className="col-3 d-flex justify-content-end">
            <button className="btn btn-success" onClick={handleModalOpen}>
              <PlusLg color="#fff" />
            </button>
          </div>
          <div className="col-lg-5 col-md-6 col-9">
            <Form.Select
              aria-label="shippment filter"
              onChange={handleFilterStockChange}
            >
              <option value={""} selected>
                {filterStockValue === "" ? "Stock state" : "Reset"}
              </option>
              <option value="in">In stock</option>
              <option value="out">out of stock</option>
            </Form.Select>
          </div>
        </div>
      </section>
      <section className="text-center border-top mt-5">
        <Table>
          <thead className="table-head">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Weight</th>
              <th colSpan={3}>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <ProductsDashRow
                product={product}
                index={index}
                removeProduct={removeProduct}
                updateProductData={updateProductData}
                setRefreshProducts={setRefreshProducts}
              />
            ))}
          </tbody>
        </Table>
      </section>
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
              addProduct(e);
            }}
            className="add_prod_form"
          >
            <div className="row row-cols-md-2 row-cols-1">
              <Form.Group className="col">
                <Form.Label>Product name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Super Negin Safranfäden"
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
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </Form.Group>
            <div className="row row-cols-md-2 row-cols-1">
              <Form.Group className="col">
                <Form.Label>Product price:</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>Product stock:</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <div className="col-12">
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Light weight"
                    name="imageSelection"
                    value={1}
                    checked={selectedImage == 1}
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Heavy weight"
                    name="imageSelection"
                    value={2}
                    checked={selectedImage == 2}
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </div>
              <div className="col-4">
                {selectedImage == 0 ? (
                  <p className="text-light">Please select a product class</p>
                ) : (
                  <img
                    className="img-fluid"
                    alt="product image"
                    src={imgUrl[0]}
                  />
                )}
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
    </div>
  );
}
