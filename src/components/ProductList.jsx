import React, { useState, useEffect } from "react";
import Product from "./Product";
import fetchProducts from "../services/ProductService";
import Pagination from "./Pagination";

const ProductList = ({ filter }) => {
  const [productsInfo, setProductsInfo] = useState("");
  let [index, setIndex] = useState(1);

  const selecPage = (index) => {
    setIndex(+index);
  };

  const incIndex = () => {
    setIndex(++index);
  };

  const decIndex = () => {
    if (index === 1) return;
    setIndex(--index);
  };

  useEffect(() => {
    const fetchData = async () => {
      setProductsInfo("");
      const data = await fetchProducts(index, filter);
      setProductsInfo(data);
    };

    fetchData();
  }, [filter, index]);

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <div className="product-items">
        {!productsInfo ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="product-items__container">
              {productsInfo.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              incIndex={incIndex}
              decIndex={decIndex}
              index={index}
              selecPage={selecPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
