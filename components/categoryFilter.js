import _ from "lodash";
import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Modal from "react-modal";

import FilterButton from "./filterButton";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    inset: "100px",
    height: "auto",
    padding: "0px",
  },
};

const useCategoryFilter = (categoryName) => {
  const jobsPerCategory = useSelector((state) => {
    return _.chain(state.filteredJobs)
      .flatMap((job) => {
        return _.isString(job.items[0][categoryName])
          ? job.items
          : _.flatMap(job.items, (job2) =>
              _.toArray(
                _.forEach(job2[categoryName], (value) => {
                  var clone = _.clone(job2);
                  clone[categoryName] = value;
                  return clone;
                })
              )
            );
      })
      .groupBy((x) =>
        _.isObject(x)
          ? x.hasOwnProperty(categoryName)
            ? x[categoryName]
            : x
          : x
      )
      .map((value, key) => {
        return {
          key: key,
          doc_count: value.length,
          enabled: state.filters[categoryName][key],
        };
      })
      .orderBy((x) => [x.enabled, x.doc_count], ["desc", "desc"])
      .value();
  }, shallowEqual);

  console.log("jobsPerCategory", jobsPerCategory);

  const selectedFilters = useSelector((state) => {
    return _.filter(
      _.keys(state.filters[categoryName]),
      (key) => state.filters[categoryName][key]
    );
  });

  const dispatch = useDispatch();
  const jobFilter = (value) => {
    console.log(
      `trigger 'jobs/filterBy' with values: ${categoryName}, ${value}`
    );
    dispatch({
      type: "jobs/filterBy",
      filterField: categoryName,
      filterValue: value,
    });
  };

  const clearFilters = () => {
    dispatch({
      type: "jobs/filterBy",
      filterField: categoryName,
      filterValue: selectedFilters,
    });
  };

  return {
    jobsPerCategory,
    jobFilter,
    selectedFilters,
    clearFilters,
  };
};

const CategoryFilter = (props) => {
  const { title, categoryName, maxCategories = 10 } = props;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    jobsPerCategory,
    jobFilter,
    selectedFilters,
    clearFilters,
  } = useCategoryFilter(categoryName);

  const renderCategories = (categories) => {
    return _.take(categories, maxCategories).map((category) => (
      <FilterButton
        key={category.key}
        title={category.key}
        value={category.doc_count}
        enabled={category.enabled}
        selected={_.includes(selectedFilters, category.key)}
        onFilter={() => {
          jobFilter(category.key);
        }}
      />
    ));
  };

  const renderNoData = () => {
    return (
      <div className="w-full flex items-center justify-start p-4 bg-white dark:bg-grey-800 text-blue-500 shadow p-4">
        <div className="flex-shrink"></div>
        <div className="flex-grow text-center">There are no categories.</div>
      </div>
    );
  };

  return (
    <div className="bg-white mb-5">
      <div className="flex items-baseline px-3 pb-1 pt-3 font-semibold">
        <div className="flex-1 text-sm uppercase">{title}</div>
        <span className="float-right">
          {selectedFilters.length > 0 && (
            <a
              className="text-xs text-blue-clipboard"
              onClick={clearFilters}
              href="#"
            >
              Clear
            </a>
          )}
        </span>
      </div>
      <div className="pt-2">
        {jobsPerCategory && jobsPerCategory.length
          ? renderCategories(jobsPerCategory)
          : renderNoData()}
        {maxCategories < jobsPerCategory.length && (
          <>
            <div className="flex items-center px-3 pb-2">
              <div className="flex-1 text-sm">
                <a href="#" onClick={openModal}>
                  Show more
                </a>
              </div>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div className="modal-content h-auto">
                <div className="modal-header border-b-1 border-b p-5">
                  <h3 className="text-xl font-semibold inline">
                    {categoryName}
                  </h3>
                  <button
                    className="modal-close btn btn-transparent float-right"
                    onClick={closeModal}
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      size="18"
                      className="stroke-current"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="max-w-screen-xl mx-auto px-8">
                  <div className="-mx-4 flex flex-wrap">
                    {_.map(jobsPerCategory, (category) => (
                      <div className="w-full p-1 sm:w-1/4" key={category.key}>
                        <FilterButton
                          title={category.key}
                          value={category.doc_count}
                          selected={category.enabled}
                          selected={_.includes(selectedFilters, category.key)}
                          onFilter={() => {
                            jobFilter(category.key);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
