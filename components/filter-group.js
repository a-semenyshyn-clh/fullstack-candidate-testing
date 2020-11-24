import { useSearchParamsContext } from "../contexts/search";

export default function FilterGroup({ name, rawName, filters }) {

  const { params, setParams } = useSearchParamsContext();

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

  return (
    <div className="bg-white m-4 p-4 flex flex-col space-y-2">
      <div className="font-bold mb-2">{name}</div>
      {
        filters.map(({ key, doc_count }) =>
          <button className={`text-left ${selectedCategory === key ? 'text-blue-500' : ''}`} key={key} onClick={() => setFilter(key)}>
            {key}
            <span className="ml-2 text-sm text-gray-400">
              {doc_count}
            </span>
          </button>)
      }
    </div>
  );
}