import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
            style={{
              backgroundColor: currentPage === 1 ? "#e9ecef" : "#c93535",
              color: "#ffffff",
            }}
          >
            Previous
          </a>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(index + 1)}
              style={{
                backgroundColor:
                  currentPage === index + 1 ? "#c93535" : "#ffffff",
                color: currentPage === index + 1 ? "#ffffff" : "#c93535",
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            style={{
              backgroundColor:
                currentPage === totalPages ? "#e9ecef" : "#c93535",
              color: "#ffffff",
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
