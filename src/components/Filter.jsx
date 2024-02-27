import React, { useState } from "react";

const Filter = ({ filterParams }) => {
  let [price, setPrice] = useState("");
  let [product, setProduct] = useState("");
  let [brand, setBrand] = useState("");

  function filter(e) {
    e.preventDefault();
    const inputName = e.target.dataset.name;
    const value = e.target.previousSibling.value;

    filterParams(inputName, value);
  }

  function removeFilter(e) {
    e.preventDefault();
    filterParams(null);
  }

  return (
    <form>
      <div>
        <h3>Поиск по цене</h3>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="submit" data-name="price" onClick={filter} />
      </div>
      <div>
        <h3>Поиск по названию</h3>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input type="submit" data-name="product" onClick={filter} />
      </div>
      <div>
        <h3>Поиск по бренду</h3>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input type="submit" data-name="brand" onClick={filter} />
      </div>
      <input type="submit" onClick={removeFilter} value={"Убрать фильтр"} />
    </form>
  );
};

export default Filter;
