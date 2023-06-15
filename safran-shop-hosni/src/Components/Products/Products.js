import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "./ProductCard";

export default function Products(props) {
  return (
    <section className="products-cont">
      <div>
        {props.products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            index={index}
            refresh={props.refresh}
            setRefresh={props.setRefresh}
          />
        ))}
      </div>
    </section>
  );
}
