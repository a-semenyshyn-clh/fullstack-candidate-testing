import { useState } from "react";
import Job from "./job";

const JobListing = (props) => {
  const { list } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pt-1 pb-1">
      <div className="d-flex cursor-pointer">
        <div
          className="flex items-start justify-start p-1 space-x-4"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start justify-start">
            <span className="h-6 w-6 bg-gray-300 text-white p-4 flex items-center justify-center rounded-md text-lg font-display font-bold uppercase">
              {list.name.substring(0, 2)}
            </span>
          </div>
          <div className="flex flex-col w-full self-center">
            <div className="text-sm">
              {list.total_jobs_in_hospital} jobs for {list.name}
            </div>
          </div>
        </div>
        {expanded && (
          <div>
            {list.items.map((item) => (
              <Job data={item} key={item.job_id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
