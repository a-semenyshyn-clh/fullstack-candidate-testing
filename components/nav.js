import React from "react";
import Link from "next/link";

const links = [
  { href: "#", label: "PROFILE" },
  { href: "#", label: "JOBS" },
  { href: "#", label: "PROFESSIONAL NETWORK" },
  { href: "#", label: "LOUNGE" },
  { href: "#", label: "SALARY" },
].map((link) => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}));

const Nav = ({ onBarClick }) => (
  <nav className="flex justify-between items-center px-6 h-16 bg-white">
    <div className="text-lg font-bold text-blue-500 flex">
      <div
        className="flex justify-center items-center mr-3 text-black md:hidden"
        onClick={() => onBarClick()}
      >
        <i className="fas fa-bars" />
      </div>
      <Link href="/">
        <a>HEALTH EXPLORE</a>
      </Link>
    </div>
    <ul className="hidden md:flex md:justify-between">
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href} className="text-black font-bold">
            {label}
          </a>
        </li>
      ))}
    </ul>
    <div className="flex items-center">
      <button className="border-blue-500 text-blue-500 px-5 py-1 rounded-md border-2 mr-3 hidden md:block">
        CREATE JOB
      </button>
      <div className="rounded-full w-8 h-8 bg-blue-500 mr-3 text-white flex justify-center items-center">
        JO
      </div>
      <div className="font-bold hidden md:block">
        <Link href="/">
          <a>LOGOUT</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
        margin-right: 1rem;
      }
      li:last-child {
        margin-right: 0;
      }
      a {
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
