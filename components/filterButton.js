import NumberFormat from "react-number-format";

const FilterButton = (props) => {
  const { title, value, onFilter, selected } = props;

  return (
    <div className="flex items-center px-3 pb-2" key={title}>
      <div className="font-light text-sm">
        <a
          className={`${selected ? "text-blue-clipboard" : ""}`}
          href="#"
          onClick={onFilter}>
          {title}
        </a>
      </div>
      <div className="flex-1 text-xs pl-2">
        <div className="uppercase text-gray-600 pt-1 text-xs">
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
