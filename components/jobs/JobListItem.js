import React, { useState } from 'react';
import JobInfo from './JobInfo';

const JobListItem = (props) => {
  const [showJobs, setShowJobs] = useState(false)
  const changeJobsStatus = () => {
    setShowJobs(!showJobs)
  }

  return (
    <div>
      <div className="flex py-2 px-2 flex items-center cursor-pointer" onClick={changeJobsStatus}>
        <h1 className="bg-gray-400 w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold mx-2 flex-shrink-0">
          { props.jobs.name.substr(0, 2).toUpperCase() }</h1>
        <h1 className="mx-2">
          {props.jobs.items.length} jobs for {props.jobs.name}</h1>
      </div>
      {showJobs && props.jobs.items.map((item, idx) => (
        <JobInfo jobInfo={item} key={idx}/>
      ))}
    </div>
  )
}

export default JobListItem;