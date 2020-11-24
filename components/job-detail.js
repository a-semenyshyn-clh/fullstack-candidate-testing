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
    <div className="cursor-pointer" onClick={toggleExpanded}>
      <div className="border-t border-gray-300 -mx-2 px-2 py-4 flex justify-between items-center">
        <div>
          <div className="font-semibold">{job.job_title}</div>
          <div>{job.job_type} | ${job.salary_range[0]} - ${job.salary_range[1]} an hour | {job.city}</div>
        </div>
        <div>2 weeks ago</div>
      </div>
      {expanded && (
        <div className="flex mb-4 space-x-4">
          <div className="w-3/4 flex flex-col items-stretch space-y-4">
            <div className="flex">
              <div className="w-1/2 font-bold">Department:</div>
              <div className="w-1/2">{job.department.join(', ')}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold">Hours / Shifts:</div>
              <div className="w-1/2">{job.hours} hours / {job.work_schedule}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold">Summary:</div>
              <div className="w-1/2">{job.description}</div>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-end justify-center">
            <button className="rounded-md bg-blue-500 text-white py-2 px-4" onClick={handleBtnClick}>Job details</button>
            <button className="rounded-md border border-blue-500 text-blue-500 py-2 px-4 mt-4" onClick={handleBtnClick}>Save job</button>
          </div>
        </div>
      )}
    </div>
  );
}
