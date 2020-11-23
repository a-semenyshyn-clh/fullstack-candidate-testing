import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Sort = (props) => {
  const { title, onChange } = props;
  const [sort, setSort] = useState(0);

  useEffect(() => {
    onChange(sort);
  }, [sort]);

  return (
    <div
      className="flex m-2 cursor-pointer"
      onClick={() => setSort(((sort + 2) % 3) - 1)}
    >
      <button className="ml-2 inline-block outline-none text-gray-700">
        {title}
      </button>
      {sort == 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="16"
          height="16"
          className="ml-1 mt-1"
        ></svg>
      )}
      {sort == -1 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="16"
          height="16"
          className="ml-1 mt-1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {sort == 1 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="16"
          height="16"
          className="ml-1 mt-1"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

Sort.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

export default Sort;
