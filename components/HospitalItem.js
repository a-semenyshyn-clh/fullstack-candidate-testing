import React, { useState } from "react";
import JobItem from "./JobItem";

const HospitalItem = ({ data }) => {
  const [selected, setSelected] = useState(false);

  const iconTitle = data.name.slice(0, 2).toUpperCase();
  const title = `${data.total_jobs_in_hospital} jobs for ${data.name}`;

  return (
    <React.Fragment>
      <div
        className="flex justify-start items-center cursor-pointer p-3 hover:bg-gray-100"
        onClick={() => setSelected(!selected)}
      >
        <div className="p-3 w-12 h-12 rounded-md flex justify-center items-center bg-gray-500 text-white">
          {iconTitle}
        </div>
        <div className="text-black ml-5">{title}</div>
      </div>
      {selected &&
        data.items.map((item, index) => (
          <JobItem key={`job-${index}`} data={item} />
        ))}
    </React.Fragment>
  );
};

export default HospitalItem;
