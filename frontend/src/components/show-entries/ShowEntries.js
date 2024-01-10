/* eslint-disable react/prop-types */
import React from "react";

function ShowEntries({ projectPerPage, onChangeLimit }) {
  return (
    <section>
      <div
        style={{
          marginTop: 0,
        }}
      >
        <label
          style={{
            fontSize: 15,
          }}
        >
          Show{" "}
          <select
            className="p-1 rounded bg-white"
            value={projectPerPage}
            onChange={onChangeLimit}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          entries
        </label>
      </div>
    </section>
  );
}

export default ShowEntries;
