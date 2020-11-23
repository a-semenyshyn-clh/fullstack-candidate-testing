import React, { useState } from "react";
import moment from "moment";
import JobDetails from "./JobDetails";

const JobItem = ({ data, onClick }) => {
  const [selected, setSelected] = useState(false);

  const shortDescription = `${data.job_type} | ${data.salary_range
    .map((x) => `$x`)
    .join(" - ")} an hour | ${data.address}, ${data.state}`;

  const getDifference = (date) => {
    if (date) {
      const now = moment();
      const startTime = moment(date);
      const duration = now.diff(startTime, "week");

      if (duration > 1) {
        return `${duration} weeks ago`;
      } else if (duration === 1) {
        return `${duration} week ago`;
      }
      const days = now.diff(startTime, "day");
      if (days > 1) {
        return `${days} days ago`;
      } else if (days === 1) {
        return `${days} day ago`;
      }
      return "";
    }

    return "";
  };

  return (
    <React.Fragment>
      <div
        className="border-t py-3 px-3 sm:flex justify-between items-center cursor-pointer hover:bg-gray-100"
        onClick={() => setSelected(!selected)}
      >
        <div>
          <h4 className="font-bold">{data.job_title}</h4>
          <h5>{shortDescription}</h5>
        </div>
        <span>{getDifference(data.created)}</span>
      </div>
      {selected && <JobDetails data={data} />}
    </React.Fragment>
  );
};

export default JobItem;
