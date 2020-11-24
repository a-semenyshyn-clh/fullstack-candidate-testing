const EmptySearchResults = () => {
  return (
    <div className="bg-white text-grey-900 relative flex flex-col w-full outline-none">
      <div className="relative p-20 flex-auto">
        <div className="flex items-start justify-start p-2 space-x-4">
          <div className="flex flex-col w-full items-center">
            <div className="text-lg mb-2 font-bold">No results found</div>
            <div className="text-sm text-grey-500">
              Try adjusting your search or filter to find your next job.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchResults;
