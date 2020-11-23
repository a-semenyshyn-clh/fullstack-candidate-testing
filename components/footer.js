import React from "react";

export default function Footer() {

  return (
    <div className="w-full bg-white">
      <div className="flex flex-wrap -mx-2 p-6 font-thin">
        <div className="w-full lg:w-1/2 px-2">
          <div className="mt-6 text-xl font-semibold">About us</div>
          <p className="">We are a team of nurses, doctors, technologist and executices dedicated to help nurses find jobs that they love.</p>
          <p className="pt-2">All copyrights reserved &copy; {(new Date().getFullYear())} - Health Explore</p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
          <div className="mt-6 text-xl font-semibold">Sitemap</div>
            <ul className="">
              <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Nurses</a></li>
              <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Employers</a></li>
              <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Social networking</a></li>
              <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Jobs</a></li>
            </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
          <div className="mt-6 text-xl font-semibold">Privacy</div>
          <ul className="">
            <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Terms of use</a></li>
            <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Privacy policy</a></li>
            <li><a href="#" className="block rounded-md text-base hover:text-white hover:bg-gray-700">Cookie policy</a></li>
          </ul>
        </div>
        
      </div>

    </div>
  );
}
