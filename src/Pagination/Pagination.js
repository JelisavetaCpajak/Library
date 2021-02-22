import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ booksPerPage, totalBooks, paginate }) => {
  const pageNums = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {pageNums.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
