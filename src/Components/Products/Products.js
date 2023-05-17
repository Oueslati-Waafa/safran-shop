import React, { useState } from "react";
import "./Products.css";
import { Rating } from "react-simple-star-rating";

export default function Products(props) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="products-cont">
      <div>
        {props.products.map((product, index) => (
          <div className="product-card mb-5" key={index}>
            <div
              className="product-img-cont mb-5"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={
                  hoveredIndex === index
                    ? product.imageUrl[1]
                    : product.imageUrl[0]
                }
                alt="product"
                className="img-fluid product-img"
              />
            </div>
            <div className="product-caption d-flex align-items-center">
              <h4>
                {product.weight} - {product.name}
              </h4>
              <div className="d-flex justify-content-between w-100">
                <Rating
                  initialValue={product.rate}
                  readonly
                  allowFraction
                  size={35}
                />
                <h3>{product.price}</h3>
              </div>
            </div>
            <button className="btn product-btn w-100">In den Warenkorb</button>
          </div>
        ))}
      </div>
    </section>
  );
}
