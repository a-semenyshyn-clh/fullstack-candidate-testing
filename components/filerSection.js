import React from "react";
import Filter from "./filter";
import PropTypes from "prop-types";

const FilterSection = (props) => {
  const { filters, title, showDetails } = props;

  return (
    <>
      <div className="border border-gray-400 rounded shadow-md bg-white mt-3 p-3">
        <label className="font-bold text-base my-2 ml-2">{title}</label>

        {filters.slice(0, 10).map((item) => (
          <Filter item={item} key={item.key} />
        ))}

        {filters.length >= 11 && (
          <label
            className="more ml-2 text-blue-600 cursor-pointer"
            onClick={() =>
              showDetails({
                title,
                filters: filters,
              })
            }
          >
            {"Show more"}
          </label>
        )}
      </div>
    </>
  );
};

FilterSection.propTypes = {
  filters: PropTypes.array,
  title: PropTypes.string,
  showDetails: PropTypes.func,
};

export default FilterSection;
