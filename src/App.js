import "./App.css";
import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";

const App = () => {
  const [filter, setFilter] = useState(null);

  function filterParams(name, value) {
    if (name === null) {
      setFilter(null);
      return;
    }
    
    value = isNaN(+value) ? value : +value

    let params = { [name]: value };
    setFilter(params);
  }

  return (
    <div className="App">
      <Filter filterParams={filterParams} />
      <ProductList filter={filter} />
    </div>
  );
};

export default App;
