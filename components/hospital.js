import React, { useState } from "react";
import Avatar from "react-avatar";
import Job from "./job";
import PropTypes from "prop-types";

const Hospital = (props) => {
  const { hospital } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pt-2 pb-2">
      <div
        className="d-flex cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Avatar
          name={hospital.name}
          className="w-8 h-8"
          color="#bbbbbb"
          maxInitials={2}
          round={"6px"}
        />
        <label className="text-sm ml-3 mt-1 cursor-pointer">
          {`${hospital.total_jobs_in_hospital.toLocaleString()} jobs for ${
            hospital.name
          }`}
        </label>
      </div>
      {expanded && (
        <div>
          {hospital.items.map((item) => (
            <Job data={item} key={item.job_id} />
          ))}
        </div>
      )}
    </div>
  );
};

Hospital.propTypes = {
  hospital: PropTypes.any,
};

export default Hospital;
