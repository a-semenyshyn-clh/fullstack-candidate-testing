const SearchBar = (props) => {
  const { searchQuery } = props;

  return (
    <div className="flex relative bg-white mt-3 sm:ml-3 sm:mr-3 border sm:border-none">
      <span className="absolute inset-y-0 left-0 sm:left-8 flex items-center pl-2">
        <button
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        type="text"
        className="flex flex-1 py-6 pl-10 sm:pl-20 text-sm text-black"
        placeholder="Search for any job, title, keywords or company"
        onChange={(e) => searchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
