import jobs from './dummy_jobs.json';
const getJobs = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405)
              .json({ message: `${method} NOT ALLOWED FOR THIS` });
  }

  try {
    const filters_search = req.body.search || {};
    const filters_item = req.body.filter || {};

    const filteredBySearch = jobs.filter((job) => {
      for (let sf in filters_search) {
        if (job[sf] === undefined) {
          return false;
        } else if (
          !job[sf].toLowerCase().includes(filters_search[sf].toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });

    const filteredByItemFilter = filteredBySearch
      .map((job) => {
        let items = [];

        if (Object.keys(filters_item).length === 0) {
          items = job.items;
        } else {
          job.items.forEach((item) => {
            for (let it in filters_item) {
              if (!filters_item[it]) continue;
              if (item[it] === undefined) {
                console.log('caught undefined', item[it]);
              } else if (item[it].includes(filters_item[it])) {
                items.push(item);
                break;
              }
            }
          });
        }
        if (items.length === 0) return undefined;
        return { name: job.name, job_title: job.job_title, items };
      })
      .filter(Boolean);

    return res.status(200).json(filteredByItemFilter);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ err: err.message });
  }

};
export default getJobs;