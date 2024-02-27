import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      {product ? (
        <>
          <p>ID: {product.id}</p>
          <p>Name: {product.product}</p>
          <p>Price: {product.price}</p>
          <p>Brand: {product.brand}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
