import React from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import JobComponent from '../component/jobDetail';
import Header from '../component/header';
import footer from '../component/footer';
import FilterComponent from '../component/filterComponent';
import { Constants } from '../util/constants';

const mainComponent = ({ jobs }) => {
  const [searchText, setSearchText] = React.useState('');
  const router = useRouter();
  const onInputChange = (text) => {
    setSearchText(text.toLowerCase());
  };

  React.useEffect(() => {
    if (searchText) {
      router.push(
        {
          pathname: '/',
          query: { search: searchText },
        },
        undefined,
        { shallow: true },
      );
    } else if (!searchText) {
      router.push(
        {
          pathname: '/',
        },
        undefined,
        { shallow: true },
      );
    }
  }, [searchText]);

  return (
    <div className="bg-gray-100 h-full w-full">
      <Header onInputChange={onInputChange} />
      <div className="flex lg:mt-3 lg:px-3">
        <div className="w-1/4 lg:block hidden">
          <FilterComponent
            title={Constants.FILTER_TITLE.JOB_TYPE}
            filterRoute={Constants.WEB_SERVICE_ROUTES.JOB_TYPES}
          />
          <FilterComponent
            title={Constants.FILTER_TITLE.DEPARTMENT}
            filterRoute={Constants.WEB_SERVICE_ROUTES.DEPARTMENTS}
            showMore
          />
          <FilterComponent
            title={Constants.FILTER_TITLE.WORK_SCHEDULE}
            filterRoute={Constants.WEB_SERVICE_ROUTES.WORK_SCHEDULES}
          />
          <FilterComponent
            title={Constants.FILTER_TITLE.EXPERIENCE}
            filterRoute={Constants.WEB_SERVICE_ROUTES.EXPERIENCES}
          />
        </div>
        <div className="lg:w-3/4 w-full box-border lg:ml-3 p-4 border-4 border-solid bg-white appearance-none block py-3 px-4 leading-tight text-gray-700 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none">
          <div>
            <JobComponent jobsData={jobs} router={router} />
          </div>
        </div>
      </div>
      <div className="mt-12 box-border p-4 border-4 border-solid bg-white appearance-none block py-3 px-4 leading-tight text-gray-700 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none">
        <div>{footer()}</div>
      </div>
    </div>
  );
};

mainComponent.getInitialProps = async () => {
  const res = await fetch(
    `${Constants.WEB_SERVICE_URL}${Constants.WEB_SERVICE_ROUTES.JOBS}`,
  );
  const data = await res.json();
  return { jobs: data };
};

export default mainComponent;
