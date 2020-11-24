import { useState } from "react";

import JobDetail from "./job-detail";

export default function JobList({ hospital }) {
  const [expanded, setExpanded] = useState(false);
  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const initials = hospital.name.slice(0, 2).toUpperCase();
  return (
    <div className="my-4">
      <div className="flex space-x-4 items-center cursor-pointer mb-4" onClick={toggleExpanded}>
        <span className="rounded-md bg-gray-400 w-8 h-8 font-semibold text-white flex justify-center items-center flex-shrink-0">{initials}</span>
        <span>{hospital.total_jobs_in_hospital} jobs for {hospital.name}</span>
      </div>
      {expanded && hospital.items.map(item => <JobDetail key={item.job_id} job={item} />)}
    </div>
  );
}