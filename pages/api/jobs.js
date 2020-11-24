import jobs from './data/jobs.json';

export default (req, res) => {
  return res.status(200).json(jobs);
}

export async function getAllJobs() {
  return jobs;
}