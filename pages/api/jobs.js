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

  if (!text) {
    return true;
  }

  return Object.values(job).some(value => {
    if (typeof value === 'string') {
      return value.toLowerCase().includes(text.toLowerCase());
    } else if (typeof value === 'object') {
      return matchesText(value, text);
    }
  });
}

const sortingComparators = {
  default: (job1, job2, key) => {
    if (job1[key] > job2[key]) {
      return -1;
    } else if (job1[key] < job2[key]) {
      return 1;
    } else {
      return 0;
    }
  },
  hours: (job1, job2, key) => {
    const job1Hours = job1[key][0];
    const job2Hours = job2[key][0];

    if (job1Hours > job2Hours) {
      return -1;
    } else if (job1Hours < job2Hours) {
      return 1;
    } else {
      return 0;
    }

  },
  salary: (job1, job2, key) => {
    const avgJob1 = (job1.salary_range[0] + job1.salary_range[1]) / 2
    const avgJob2 = (job2.salary_range[0] + job2.salary_range[1]) / 2;

    if (avgJob1 > avgJob2) {
      return -1;
    } else if (avgJob1 < avgJob2) {
      return 1;
    } else {
      return 0;
    }
  }
}

function sortJobs(jobs, sorter) {
  Object.keys(sorter).forEach(sorterKey => {
    const comparator = sortingComparators[sorterKey] || sortingComparators.default;
    const direction = sorter[sorterKey];
    jobs.sort((job1, job2) => {
      if (direction === 'desc') {
        return comparator(job1, job2, sorterKey);
      } else {
        return -comparator(job1, job2, sorterKey);
      }
    });
  });
  return jobs;
}


export async function getAllJobs() {
  return jobs;
}