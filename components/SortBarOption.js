import React, { useState } from "react";

const SortBarOption = ({ text, onClick }) => {
  const [value, setValue] = useState(0);

  const SortBarClick = () => {
    setValue(((value + 2) % 3) - 1);
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div
      className="sort-bar-option flex items-center relative"
      onClick={() => SortBarClick()}
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
