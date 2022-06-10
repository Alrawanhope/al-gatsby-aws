import React from "react";
import "../styles/common.css";

const PaginationButton = ({
  initialPageCount,
  paginate,
  currentPage,
  countPage,
  prevFun,
  hasPrev,
  hasPrevTest,
  nextFun,
  hasNext,
  hasNextTest,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= initialPageCount; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="page_button">
      <ul className="page_button_ul">
        <button
          className="page_buttons"
          onClick={prevFun}
          disabled={!hasPrev && hasPrevTest}
        >
          Prev
        </button>
        {/* {hasPrev ? <button onClick={prevFun}>...</button> : null} */}
        {pageNumbers.map((number) => {
          let displayNumber = number + countPage;
          return (
            <li key={number}>
              <button
                style={{
                  background: `${
                    currentPage === number ? "#fe6e63" : "inherit"
                  }`,
                  cursor: `${
                    currentPage === number ? "not-allowed" : "inherit"
                  }`,
                }}
                className="page_buttons_int"
                onClick={() => paginate(number)}
                disabled={currentPage === number}
              >
                {displayNumber}
              </button>
              {/* {number} */}
            </li>
          );
        })}
        {/* {hasNext ? <button onClick={nextFun}>...</button> : null} */}
        <button
          className="page_buttons"
          onClick={nextFun}
          disabled={initialPageCount !== 0 ? !hasNext && hasNextTest : true}
        >
          Next
        </button>
      </ul>
    </div>
  );
};

export default PaginationButton;
