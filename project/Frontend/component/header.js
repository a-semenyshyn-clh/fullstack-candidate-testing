import React from 'react';

const Header = ({ onInputChange }) => {
  const [searchText, setSearchText] = React.useState('');

  const updateInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <div className="p-4 shadow rounded bg-white flex">
        <div className="block lg:hidden mt-1">
          <button className="tailwind-burger flex items-center px-3 py-2 border rounded text-blue-700 border-blue-700">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="flex w-full">
          <li className="mr-10">
            <a
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4 font-bold"
              href="#"
            >
              HEALTH EXPLORE
            </a>
          </li>

          <div className="submenu lg:flex lg:items-center lg:w-auto hidden">
            <li className="mr-2">
              <a
                className="inline-block border border-white rounded hover:border-gray-200 text-black hover:bg-gray-200 py-2 px-4"
                href="#"
              >
                PROFILE
              </a>
            </li>
            <li className="mr-2">
              <a
                className="inline-block border border-white rounded hover:border-gray-200 text-black hover:bg-gray-200 py-2 px-4"
                href="#"
              >
                JOBS
              </a>
            </li>
            <li className="mr-2">
              <a
                className="inline-block border border-white rounded hover:border-gray-200 text-black hover:bg-gray-200 py-2 px-4"
                href="#"
              >
                PROFESSIONAL NETWORK
              </a>
            </li>
            <li className="mr-2">
              <a
                className="inline-block border border-white rounded hover:border-gray-200 text-black hover:bg-gray-200 py-2 px-4"
                href="#"
              >
                LOUNGE
              </a>
            </li>
            <li className="mr-24">
              <a className="inline-block py-2 px-4 text-black" href="#">
                SALARY
              </a>
            </li>
            <li className="mr-4 border-solid border-2 border-blue-500 rounded-md">
              <a className="inline-block py-2 px-4 text-blue-500" href="#">
                CREATE JOB
              </a>
            </li>
            <li>
              <div className="circle bg-blue-500 text-white rounded-full bg-white flex items-center justify-center">
                PR
              </div>
            </li>
            <li className="mr-2">
              <a className="inline-block py-2 px-4 text-black" href="#">
                LOGOUT
              </a>
            </li>
          </div>
        </ul>
        <div className="circle bg-blue-500 text-white lg:hidden  rounded-full bg-white flex items-center justify-center">
          PR
        </div>
      </div>
      <div className="flex w-full sm:mt-0 sm:mb-0 lg:mt-3 lg:mb-3 md:mb-0 lg:px-3">
        <form className="appearance-none block w-full leading-tight text-gray-700 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none" onSubmit={(e) => { e.preventDefault(); onInputChange(searchText); }}>
          <input
            id="search-bs-class"
            className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
            type="text"
            onChange={updateInput}
            placeholder="Search for any job, title, keywords, or company"
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
