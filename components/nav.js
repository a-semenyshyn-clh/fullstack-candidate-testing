export default function Nav() {
  return (
    <nav className="bg-white text-sm">
      <ul className="flex items-center justify-between py-2 px-4">
        <li className="text-blue-500 font-semibold text-lg ml-4">HEALTH EXPLORE</li>
        <ul className="flex items-center justify-between space-x-6">
          <li><button className="font-semibold">PROFILE</button></li>
          <li><button className="font-semibold">JOBS</button></li>
          <li><button className="font-semibold">PROFESSIONAL NETWORK</button></li>
          <li><button className="font-semibold">LOUNGE</button></li>
          <li><button className="font-semibold">SALARY</button></li>
        </ul>
        <div className="flex space-x-6 items-stretch">
          <button className="border border-blue-500 text-blue-500 rounded-md font-semibold my-2 px-3">CREATE JOB</button>
          <div className="relative p-2">
            <button className="bg-blue-500 h-10 w-10 rounded-full text-white font-semibold">JO</button>
            <div className="bg-red-500 text-white absolute top-0 right-0 text-xs h-6 w-6 rounded-full border-2 border-white flex justify-center items-center">2</div>
          </div>
          <div className="flex items-center"><button className="font-semibold">LOGOUT</button></div>
        </div>
      </ul>
    </nav>
  );
}
