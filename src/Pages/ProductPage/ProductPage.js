import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function ProductPage() {
  const products = [
    {
      name: "Super Negin Safranfäden",
      weight: "10g",
      price: "50£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
      ],
      rate: 3.5,
      product_number: 0,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "10g",
      price: "50£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
      ],
      rate: 3.5,
      product_number: 1,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "10g",
      price: "50£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
      ],
      rate: 3.5,
      product_number: 2,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "10g",
      price: "50£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
      ],
      rate: 3.5,
      product_number: 3,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "1Kg",
      price: "299£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 4,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "1Kg",
      price: "299£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 5,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "1Kg",
      price: "299£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 6,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "1Kg",
      price: "299£",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 7,
    },
  ];
  const location = useLocation();
  const path = location.pathname;
  const parts = path.split("/");
  const productId = parts[2];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <main className="mt-5 py-5 container">
      <div className="row">
        <div className="col-4">
          <div
            className="product-page-img-cont"
            onMouseEnter={() => setHoveredIndex(productId)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={
                hoveredIndex === productId
                  ? products[productId].imageUrl[1]
                  : products[productId].imageUrl[0]
              }
              alt="product-image"
              className="img-fluid product-page-img"
            />
          </div>
        </div>
        <div className="col-8 d-flex align-items-center flex-column">
          <div className="product-page-caption d-flex align-items-center">
            <h4>
              {products[productId].weight} - {products[productId].name}
            </h4>
            <div className="d-flex justify-content-between w-100">
              <Rating
                initialValue={products[productId].rate}
                readonly
                allowFraction
                size={width > 768 ? 35 : 20}
              />
              <h3>{products[productId].price}</h3>
            </div>
            <p>{products[productId].description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
