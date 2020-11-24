import { useState } from 'react';

export default function JobDetail({ job }) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function handleBtnClick(e) {
    e.stopPropagation();
  }

  return (
    <div className="cursor-pointer text-sm" onClick={toggleExpanded}>
      <div className="border-t border-gray-300 -mx-2 px-2 py-4 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div>
          <div className="font-semibold">{job.job_title}</div>
          <div>{job.job_type} | ${job.salary_range[0]} - ${job.salary_range[1]} an hour | {job.city}</div>
        </div>
        <div>2 weeks ago</div>
      </div>
      {expanded && (
        <div className="flex flex-col lg:flex-row mb-4 space-y-4 lg:space-x-4 lg:space-y-0">
          <div className="w-full lg:w-3/4 flex flex-col items-stretch space-y-4">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 font-bold">Department:</div>
              <div className="lg:w-1/2">{job.department.join(', ')}</div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 font-bold">Hours / Shifts:</div>
              <div className="lg:w-1/2">{job.hours} hours / {job.work_schedule}</div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 font-bold">Summary:</div>
              <div className="lg:w-1/2">{job.description}</div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-end lg:justify-center">
            <button className="rounded-md bg-blue-500 text-white py-2 px-4" onClick={handleBtnClick}>Job details</button>
            <button className="rounded-md border border-blue-500 text-blue-500 py-2 px-4 mt-0 ml-4 lg:mt-4 lg:ml-0" onClick={handleBtnClick}>Save job</button>
          </div>
        </div>
      )}
    </div>
  );
}
