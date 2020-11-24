const Footer = () => {
  return (
    <footer className="p-5 bg-white">
      <div className="grid grid-cols-4 gap-4 text-black">
        <div className="col-span-4 md:col-span-2">
          <label className="text-lg font-bold mb-2 mt-2">About Us</label>
          <p className="text-sm mt-1 block">
            We are a team of nurses, doctors, technologies and executives
            dedicated to help nurses find jobs that they love
          </p>
          <p className="text-sm mt-1 block">
            All copyrights reserved &copy; {(new Date().getFullYear())} - Health Explore
          </p>
        </div>
        <div className="col-span-4 md:col-span-1">
          <label className="text-lg font-bold mb-2 mt-2">Sitemap</label>
          <a href="/#" className="text-sm mt-1 block">
            Nurses
          </a>
          <a href="/#" className="text-sm mt-1 block">
            Employers
          </a>
          <a href="/#" className="text-sm mt-1 block">
            Social Networking
          </a>
          <a href="/#" className="text-sm mt-1 block">
            Jobs
          </a>
        </div>
        <div className="col-span-4 md:col-span-1">
          <label className="text-lg font-bold mb-2 mt-2">Privacy</label>
          <a href="/#" className="text-sm mt-1 block">
            Terms of Use
          </a>
          <a href="/#" className="text-sm mt-1 block">
            Privacy Policy
          </a>
          <a href="/#" className="text-sm mt-1 block">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
