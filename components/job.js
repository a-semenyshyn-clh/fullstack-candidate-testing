import { useState } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";

const Job = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <hr />
      <div className="p-2">
        <div
          className="flex flex-row items-center justify-between mb-1"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex flex-col">
            <span className="text-black text-small font-bold pb-1">
              {data.job_title}
            </span>
            <span className="text-grey-500 pt-1 text-xs">
              {data.job_type} |{" "}
              <NumberFormat
                prefix="$"
                value={data.salary_range[0]}
                displayType={"text"}
                dol
                thousandSeparator={true}
              />{" "}
              -{" "}
              <NumberFormat
                prefix="$"
                value={data.salary_range[1]}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              an hour | {data.city}
            </span>
          </div>
          <div className="lowercase font-light text-sm flex flex-row items-center justify-start whitespace-no-wrap">
            <div className="flex flex-row items-center justify-start text-black">
              <span className="text-grey-500 pt-1 text-xs">
                {moment(data.created, "YYYY-MM-DDTHH:mm:ss.zz").fromNow()}
              </span>
            </div>
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
                    <p className="text-sm">{data.department.join(", ")}</p>
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
                <button className="rounded-md border bg-blue-400 p-3 pt-2 pb-2 text-white text-sm m-1">
                  Job details
                </button>
                <button className="rounded-md border border-blue-400 border-solid p-3 pt-2 pb-2 text-blue-400 text-sm m-1">
                  Save job
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Job;
