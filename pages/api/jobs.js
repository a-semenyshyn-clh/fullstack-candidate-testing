import jobs from './data/jobs.json';

export default (req, res) => {
  const body = JSON.parse(req.body);
  return res.status(200).json(filterJobs(jobs, body));
}

function filterJobs(jobs, criteria = {}) {
  const {
    filter = {},
    text = '',
    sorter = {}
  } = criteria;

  const filteredJobsWithNulls = jobs.map(hospital => {
    const filteredItems = hospital.items
      .filter(job =>
          matchesFilter(job, filter) && matchesText(job, text));

    // If no matching job was found, we need to remove
    // the hospital.
    if (filteredItems.length === 0) {
      return null;
    }

    const sortedAndFilteredItems = sortJobs(filteredItems, sorter);

    return {
      ...hospital,
      items: sortedAndFilteredItems,
      total_jobs_in_hospital: sortedAndFilteredItems.length
    };
  });

  // Remove null values
  return filteredJobsWithNulls.filter(Boolean);
}

// Matchers for matching a filter based on a property.
// E.g. filter has {department: ''}, but job has a department
// array. These functions contain the logic for determining
// whether a filter matches a job.
const matchers = {
  default: (key, job, filter) => job[key] !== filter[key],
  department: (key, job, filter) => job[key].includes(filter[key])
}

function matchesFilter(job, filter) {
  return !Object.keys(filter)
    .some(filterKey => {
      const matcher = matchers[filterKey] || matchers.default;
      return matcher(filterKey, job, filter);
    });
}

function matchesText(job, text) {
  return true;
}

function sortJobs(jobs, sorter) {
  return jobs;
}

export async function getAllJobs() {
  return jobs;
}