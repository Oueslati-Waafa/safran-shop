import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./HomePage.css";
import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Footer from "../../Components/Footer/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

export default function HomePage() {
  // const productsf = [
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "1g",
  //     "price": 5,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
  //     ],
  //     "rate": 3.5,
  //     "productNumber": 0,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "5g",
  //     "price": 25,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
  //     ],
  //     "rate": 3.5,
  //     "productNumber": 1,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "10g",
  //     "price": 50,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
  //     ],
  //     "rate": 3.5,
  //     "productNumber": 2,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "100g",
  //     "price": 500,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
  //     ],
  //     "rate": 3.5,
  //     "productNumber": 3,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "1Kg",
  //     "price": 5000,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
  //     ],
  //     "rate": 4,
  //     "productNumber": 4,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "2Kg",
  //     "price": 8000,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
  //     ],
  //     "rate": 4,
  //     "productNumber": 5,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "5Kg",
  //     "price": 20000,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
  //     ],
  //     "rate": 4,
  //     "productNumber": 6,
  //     "countInStock": 10
  //   },
  //   {
  //     "name": "Super Negin Safranfäden",
  //     "weight": "10Kg",
  //     "price": 35000,
  //     "description":
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum mauris justo, id facilisis lorem posuere et. Sed ut malesuada nisi. Phasellus interdum quam nec luctus pulvinar. Maecenas quis feugiat elit. Ut ullamcorper turpis sed ligula rutrum, in fringilla odio rhoncus. Maecenas dignissim posuere libero vitae facilisis.",
  //     "imageUrl": [
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420439/Saafran/products/m1cf2kjmfxdagdtgvrsi.png",
  //       "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684420440/Saafran/products/hcshpcu0b1i0dnjyfp0c.png",
  //     ],
  //     "rate": 4,
  //     "productNumber": 7,
  //     "countInStock": 10
  //   },
  // ];

  // localStorage.setItem("products", JSON.stringify(products));

  const testimonials = Array.from({ length: 5 }, (_, index) => ({
    userImg:
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684341548/Saafran/products/gzrnetfstnzy6jecoxle.png",
    review:
      "Ich habe kürzlich ein Produkt diesem Shop gekauft und ich könnte mit meiner Erfahrung nicht zufriedener sein. Die Qualität des Produkts wurde übertroffen meine Erwartungen und der Kunde Der Service war hervorragend. Ich kann diesen Shop jedem wärmstens empfehlen auf der Suche nach hochwertigen Produkten und außergewöhnlicher Service.",
  }));

  const banners = [
    "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684419645/Saafran/banners/wdzustqy9fuvzrtk4ad3.png",
    "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684419578/Saafran/banners/eh6epuewtyycfmiyfwcw.png",
    "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684419594/Saafran/banners/bkkppgla0lpixj9ja8dr.png",
    "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684419682/Saafran/banners/vqktf6uu9e2scifkd9i0.png",
  ];

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/products/getAll").then((result) => {
      setProducts(result.data);
    });
  }, []);

  return (
    <main className="homepage-cont">
      <section className="carousel-cont">
        <Carousel fade controls={false}>
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <LazyLoadImage
                className="d-block w-100 carousel-img"
                src={banner}
                alt="slide"
                effect="blur"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <section className="products-cont-home">
        <Title content={"Unsere Produkte"} />
        <Products products={products} />
      </section>
      <section className="Testimonials-cont-home my-5">
        <Testimonials testimonials={testimonials} />
      </section>
    </main>
  );
}
