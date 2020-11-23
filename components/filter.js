import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  const { item } = props;

  return (
    <div className="my-2">
      <label className="ml-2 inline-block">{item.key}</label>
      <label className="text-sm text-gray-400 ml-4 inline-block">
        {item.doc_count.toLocaleString()}
      </label>
    </div>
  );
};

Filter.propTypes = {
  item: PropTypes.any,
};

export default Filter;
