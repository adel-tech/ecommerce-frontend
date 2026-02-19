import React from "react";

function ProductPagination({ totalItems, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination" style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="button-secondary"
        style={{ marginRight: "10px" }}
      >
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="button-secondary"
        style={{ marginLeft: "10px" }}
      >
        Next
      </button>
    </div>
  );
}

export default ProductPagination;
