import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Constants } from '../util/constants';

const JobDescription = ({ name, jobId }) => {
  const [jobDescription, setJobDescription] = React.useState({});

  const fetchData = async () => {
    const res = await fetch(
      `${Constants.WEB_SERVICE_URL}${Constants.WEB_SERVICE_ROUTES.JOB_DESCRIPTION}/?jobName=${name}&jobId=${jobId}`,
    );
    const data = await res.json();
    setJobDescription(data);
  };

  React.useEffect(() => {
    fetchData();
  }, [name]);

  const renderJobDescription = (jobDescription) => {
    const { department } = jobDescription;
    if (!jobDescription || !department) {
      return;
    }
    return (
      <div>
        <div className="w-full lg:flex pb-2">
          <div className="lg:w-1/3 font-bold">Department:</div>
          <div className="lg:w-1/3">{department.join()}</div>
        </div>
        <div className="w-full lg:flex pb-2">
          <div className="lg:w-1/3 font-bold">Hours/ shifts:</div>
          <div className="lg:w-1/3">
            {jobDescription.hours}
            {' '}
            /
            {' '}
            {jobDescription.work_schedule}
          </div>
        </div>
        <div className="w-full lg:flex pb-2">
          <div className="lg:w-1/3 font-bold">Summary:</div>
          <div className="lg:w-1/3">{jobDescription.description}</div>
          <div className="lg:w-1/3 lg:text-right">
            <div className="lg:w-full mr-5 inline-block">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Job details
              </button>
            </div>
            <div className="lg:w-full lg:pl-6 inline-block">
              <button className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
                Save job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const jobDescriptionJsx = renderJobDescription(jobDescription);
  return <div>{jobDescriptionJsx}</div>;
};

export default JobDescription;
