import React, { useState } from "react";

const SortBar = ({ data, onClick }) => {
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
    <ul className="p-2 md:p-0 md:flex">
      <li className="text-gray-500 px-3">Sort by</li>
      {sortOptions.map((item, index) => (
        <li key={`sort-${index}`} className="font-bold text-black px-3 py-1 md:py-0">
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default SortBar;
