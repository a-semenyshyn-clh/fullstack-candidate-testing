export default function Nav() {
  return (
    <nav className="bg-white text-sm flex pl-4 lg:pl-0">
      <button className="block lg:hidden">
        <img className="w-6" src="/images/hamburger.png" alt=""/>
      </button>
      <ul className="flex items-center justify-between py-2 px-4 flex-grow">
        <li className="text-blue-500 font-semibold text-lg lg:ml-4">HEALTH EXPLORE</li>
        <ul className="hidden lg:flex items-center justify-between space-x-6">
          <li><button className="font-semibold">PROFILE</button></li>
          <li><button className="font-semibold">JOBS</button></li>
          <li><button className="font-semibold">PROFESSIONAL NETWORK</button></li>
          <li><button className="font-semibold">LOUNGE</button></li>
          <li><button className="font-semibold">SALARY</button></li>
        </ul>
        <div className="flex space-x-6 items-stretch">
          <button className="hidden lg:block border border-blue-500 text-blue-500 rounded-md font-semibold my-2 px-3">CREATE JOB</button>
          <div className="relative p-2">
            <button className="bg-blue-500 h-10 w-10 rounded-full text-white font-semibold">JO</button>
            <div className="bg-red-500 text-white absolute top-0 right-0 text-xs h-6 w-6 rounded-full border-2 border-white flex justify-center items-center">2</div>
          </div>
          <div className="items-center hidden lg:flex"><button className="font-semibold">LOGOUT</button></div>
        </div>
      </ul>
    </nav>
  );
}
