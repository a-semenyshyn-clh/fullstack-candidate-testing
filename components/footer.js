export default function Footer() {
  return (
    <footer className="flex space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 p-4 bg-white flex-col lg:flex-row border-t border-gray-300 lg:border-t-0">
      <div className="lg:w-1/2 md:w-full flex flex-col space-y-2">
        <h3 className="text-lg font-bold">About Us</h3>
        <p>We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</p>
        <p>All copyrights reserved &copy; 2020 - Health Explore</p>
      </div>
      <div className="lg:w-1/4 flex flex-col space-y-2">
        <h3 className="text-lg font-bold">Sitemap</h3>
        <div><a href="#">Nurses</a></div>
        <div><a href="#">Employers</a></div>
        <div><a href="#">Social Networking</a></div>
        <div><a href="#">Jobs</a></div>
      </div>
      <div className="lg:w-1/4 flex flex-col space-y-2">
        <h3 className="text-lg font-bold">Privacy</h3>
        <div><a href="#">Terms of use</a></div>
        <div><a href="#">Privacy Policy</a></div>
        <div><a href="#">Cookie Policy</a></div>
      </div>
    </footer>
  );
}
