const SortButton = (props) => {
  const { title, onSort, state } = props;
  const cssClass =
    state == 1 ? "-rotate-90" : state == 2 ? "rotate-90" : "hidden";

  return (
    <a onClick={onSort} className="mr-2" href="#">
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
  );
};

export default SortButton;
