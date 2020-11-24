const footer = () => (
  <div className="w-full lg:flex">
    <div className="lg:w-2/4">
      <div className="font-bold">About us</div>
      <div className="mt-5">
        We are team of nurses, doctors, technologists and executives dedicated
        to help nurses find jobs that they love
        <div className="mt-5 mb-5">
          All copyrights reserved © 2020 - Health Explore
        </div>
      </div>
    </div>
    <div className="lg:w-1/5 lg:ml-6">
      <div className="font-bold">Sitemap</div>
      <div>
        <ul>
          <li className="mt-5 hover:underline">
            <div className="cursor-pointer">Nurses</div>
          </li>
          <li className="mt-5 hover:underline">
            <div className="cursor-pointer">Employers</div>
          </li>
          <li className="mt-5 hover:underline">
            <div className="cursor-pointer">Social Networking</div>
          </li>
          <li className="mt-5 mb-5 hover:underline">
            <div className="cursor-pointer">Jobs</div>
          </li>
        </ul>
      </div>
    </div>
    <div className="lg:w-1/5">
      <div className="font-bold">Privacy</div>
      <div>
        <ul>
          <li className="mt-5 hover:underline">
            <div className="cursor-pointer">Terms of use</div>
          </li>
          <li className="mt-5 hover:underline">
            <div className="cursor-pointer">Privacy policy</div>
          </li>
          <li className="mt-5 hover:underline">
            <div className="cursor-pointer">Cookie policy</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );

export default footer;
