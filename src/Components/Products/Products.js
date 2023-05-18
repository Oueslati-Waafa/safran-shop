import React, { useEffect, useState } from "react";
import "./Products.css";
import { Rating } from "react-simple-star-rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

export default function Products(props) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

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
              <LazyLoadImage
                src={
                  hoveredIndex === index
                    ? product.imageUrl[1]
                    : product.imageUrl[0]
                }
                alt="product"
                className="img-fluid product-img"
                effect="blur"
              />
            </div>
            <div className="product-caption d-flex align-items-center">
              <h4>
                {product.weight} -{" "}
                <Link to={`/product/${product.product_number}`}>
                  {product.name}
                </Link>
              </h4>
              <div className="d-flex justify-content-between w-100">
                <Rating
                  initialValue={product.rate}
                  readonly
                  allowFraction
                  size={width > 768 ? 35 : 20}
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
