import React from "react";

const FilterPanel = ({ field, data, onClick }) => {
  const title = field.replace("_", " ").toUpperCase();

  return (
    <div className="p-5 bg-white mb-3">
      <h4 className="font-bold mb-3">{title}</h4>
      {data.map((item, index) => (
        <div
          key={`filter-sub-${index}`}
          className="flex justify-start items-center mb-3"
        >
          <span className="">{item.key}</span>
          <span className="text-gray-500 ml-3">{item.doc_count}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
