import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Pagination = ({ incIndex, decIndex, index, selecPage }) => {
  function select(e) {
    selecPage(e.target.innerHTML);
  }

  return (
    <div className="pagination">
      <FaArrowAltCircleLeft className="arrow" onClick={decIndex} />
      <div className="pagination-pages">
        {index - 3 > 0 ? <div onClick={select}>{index - 3}</div> : ""}
        {index - 2 > 0 ? <div onClick={select}>{index - 2}</div> : ""}
        {index - 1 > 0 ? <div onClick={select}>{index - 1}</div> : ""}
        <div onClick={select} className="pagination-active">
          {index}
        </div>
        <div onClick={select}>{index + 1}</div>
        <div onClick={select}>{index + 2}</div>
        <div onClick={select}>{index + 3}</div>
      </div>
      <FaArrowAltCircleRight className="arrow" onClick={incIndex} />
    </div>
  );
};

export default Pagination;
