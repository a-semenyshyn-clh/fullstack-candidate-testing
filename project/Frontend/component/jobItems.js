import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Constants } from '../util/constants';
import JobDescription from './jobDescription';

const JobItems = ({ name, router }) => {
  const [jobItems, setJobItems] = React.useState([]);
  const [displayJobItems, setDisplayJobItems] = React.useState([]);
  const [jobDescriptionToggle, setJobDescriptionToggle] = React.useState({});

  const sortData = (items) => {
    const {
      location, role, department, education, experience,
     } = router.query;
    const sortingKeys = {
      location, role, department, education, experience,
     };
    const sortingKeysArray = Object.keys(sortingKeys);
    const sortedJobItems = [...items];
    sortedJobItems.sort((jobItem1, jobItem2) => {
      let cumulativeResult = 0;
      sortingKeysArray.forEach((sortingKey) => {
        const order = sortingKeys[sortingKey];
        if (order) {
          let compareResult;
          const value1 = jobItem1[sortingKey];
          const value2 = jobItem2[sortingKey];
          if (typeof value1 === 'string') {
            compareResult = value1.localeCompare(value2);
          } else if (value1 instanceof Array) {
            compareResult = value1.length - value2.length;
          }
          if (order === 'desc') {
            compareResult *= -1;
          }
          cumulativeResult = cumulativeResult || compareResult;
        }
      });
      return cumulativeResult;
    });
    setDisplayJobItems(sortedJobItems);
  };

  const fetchData = async () => {
    const searchText = router.query.search || '';
    const res = await fetch(
      `${Constants.WEB_SERVICE_URL}${Constants.WEB_SERVICE_ROUTES.JOB_ITEMS}/?jobName=${name}&searchText=${searchText}`,
    );
    const data = await res.json();
    setJobItems(data);
    setDisplayJobItems(data);
    sortData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, [router.query.search, name]);

  React.useEffect(() => {
    sortData(jobItems);
  }, [router.query]);

  const jobDetailItems = () => {
    if (!displayJobItems) {
      return;
    }
    const renderJobItems = displayJobItems.map((item, index) => (
      <li
        className="mt-5 my-4 pb-1 border-b"
        key={item.job_title}
        onClick={(event) => {
            event.stopPropagation();
            setJobDescriptionToggle({
              ...jobDescriptionToggle,
              [item.job_id]: !jobDescriptionToggle[item.job_id],
            });
          }}
      >
        <div>
          <div className="font-bold">{item.job_title}</div>
          <div className="float-right mt-1">3 weaks ago</div>
        </div>
        <div className="pt-1 bottom-b pb-4">
          {item.job_type}
          {' '}
          |
          {item.salary_range[0]}
          {' '}
          -
          {item.salary_range[1]}
          {' '}
          an
          hour |
          {item.city}
        </div>
        {jobDescriptionToggle[item.job_id] && (
        <JobDescription name={name} jobId={item.job_id} />
          )}
      </li>
      ));
    return renderJobItems;
  };

  const jobItemJsx = jobDetailItems();
  return <div>{jobItemJsx}</div>;
};

export default JobItems;
