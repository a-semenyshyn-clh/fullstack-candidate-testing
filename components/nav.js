import { useState } from "react";

const navLinks = [
  {
    name: 'PROFILE',
    link: '#'
  },
  {
    name: 'JOBS',
    link: '#'
  },
  {
    name: 'PROFESSIONAL NETWORK',
    link: '#'
  },
  {
    name: 'LOUNGE',
    link: '#'
  },
  {
    name: 'SALARY',
    link: '#'
  }
]

export default function Nav() {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (<>
    <nav className="bg-white shadow text-sm flex pl-4 lg:pl-0 lg:fixed top-0 w-full">
      <button className="block lg:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        <img className="w-6" src="/images/hamburger.png" alt=""/>
      </button>
      <ul className="flex items-center justify-between py-2 px-4 flex-grow">
        <li className="text-blue-500 font-semibold text-lg lg:ml-4">HEALTH EXPLORE</li>
        <ul className="hidden lg:flex items-center justify-between space-x-6">
          {
            navLinks.map((link, i) =>
              <li key={i}><a href={link.link} className="font-semibold">{link.name}</a></li>
            )
          }
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
    {
      mobileNavOpen && (
        <ul className="flex lg:hidden flex-col bg-white items-start space-y-2 pb-4">
          {
            navLinks.map((link, i) =>
              <li key={i} className="py-2 mx-4">
                <a href={link.link} className="font-semibold">{link.name}</a>
              </li>
            )
          }
          <button className="py-1 mx-2 border border-blue-500 text-blue-500 rounded-md font-semibold my-2 px-2">CREATE JOB</button>
          <li className="py-2 mx-4">
            <a href="#" className="font-semibold">LOGOUT</a>
          </li>
        </ul>
      )
    }
  </>);
}
