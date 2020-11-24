import { useSearchParamsContext } from "../contexts/search";
import { useState } from "react";

export default function FilterGroup({ name, rawName, filters }) {

  const { params, setParams } = useSearchParamsContext();
  const [modalShown, setModalShown] = useState(false);

  function setFilter(key) {
    const filter = {
      ...params.filter,
    };

    // already selected, remove.
    if (filter[rawName] === key) {
      delete filter[rawName];
    } else {
      filter[rawName] = key;
    }

    setParams({
      ...params,
      filter
    });
  }

  const selectedCategory = params.filter?.[rawName];
  const hasExtra = filters.length > 10;

  return (
    <div className="bg-white m-4 p-4 flex flex-col space-y-2">
      <div className="font-bold mb-2">{name}</div>
      {
        filters.slice(0, 10).map(({ key, doc_count }) =>
          <button className={`text-left ${selectedCategory === key ? 'text-blue-500' : ''}`} key={key} onClick={() => setFilter(key)}>
            {key}
            <span className="ml-2 text-sm text-gray-400">
              {doc_count}
            </span>
          </button>)
      }

      {
        hasExtra &&
          <button onClick={() => setModalShown(true)} className="text-left text-blue-500">Show all</button>
      }

      {
        modalShown &&
          <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-10 flex justify-center items-center">
            <div className="shadow rounded-md bg-white w-3/4">
              <div className="border-b border-gray-300 flex justify-between">
                <h2 className="text-2xl p-4">{name}</h2>
                <button className="p-4 mx-2 font-bold" onClick={() => setModalShown(false)}>X</button>
              </div>
              <div className="flex flex-wrap p-4">
                {
                  filters.map(({ key, doc_count }) =>
                    <div className="p-2 w-1/4">
                      <button className={`text-left ${selectedCategory === key ? 'text-blue-500' : ''}`} key={key} onClick={() => {
                        setFilter(key);
                        setModalShown(false);
                      }}>
                        {key}
                        <span className="ml-2 text-sm text-gray-400">{doc_count}</span>
                      </button>
                    </div>)
                }
              </div>
            </div>
          </div>
      }
    </div>
  );
}