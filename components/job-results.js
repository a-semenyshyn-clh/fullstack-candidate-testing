import { useState } from "react";

import JobList from "./job-list";
import { useSearchParamsContext } from "../contexts/search";
import FilterGroup from "./filter-group";
import FilterList from "./filter-list";
import SorterList from "./sorter-list";

export default function JobResults({ jobs, filters }) {
  const hospitals = jobs;

  const [ showMobileFilterSection, setShowMobileFilterSection ] = useState(false);
  const [ showMobileSortSection, setShowMobileSortSection ] = useState(false);


  const totalJobs = hospitals.reduce((count, hospital) => count + hospital.total_jobs_in_hospital, 0);

  return (
    <div className="bg-white lg:my-4 p-3 lg:p-6">
      <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
        <div>
          <span className="font-bold">{totalJobs}</span> job postings
        </div>
        <div className="hidden lg:flex space-x-4">
          <div className="text-gray-500">Sort by</div>
          <SorterList />
        </div>
        <div className="flex lg:hidden space-x-2">
          <button
              className="rounded-md border border-blue-500 text-blue-500 py-1 px-3"
              onClick={() => {
                setShowMobileSortSection(!showMobileSortSection);
                setShowMobileFilterSection(false);
              }}>
            Sort
          </button>
          <button
            className="rounded-md border border-blue-500 text-blue-500 py-1 px-3"
            onClick={() => {
              setShowMobileFilterSection(!showMobileFilterSection);
              setShowMobileSortSection(false);
            }}>
            Filter
          </button>
        </div>
      </div>
      {
        showMobileFilterSection && (
          <div className="lg:hidden -mx-3 border-t border-gray-300">
            <h2 className="m-4 text-lg">Filters</h2>
            <div className="max-h-80 overflow-x-auto border-t border-b border-gray-300">
              <FilterList filters={filters} />
            </div>
          </div>
        )
      }
      {
        showMobileSortSection && (
          <div className="lg:hidden -mx-3 border-t border-b border-gray-300">
            <h2 className="m-4 text-lg">Sort by</h2>
            <div className="mb-4 border-t border-gray-300">
              <div className="flex space-x-2 ml-4 mt-4">
                <SorterList />
              </div>
            </div>
          </div>
        )
      }
      <div className="mx-2 lg:mx-4">
      {
        hospitals.map((hospital, i) =>
          <JobList key={i} hospital={hospital} />)
      }
      </div>
    </div>
  );
}
