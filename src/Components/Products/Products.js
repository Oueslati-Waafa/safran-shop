import React, { useEffect, useState } from "react";
import "./Products.css";
import { Rating } from "react-simple-star-rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export default function Products(props) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleAddToCart2 = (prod) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.productNumber == prod.productNumber
    );

    console.log(existingProduct);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { ...prod, quantity: 1 };
      cart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <section className="products-cont">
      <div>
        {props.products.map((product, index) => (
          <div className="product-card mb-5" key={product.productNumber}>
            {product.liked ? (
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
              />
            )}
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
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {product.name}
                </Link>
              </h4>
              <div className="d-flex justify-content-between w-100 product-rate-cont">
                <Rating
                  initialValue={product.rate}
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
            >
              In den Warenkorb
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
