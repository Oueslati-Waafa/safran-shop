import React from "react";
import { Carousel } from "react-bootstrap";
import "./HomePage.css";
import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import Testimonials from "../../Components/Testimonials/Testimonials";

export default function HomePage() {
  const products = Array.from({ length: 8 }, (_, index) => ({
    name: "Super Negin Safranfäden",
    weight: "10g",
    price: "50£",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: [
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323843/Saafran/products/mfmvo4hs6uogettr6ojg.png",
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/products/kwxpyspgvsimqe5zplvx.png",
    ],
    rate: 3.5,
    product_number: index,
  }));

  const testimonials = Array.from({ length: 5 }, (_, index) => ({
    userImg:
      "https://res.cloudinary.com/dvjvlobqp/image/upload/v1684341548/Saafran/products/gzrnetfstnzy6jecoxle.png",
    review:
      "Ich habe kürzlich ein Produkt diesem Shop gekauft und ich könnte mit meiner Erfahrung nicht zufriedener sein. Die Qualität des Produkts wurde übertroffen meine Erwartungen und der Kunde Der Service war hervorragend. Ich kann diesen Shop jedem wärmstens empfehlen auf der Suche nach hochwertigen Produkten und außergewöhnlicher Service.",
  }));

  console.log(products);

  return (
    <main className="homepage-cont">
      <section className="carousel-cont">
        <Carousel fade controls={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/banners/aaxeevq1pbpb19jtdqiy.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684323842/Saafran/banners/e78r0aewybxct6dinj06.png"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </section>
      <section className="products-cont-home">
        <Title content={"PRODUKTE DES MONATS"} />
        <Products products={products} />
      </section>
      <section className="Testimonials-cont-home">
        {/* <Testimonials testimonials={testimonials} /> */}
      </section>
    </main>
  );
}
