import React from "react";

const JobDetails = ({ data }) => {
  return (
    <div className="border-t p-3 md:grid grid-cols-12 gap-4">
      <div className="font-bold col-start-1 col-end-5">Department</div>
      <div className="col-start-5 col-end-9 mb-3 md:mb-0">
        {data.department ? data.department.join(", ") : ""}
      </div>
      <div className="font-bold col-start-1 col-end-5">Hours / shifts</div>
      <div className="col-start-5 col-end-9 mb-3 md:mb-0">{`${
        data.hours ? data.hours.join(" - ") : ""
      } / ${data.work_schedule}`}</div>
      <div className="font-bold col-start-1 col-end-5">Summary</div>
      <div className="col-start-5 col-end-9 mb-3 md:mb-0">
        {data.description}
      </div>
      <div className="row-start-1 row-end-4 col-start-9 col-end-13 flex justify-start items-center md:justify-center md:items-end md:flex-col">
        <button className="bg-blue-500 text-white px-5 py-2 mr-3 md:mr-0 md:mb-3 rounded-md">
          Job details
        </button>
        <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-md">
          Save Job
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
