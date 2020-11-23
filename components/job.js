import React, { useState } from "react";
import PropTypes from "prop-types";

const Job = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);

  const getAgo = (timestamp) => {
    const date = new Date(timestamp);
    const d = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    const min = 60;
    const hour = min * 60;
    const day = hour * 24;
    const week = day * 7;

    if (d < min * 1) {
      return {
        value: `just before`,
        next: min - d,
      };
    } else if (d < hour) {
      const minutes = Math.floor(d / min);
      return `${minutes} minutes ago`;
    } else if (d < day) {
      const hours = Math.floor(d / hour);
      return `${hours} hour${hours > 1 ? `s` : ``} ago`;
    } else if (d < week) {
      const days = Math.floor(d / day);
      return `${days} day${days > 1 ? `s` : ``} ago`;
    } else {
      const weeks = Math.floor(d / week);
      return `${weeks} week${weeks > 1 ? `s` : ``} ago`;
    }
  };

  return (
    <div className="pl-2 pr-2">
      <div
        className="grid grid-cols-6 gap-4 border-t border-gray-300 border-solid mt-2 cursor-pointer position-relative"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="col-span-6 md:col-span-5">
          <label className="font-bold text-sm mb-0 mt-2 block cursor-pointer">
            {data.job_title}
          </label>
          <label className="text-sm cursor-pointer">
            {`${data.job_type} | $${data.salary_range[0]} - $${data.salary_range[1]} an hour | ${data.city}`}
          </label>
        </div>
        <div className="text-left pr-4 col-span-6 md:col-span-1 md:text-right pt-3">
          <label className="mt-4 text-sm cursor-pointer">
            {getAgo(data.created)}
          </label>
        </div>
      </div>

      {expanded && (
        <div className="mt-4">
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 md:col-span-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-3 md:col-span-1">
                  <label className="font-bold text-sm">{"Department"}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <p className="text-sm">{data.department.join(",")}</p>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <label className="font-bold text-sm">
                    {"Hours / shifts"}
                  </label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <p className="text-sm">
                    {`${data.hours[0]} hours / ${data.work_schedule}`}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <label className="font-bold text-sm">{"Summary"}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <p className="text-sm">{data.description}</p>
                </div>
              </div>
            </div>
            <div className="col-span-6 md:col-span-1 text-left pt-3 md:text-right">
              <button className="rounded border bg-blue-400 p-3 pt-2 pb-2 text-white text-sm m-1">
                {"Job details"}
              </button>
              <button className="rounded border border-blue-400 border-solid p-3 pt-2 pb-2 text-blue-400 text-sm m-1">
                {"Save job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Job.propTypes = {
  data: PropTypes.any,
};

export default Job;
