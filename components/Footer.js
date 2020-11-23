import React from "react";

const Footer = () => {
  return (
    <div className="p-3 bg-white md:grid md:grid-cols-12">
      <div className="p-3 md:col-span-4">
        <h4 className="font-bold mb-6">About us</h4>
        <h6 className="mb-3">
          We are a team of nurses, doctors, technologists and executives
          dedicated to help nurses find jobs that they love.
        </h6>
        <h6 className="mb-3">
          All copyrights reserved @ 2020 - Health Explore
        </h6>
      </div>
      <div className="p-3 md:col-span-4">
        <h4 className="font-bold mb-6">Sitemap</h4>
        <h6 className="mb-3">Nurses</h6>
        <h6 className="mb-3">Employers</h6>
        <h6 className="mb-3">Social networking</h6>
        <h6 className="mb-3">Jobs</h6>
      </div>
      <div className="p-3 md:col-span-4">
        <h4 className="font-bold mb-6">Sitemap</h4>
        <h6 className="mb-3">Terms of use</h6>
        <h6 className="mb-3">Privacy policy</h6>
        <h6 className="mb-3">Cookie policy</h6>
      </div>
    </div>
  );
};

export default Footer;
