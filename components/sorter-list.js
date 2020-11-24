import {useSearchParamsContext} from "../contexts/search";

const sorters = [
  {
    key: 'hours',
    name: 'Hours'
  },
  {
    key: 'salary_range',
    name: 'Avg. Salary'
  },
  {
    key: 'title',
    name: 'Title'
  },
];

export default function SorterList() {
  const { params, setParams } = useSearchParamsContext();

  function handleSorterClick(key) {
    const { sorter } = params;
    const sorterCopy = {...sorter};

    // sorters toggle in the sequence none -> desc -> asc -> none
    if (sorter[key] === 'asc') {
      // if ascending, reset
      delete sorterCopy[key];
    } else if (sorter[key] === 'desc') {
      // if desc, change to asc
      sorterCopy[key] = 'asc';
    } else {
      // not selected, change to desc
      sorterCopy[key] = 'desc';
    }

    setParams({
      ...params,
      sorter: sorterCopy
    });
  }

  return sorters.map(sorter => {
    const sorterValue = params.sorter[sorter.key];
    const btnClasses = [
      'focus:outline-none',
      sorterValue ? 'text-blue-500' : '',
    ].join(' ');

    return (
      <button key={sorter.key} className={btnClasses} onClick={() => handleSorterClick(sorter.key)}>
        {sorter.name}
        <span className="ml-1 font-semibold">
          {sorterValue && (
              sorterValue === 'asc' ? '↑' : '↓'
          )}
          </span>
      </button>
    );
  });
}