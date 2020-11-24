import { useState } from "react";

import EmptyFilters from "./emptyFilters";
import Filter from "./filter";

const FilterList = (props) => {
  const { filter, filterResults, showMoreModal } = props;

  const [modalDialogOpened, setModalDialogOpened] = useState(false);

  const onFilterResults = (value, remove) => {
    filterResults(filter.name, value, remove);
  };

  const selectedFilters = _.filter(
    filter.buckets,
    (filter) => filter.selected
  ).map((filter) => filter.key);

  return (
    <div className="bg-white mt-3 p-3">
      <label className="font-semibold text-sm my-2 ml-2 uppercase">
        {filter.title}
      </label>
      {selectedFilters.length > 0 && (
        <span className="float-right">
          <a
            className="text-xs text-blue-clipboard"
            onClick={() => onFilterResults(selectedFilters, true)}
            href="#"
          >
            Clear
          </a>
        </span>
      )}
      {_.take(filter.buckets, 10).map((item) => (
        <Filter key={item.key} item={item} onFilter={onFilterResults} />
      ))}
      {filter.buckets.length > 10 && (
        <label
          className="text-xs items-center ml-2 text-blue-600 cursor-pointer"
          onClick={() => setModalDialogOpened(true)}
        >
          Show more
        </label>
      )}
      {!filter.buckets.length && <EmptyFilters />}

      <div
        className={
          (modalDialogOpened ? "block" : "hidden") +
          " fixed z-10 inset-0 overflow-y-auto"
        }
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5	pb-3">
            <div
              className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50"
              onClick={() => setModalDialogOpened(false)}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                size="18"
                className="stroke-current"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div className="bg-white">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:text-left sm:w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 p-3 uppercase">
                    {filter.name}
                  </h3>
                  <div className="mt-2 border-t border-gray-300 border-solid p-4">
                    <div className="grid grid-cols-4">
                      {_.map(filter.buckets, (item) => (
                        <div
                          className="col-span-4 md:col-span-1"
                          key={item.key}
                        >
                          <Filter
                            item={item}
                            onFilter={() =>
                              onFilterResults(
                                item.key,
                                item.selected
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
