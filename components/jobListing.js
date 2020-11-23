import _ from "lodash";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import NumberFormat from "react-number-format";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import SortButton from "./sortButton";

const useJobListing = () => {
  const currentJobs = useSelector((state) => {
    return _.chain(state.filteredJobs).value();
  });

  const totalJobs = useSelector((state) =>
    _.chain(state.filteredJobs)
      .flatMap((job) => job.items)
      .size()
      .value()
  );

  const dispatch = useDispatch();

  const sortTitles = [
    "Location",
    "Role",
    "Department",
    "Education",
    "Experience",
  ];

  const sorters = useSelector((state) => {
    return Object.keys(state.sorters).map((key, index) => {
      return {
        title: sortTitles[index],
        state: state.sorters[key],
        handler: () =>
          dispatch({
            type: "jobs/sortBy",
            sortField: key,
          }),
      };
    });
  });

  return {
    currentJobs,
    totalJobs,
    sorters,
  };
};

const JobListing = () => {
  const { currentJobs, totalJobs, sorters } = useJobListing();

  const renderJobDetails = (job) => {
    return (
      <table className="w-full table-auto mb-10 text-sm text-left">
        <tbody>
          <tr>
            <td className="pr-3 py-2 whitespace-no-wrap font-bold tracking-wider">
              Department
            </td>
            <td className="px-3 py-2">
              {_.chain(job.department).values().join(", ").value()}
            </td>
            <td rowSpan="3" className="pl-3 py-2 whitespace-no-wrap text-right">
              <div className="flex flex-col ...">
                <div className="pb-2">
                  <button className="h-10 px-4 text-xs text-white border bg-blue-clipboard border-blue-clipboard rounded-lg focus:shadow-outline">
                    Job Details
                  </button>
                </div>
                <div>
                  <button className="h-10 px-4 text-xs text-blue-clipboard border border-blue-clipboard rounded-lg focus:shadow-outline">
                    Save Job
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="pr-3 py-2 whitespace-no-wrap font-bold tracking-wider">
              Hours / shifts
            </td>
            <td className="px-3 py-2">
              {job.hours[0]} hours / {job.work_schedule}
            </td>
          </tr>
          <tr>
            <td className="pr-3 py-2 whitespace-no-wrap font-bold tracking-wider">
              Summary
            </td>
            <td className="px-3 py-2">{job.description}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderJobs = (jobs) => {
    return _.map(jobs, (job, index) => (
      <Accordion allowZeroExpanded key={index}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <hr />
              <div className="p-2">
                <div className="flex flex-row items-center justify-between mb-1">
                  <div className="flex flex-col">
                    <span className="text-black text-small font-bold pb-1">
                      {job.job_title}
                    </span>
                    <span className="text-grey-500 pt-1 text-xs">
                      {job.job_type} |{" "}
                      <NumberFormat
                        prefix="$"
                        value={job.salary_range[0]}
                        displayType={"text"}
                        dol
                        thousandSeparator={true}
                        renderText={(value) => value}
                      />{" "}
                      -{" "}
                      <NumberFormat
                        prefix="$"
                        value={job.salary_range[1]}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value) => value}
                      />{" "}
                      an hour | {job.city}
                    </span>
                  </div>
                  <div className="lowercase font-light text-sm flex flex-row items-center justify-start whitespace-no-wrap">
                    <div className="flex flex-row items-center justify-start text-black">
                      <span className="text-grey-500 pt-1 text-xs">
                        {moment(
                          job.created,
                          "YYYY-MM-DDTHH:mm:ss.zz"
                        ).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="p-2">{renderJobDetails(job)}</div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    ));
  };

  const renderHospitalJobs = (currentJobs) => {
    return (
      <Accordion allowZeroExpanded>
        {_.map(currentJobs, (hospital, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="flex items-start justify-start p-2 space-x-4">
                  <div className="flex items-start justify-start">
                    <span className="h-6 w-6 bg-gray-300 text-white p-4 flex items-center justify-center rounded-md text-lg font-display font-bold uppercase">
                      {hospital.name.substring(0, 2)}
                    </span>
                  </div>
                  <div className="flex flex-col w-full self-center">
                    <div className="text-sm">
                      {hospital.total_jobs_in_hospital} jobs for {hospital.name}
                    </div>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {renderJobs(hospital.items)}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderSorters = (sorters) => {
    return (
      <ol className="list-none flex flex-row items-center justify-start">
        <li className="mr-2 flex items-center text-gray-400" key="0">
          Sort By
        </li>
        {sorters.map((sorter, index) => {
          return (
            <li className="mr-1 flex items-center" key={index + 1}>
              <SortButton
                title={sorter.title}
                onSort={sorter.handler}
                state={sorter.state} />
            </li>
          );
        })}
      </ol>
    );
  };

  const renderNoData = () => {
    return (
      <div className="w-full flex items-center justify-start p-4 bg-white dark:bg-grey-800 text-blue-500 shadow p-4">
        <div className="flex-shrink"></div>
        <div className="flex-grow text-center">
          There are no jobs available at this time.
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-10">
        <div className="flex flex-col">
          <div className="text-sm font-light text-grey-500">
            <NumberFormat
              value={totalJobs}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span className="font-bold">{value}</span>}
            />{" "}
            job postings
          </div>
        </div>
        <div className="hidden sm:block text-xs tracking-wider flex flex-row items-center justify-start whitespace-no-wrap">
          <div className="flex flex-row items-center justify-start text-black">
            {renderSorters(sorters)}
          </div>
        </div>
      </div>
      {currentJobs && currentJobs.length
        ? renderHospitalJobs(currentJobs)
        : renderNoData()}
    </>
  );
};

export default JobListing;
