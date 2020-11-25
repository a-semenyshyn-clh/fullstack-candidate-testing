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
    key: 'job_title',
    name: 'Title'
  },
];

export default function SorterList() {
  const { params, setParams } = useSearchParamsContext();

  function handleSorterClick(key) {
    const { sorter } = params;

    let sorterToSet;

    // sorters toggle in the sequence none -> desc -> asc -> none
    if (sorter[key] === 'asc') {
      // if ascending, reset
      sorterToSet = {};
    } else if (sorter[key] === 'desc') {
      // if desc, change to asc
      sorterToSet = {
        [key]: 'asc'
      };
    } else {
      // not selected, change to desc
      sorterToSet = {
        [key]: 'desc'
      };
    }

    setParams({
      ...params,
      sorter: sorterToSet
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