import React, { useState } from "react";

function Customize(props) {
  const [postsPerPage, setPostPerPage] = useState(props.postsPerPage);
  const [limit, setLimitPerFetch] = useState(props.limit);

  return (
    <section className="page_custom">
      <h1>Static with Dynamic Pagination</h1>
      <h1>Total Posts: 10</h1>
      <p>*Limit Per Fetch : Must be Equal or Less than total posts.</p>
      <p>
        *Posts Per Page : Must be Equal or Less than limit &{" "}
        {`Reminder must be 0(Limit % Postperpage)`}.
      </p>
      <form className="custom_form">
        <label>
          Posts Per Page:{" "}
          <input
            type="number"
            value={postsPerPage}
            min={1}
            max={limit}
            onChange={(e) => setPostPerPage(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Limit Per Fetch:{" "}
          <input
            type="number"
            value={limit}
            min={1}
            max={10}
            onChange={(e) => setLimitPerFetch(Number(e.target.value))}
            required
          />
        </label>
      </form>
      <button
        className="page_buttons"
        onClick={() => props.customFormSubmit(postsPerPage, limit)}
        disabled={
          (props.postsPerPage === postsPerPage && props.limit === limit) ||
          !(limit <= 10 && postsPerPage <= limit && limit % postsPerPage === 0)
        }
      >
        Submit
      </button>
    </section>
  );
}

export default Customize;
