import { useState } from "react";

import JobList from "./job-list";

export default function JobResults({ jobs }) {

  const [expandedHospitalIndex, setExpandedHospitalIndex] = useState(-1);

  function toggleHospitalIndex(i) {
    if ( i === expandedHospitalIndex ) {
      // Already expanded, collapse
      setExpandedHospitalIndex(-1);
    } else {
      // Not expanded, expand
      setExpandedHospitalIndex(i);
    }
  }

  const hospitals = jobs;
  return (
    <div className="bg-white my-4 p-6">
      <div className="flex justify-between mb-8 mt-2">
        <div>
          <span className="font-bold">7,753</span> job postings
        </div>
        <div className="flex space-x-4">
          <div className="text-gray-500">Sort by</div>
          <button>Location</button>
          <button>Role</button>
          <button>Department</button>
          <button>Education</button>
          <button>Experience</button>
        </div>
      </div>
      <div className="mx-4">
      {
        hospitals.map((hospital, i) =>
          <JobList key={i} hospital={hospital} expanded={expandedHospitalIndex === i} onClick={() => toggleHospitalIndex(i)}/>)
      }
      </div>
    </div>
  )
}
