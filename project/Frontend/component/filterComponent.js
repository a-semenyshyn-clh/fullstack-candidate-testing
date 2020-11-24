import React from 'react';
import fetch from 'isomorphic-unfetch';
import Modal from './modal';
import { Constants } from '../util/constants';

function FilterComponent({ title, filterRoute, showMore = false }) {
  const [filterData, setFilterData] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);

  const fetchData = async () => {
    const res = await fetch(`${Constants.WEB_SERVICE_URL}${filterRoute}`);
    const filterDataJSON = await res.json();
    setFilterData(filterDataJSON);
  };

  React.useEffect(() => {
    fetchData();
  }, [filterRoute]);

  const renderFilterData = (filterData) => {
    if (!filterData) {
      return;
    }
    const jobDetailItems = filterData.map((filterItem) => (
      <div className="mt-5" key={filterItem.key}>
        <a className="hover:underline" href="#">
          {filterItem.key}
        </a>
        <span className="pl-2 text-xs text-gray-400">
          {filterItem.doc_count}
        </span>
      </div>
      ));
    return jobDetailItems;
  };

  return (
    <div className="App mb-3 box-border p-4 border-4 border-solid bg-white appearance-none block py-3 px-4 leading-tight text-gray-700 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none">
      <div className="font-semibold">{title}</div>
      {renderFilterData(filterData)}
      {showMore && (
        <div
          className="mt-5 text-blue-500 hover:underline"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <div className="cursor-pointer">Show more</div>
        </div>
      )}
      {showModal && <div><Modal setShowModal={setShowModal} /></div>}
    </div>
  );
}

export default FilterComponent;
