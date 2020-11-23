import React, { useState } from "react";
import Avatar from "react-avatar";

const NavBar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <nav className="bg-white">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400"
              aria-expanded="false"
              onClick={() => setMenuOpened(!menuOpened)}
            >
              <svg
                className="fill-current text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between	">
            <div className="flex-shrink-0 flex items-center">
              <label className="text-base text-blue-600 font-bold">
                HEALTH EXPLORE
              </label>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray"
                >
                  PROFILE
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray"
                >
                  JOBS
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray"
                >
                  PROFESSIONAL NETWORK
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray"
                >
                  LONGUE
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray"
                >
                  SALARY
                </a>
                <button className="rounded border border-blue-400 border-solid p-3 pt-2 pb-2 text-blue-400 text-sm">
                  {"CREATE JOB"}
                </button>
                <Avatar
                  name={"Lai Kang"}
                  className="w-8 h-8"
                  color="#bbbbbb"
                  round={true}
                />
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray"
                >
                  LOGOUT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={(menuOpened ? "block" : "hidden") + " sm:hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900"
          >
            PROFILE
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900"
          >
            JOBS
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900"
          >
            PROFESSIONAL NETWORK
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900"
          >
            LONGUE
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900"
          >
            SALARY
          </a>
          <button className="rounded border border-blue-400 border-solid p-3 pt-2 pb-2 text-blue-400 text-sm block">
            {"CREATE JOB"}
          </button>

          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900"
          >
            LOGOUT
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
