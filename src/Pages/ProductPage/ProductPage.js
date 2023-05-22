import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";

export default function ProductPage() {
  const products = [
    {
      name: "Super Negin Safranfäden",
      weight: "1g",
      price: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
      ],
      rate: 3.5,
      product_number: 0,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "5g",
      price: 25,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
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
      price: 50,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
      ],
      rate: 3.5,
      product_number: 2,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "100g",
      price: 500,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
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
      price: 5000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 4,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "2Kg",
      price: 8000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 5,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "5Kg",
      price: 20000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 6,
    },
    {
      name: "Super Negin Safranfäden",
      weight: "10Kg",
      price: 35000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
      imageUrl: [
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
        "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
      ],
      rate: 4,
      product_number: 7,
    },
  ];
  const [productId, setProductId] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/");
    setProductId(parts[2]);
  }, [location]);

  console.log(productId);

  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    setCurrentProduct(products[productId]);
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
  }, []);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.product_number == productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { ...currentProduct, quantity: 1 };
      cart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <main className="mt-5 py-5 container product-page">
      {currentProduct ? (
        <div className="row">
          <div className="col-md-5 col-12 mb-md-0 mb-5">
            <div
              className="product-page-img-cont"
              onMouseEnter={() => setHoveredIndex(productId)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
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
