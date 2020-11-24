import React, { useState } from "react";

const Nav = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const links = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Jobs" },
    { href: "#", label: "Professional Network" },
    { href: "#", label: "Lounge" },
    { href: "#", label: "Salary" },
  ];

  return (
    <nav className="bg-white">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center mr-2 sm:hidden">
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
          <div className="flex-grow md:flex-grow-0 flex justify-between">
            <div className="flex-shrink-0 flex items-center">
              <label className="text-base text-blue-clipboard font-semibold uppercase">
                Health Explore
              </label>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6 flex flex-row items-center">
            <div className="flex space-x-4">
              {links.map(({ href, label }, index) => (
                <a key={index}
                  href={href}
                  className="px-3 py-2 rounded-md text-sm font-normal text-gray uppercase"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-right sm:ml-6 sm:pr-0">
            <div className="hidden sm:flex mr-3 relative">
              <button className="rounded-md border border-blue-clipboard border-solid p-3 pt-2 pb-2 text-blue-clipboard text-sm uppercase">
                Create Job
              </button>
            </div>
            <div className="flex mr-3 relative">
              <button className="flex text-sm rounded-full">
                <div className="relative inline-block">
                  <div className="border-primary bg-blue-clipboard text-primary w-8 h-8 rounded-full inline-flex items-center align-middle justify-center text-md text-white uppercase">
                    Jo
                  </div>
                  <span className="absolute top-0 right-0 uppercase font-bold inline-flex text-center p-2 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full bg-red-500 text-white shadow-outline-white border-2 border-white transform translate-x-1/2 -translate-y-1/2">
                    2
                  </span>
                </div>
              </button>
            </div>
            <div className="hidden sm:flex mr-3 relative">
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-normal text-gray uppercase"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={(menuOpened ? "block" : "hidden") + " sm:hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(({ href, label }, index) => (
            <a
              key={index}
              href={href}
              className="block px-3 py-2 rounded-md text-sm font-normal text-gray uppercase"
            >
              {label}
            </a>
          ))}
          <button className="block rounded border border-blue-clipboard border-solid p-3 pt-2 pb-2 text-blue-clipboard text-sm uppercase">
            Create Job
          </button>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-sm font-normal text-gray uppercase"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
