const EmptyFilters = () => {
  return (
    <div className="bg-white text-grey-900 relative flex flex-col w-full outline-none">
      <div className="relative p-2 flex-auto">
        <div className="flex items-start justify-start p-2 space-x-4">
          <div className="flex flex-col w-full items-center">
            <div className="text-sm text-grey-500">No filters available.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFilters;
