import React from 'react';
import fetch from 'isomorphic-unfetch';
import {
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
} from '@material-ui/icons';
import JobItems from './jobItems';
import { Constants } from '../util/constants';

const SortArrow = ({ direction, fieldName }) => {
  if (!direction[fieldName]) {
    return <></>;
  }
  if (direction[fieldName] === 'asc') {
    return (
      <div className="w-1/12">
        <KeyboardArrowUpRounded />
      </div>
    );
  } if (direction[fieldName] === 'desc') {
    return (
      <div>
        <KeyboardArrowDownRounded />
      </div>
    );
  }
};

const JobComponent = ({ jobsData, router }) => {
  const [jobs, setJobsData] = React.useState(jobsData);
  // let [searchText, setSearchText] = React.useState('');
  const [jobItemsToggle, setJobItemsToggle] = React.useState({});
  const [direction, setDirection] = React.useState({});
  const [value, setValue] = React.useState([]);
  // const router = useRouter();

  const fetchData = async () => {
    const searchText = router.query.search || '';
    const res = await fetch(
      `${Constants.WEB_SERVICE_URL}${Constants.WEB_SERVICE_ROUTES.JOBS}/?searchText=${searchText}`,
    );
    const data = await res.json();
    setJobsData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, [router.query.search]);

  React.useEffect(() => {
    updateQuery(value);
  }, [direction]);

 const updateQuery = (value) => {
  router.push(
    {
      pathname: '/',
      query: { ...router.query, [value]: direction[value] },
    },
    undefined,
    { shallow: true },
  );
  if (!direction[value]) {
    const { query } = router;
    // const value = router.query
    delete query[value];
    router.push(
      {
        pathname: '/',
        query: { ...router.query },
      },
      undefined,
      { shallow: true },
    );
  }
 };

  const switchDirection = (value) => {
    if (!direction[value]) {
      setDirection({ ...direction, [value]: 'desc' });
    } else if (direction[value] === 'desc') {
      setDirection({ ...direction, [value]: 'asc' });
    } else {
      setDirection('');
    }
  };

  const setValueAndSwitchDirection = (value) => {
    switchDirection(value);
    setValue(value);
  };

  const jobTitle = (jobs) => {
    if (!jobs) {
      return;
    }
    const renderJobs = jobs.map((data) => {
      let liClassName = 'my-4 pb-1 flex';
      if (jobItemsToggle[data.name]) {
        liClassName = 'my-4 pb-3 border-b flex';
      }
      return (
        <div
          key={data.name + data.total_jobs_in_hospital}
          onClick={() => setJobItemsToggle({
              ...jobItemsToggle,
              [data.name]: !jobItemsToggle[data.name],
            })}
        >
          <li className={liClassName}>
            <div className="circle w-1/2 bg-gray-500 text-white rounded bg-white flex items-center justify-center">
              {data.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="lg:w-1/2 ml-5 pt-2">
              {data.total_jobs_in_hospital}
              {' '}
              for
              {' '}
              {data.name}
            </div>
          </li>
          {jobItemsToggle[data.name] && (
            <JobItems name={data.name} router={router} />
          )}
        </div>
      );
    });
    return renderJobs;
  };
  return (
    <div>
      <div className="flex p-1 pt-5">
        <div className="lg:mr-32 lg:w-1/4">7,753 job postings</div>
        <div className="flex hidden lg:block w-3/4">
          <ul className="flex justify-evenly">
            <li className="text-gray-400">Sort by</li>
            <li
              className="flex"
              onClick={() => {
                setValueAndSwitchDirection('location');
              }}
            >
              <div className="cursor-pointer">Location</div>
              <SortArrow direction={direction} fieldName="location" />
            </li>
            <li
              className="flex"
              onClick={() => {
                setValueAndSwitchDirection('job_title');
              }}
            >
              <div className="cursor-pointer">Role</div>
              <SortArrow direction={direction} fieldName="job_title" />
            </li>
            <li
              className="flex"
              onClick={() => {
                setValueAndSwitchDirection('department');
              }}
            >
              <div className="cursor-pointer">Department</div>
              <SortArrow direction={direction} fieldName="department" />
            </li>
            <li
              className="flex"
              onClick={() => {
                setValueAndSwitchDirection('required_skills');
              }}
            >
              <div className="cursor-pointer">Education</div>
              <SortArrow direction={direction} fieldName="required_skills" />
            </li>
            <li
              className="flex"
              onClick={() => {
                setValueAndSwitchDirection('experience');
              }}
            >
              <div className="cursor-pointer">Experience</div>
              <SortArrow direction={direction} fieldName="experience" />
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <ul>{jobTitle(jobs)}</ul>
      </div>
    </div>
  );
};

export default JobComponent;
