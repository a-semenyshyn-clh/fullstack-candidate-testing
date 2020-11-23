
const Menu = ({ options = [], optionHandle = () => {} }) => {
  const [isActive, setActive] = React.useState(false);

  const handleDropdownClick = () => setActive(!isActive);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500" aria-expanded="false" onClick={handleDropdownClick}>
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div
        className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg  h-64 overflow-y-auto ${
          isActive ? 'block' : 'hidden'
        }`}
      >
        {options.map((option, i) => {
          return (
            <div className="bg-white shadow-xs" key={i}>
              <div className="py-1">
                <div
                  className="block px-4 py-2 text-gray-700"
                  onClick={optionHandle}
                >
                  {typeof option === 'function' ? option() : option}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
