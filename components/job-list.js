export default function JobList({ hospital, expanded, onClick }) {
  const initials = hospital.name.slice(0, 2).toUpperCase();
  return (
    <div className="my-4">
      <div className="flex space-x-4 items-center cursor-pointer" onClick={(e) => onClick && onClick(e)}>
        <span className="rounded-md bg-gray-400 w-8 h-8 font-semibold text-white flex justify-center items-center">{initials}</span>
        <span>{hospital.total_jobs_in_hospital} jobs for {hospital.name}</span>
      </div>
      {expanded && <div>Expanded</div>}
    </div>
  );
}