import { useEffect, useState } from "react";

const SortButton = (props) => {
  const { title, onClick } = props;
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    onClick(sortOrder);
  }, [sortOrder]);

  const cssClass =
    sortOrder == 1 ? "-rotate-90" : sortOrder == 2 ? "rotate-90" : "hidden";

  return (
    <div className="flex cursor-pointer">
      <a
        onClick={() => setSortOrder((1 + sortOrder) % 3)}
        className="mr-1 flex text-sm items-center"
        href="#"
      >
        {title}
        <svg
          className={`inline transform ${cssClass}`}
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
    </div>
  );
};

export default SortButton;
