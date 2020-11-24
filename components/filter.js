import NumberFormat from "react-number-format";

const Filter = (props) => {
  const { item, onFilter } = props;

  return (
    <div className="flex items-center px-3 pb-2">
      <div className="font-light text-sm">
        <a
          className={`${item.selected ? "text-blue-clipboard" : ""}`}
          href="#"
          onClick={() => onFilter(item.key, item.selected)}
        >
          {item.key}
        </a>
      </div>
      <div className="flex-1 text-xs pl-2">
        <div className="uppercase text-gray-600 pt-1 text-xs">
          <NumberFormat
            value={item.doc_count}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
