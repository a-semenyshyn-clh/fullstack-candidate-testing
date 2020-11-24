import JobList from "./job-list";
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

export default function JobResults({ jobs }) {
  const hospitals = jobs;

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

  const totalJobs = hospitals.reduce((count, hospital) => count + hospital.total_jobs_in_hospital, 0);

  return (
    <div className="bg-white lg:my-4 p-3 lg:p-6">
      <div className="flex justify-between mb-6 lg:mb-8 mt-2">
        <div>
          <span className="font-bold">{totalJobs}</span> job postings
        </div>
        <div className="hidden lg:flex space-x-4">
          <div className="text-gray-500">Sort by</div>
          {sorters.map(sorter => {
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
          })}
        </div>
      </div>
      <div className="mx-2 lg:mx-4">
      {
        hospitals.map((hospital, i) =>
          <JobList key={i} hospital={hospital} />)
      }
      </div>
    </div>
  );
}
