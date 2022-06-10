import React from "react";

const PageList = ({ pageData, loading }) => {
  if (loading) return <div className="page_items"><h1>Loading...</h1></div>;
  return (
    <div className="page_items">
      {pageData.map((data) => {
        return (
        <div key={data.name} className="page_item">
        <h1>{data.name}</h1>
        </div>
        )
      })}
    </div>
  );
};

export default PageList;
