import React, { useState } from "react";
import SortBarOption from "./SortBarOption";

const SortBar = ({ data, className, onClick }) => {
  const [sortOptions, setSortOptions] = useState([
    {
      text: "Location",
      value: "",
    },
    {
      text: "Role",
      value: "",
    },
    {
      text: "Department",
      value: "",
    },
    {
      text: "Education",
      value: "",
    },
    {
      text: "Experience",
      value: "",
    },
  ]);

  return (
    <ul className={className}>
      <li className="text-gray-500 px-3">Sort by</li>
      {sortOptions.map((item, index) => (
        <li
          key={`sort-${index}`}
          className="font-bold text-black mx-3 py-1 md:py-0 cursor-pointer"
        >
          <SortBarOption text={item.text} />
        </li>
      ))}
    </ul>
  );
};

export default SortBar;
