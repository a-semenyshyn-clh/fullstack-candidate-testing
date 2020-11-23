import Link from 'next/link';
import Menu from './menu';
export default function Nav() {
  return (
    <header className="flex items-center shadow text-gray-700 fixed bg-white justify-center w-full h-16 z-10 px-6tracking-tight">
      <div className="container flex justify-between items-center">
      <div className="flex justify-center items-center">
        <span className="lg:hidden">
          <Menu
            title="Options"
            options={[
              () => (
                <span className="border border-blue-500 text-blue-500 px-2 py-1 flex w-full rounded items-center justify-center">
                  Create Job
                </span>
              ),
              'Profile',
              'Jobs',
              'Professional Network',
              'Lounge',
              'Salary',
            ]}
            optionHandle={(e) => console.log(e.target)}
          />
        </span>

        <Link href="/">
          <h1 className="text-blue-500 text-xl mx-2">Health Explore</h1>
        </Link>
      </div>

      <div className="hidden lg:flex space-x-10">
        <h2>Profile</h2>
        <h2>Jobs</h2>
        <h2>Professional Network</h2>
        <h2>Lounge</h2>
        <h2>Salary</h2>
      </div>

      <div className="flex space-x-4 items-center mx-2">
        <button className="hidden lg:flex text-blue-500 border border-blue-500 rounded-md px-2 py-1">
          Create Job
        </button>

        <span className="inline-block relative">
          <div className="bg-blue-500 flex items-center h-10 w-10 justify-center text-white text-sm rounded-full">
            TA
          </div>
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center text-white">
            1
          </span>
        </span>

        <h2 className="hidden lg:flex">Logout</h2>

      </div>
      </div>
    </header>
  );
}
