export default function FilterGroup({ name, filters }) {
  return (
    <div className="bg-white m-4 p-4 flex flex-col space-y-2">
      <div className="font-bold mb-2">{name}</div>
      {
        filters.map(({ key, doc_count }) =>
          <button className="text-left" key={key}>{key}<span className="ml-2 text-sm text-gray-400">{doc_count}</span></button>)
      }
    </div>
  );
}