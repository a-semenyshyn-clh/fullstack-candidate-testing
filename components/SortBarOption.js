import React, { useState } from "react";

const SortBarOption = ({ text }) => {
  const [value, setValue] = useState(0);

  return (
    <div
      className="sort-bar-option flex items-center relative"
      onClick={() => setValue(((value + 2) % 3) - 1)}
    >
      <span className="mr-1">{text}</span>
      {value !== 0 && (
        <i
          className={`fas fa-caret-${
            value === 1 ? "down" : "up"
          } absolute right-0 -mr-3`}
        />
      )}
      <style jsx>{`
        .sort-bar-option {
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default SortBarOption;
