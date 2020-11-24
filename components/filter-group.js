export default function FilterGroup({ name, filters }) {
  return (<div className="bg-white m-4 p-4 flex flex-col space-y-2">
    <div className="font-bold mb-2">{name}</div>
    {
      filters.map(({ key, name }) =>
        <button className="text-left" key={key}>{key}</button>)
    }
  </div>);
}