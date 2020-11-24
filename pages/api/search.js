import _ from "lodash";
import itemjs from "itemsjs";
import nextConnect from "next-connect";

import jobs from "../../data/jobs.json";
import filters from "../../data/filters.json";

const MethodNotAllowed = (req, res) => res.status(405).end();

const Search = nextConnect()
  .get(MethodNotAllowed)
  .delete(MethodNotAllowed)
  .put(MethodNotAllowed)
  .post(async (req, res) => {
    const data = _.flatMap(jobs, (summary) => summary.items);
    const aggregations = _.keys(filters)
      .map((key) => {
        return {
          name: key,
          value: {
            title: _.capitalize(_.replace(key, "_", " ")),
            conjunction: true,
            size: 100,
          },
        };
      })
      .reduce((o, kvp) => _.assign(o, { [kvp.name]: kvp.value }), {});

    const searchableFields = _.filter(_.keys(data[0]), (key) =>
      _.isString(data[0][key])
    );

    var searcher = itemjs(data, {
      aggregations,
      searchableFields,
      isExactSearch: false,
    });

    var options = {
      ...req.body,
      per_page: data.length,
      page: 1,
    };

    const results = searcher.search(options);
    const results_jobs = _.chain(results.data.items)
      .groupBy((job) => job.name)
      .map((items, name) => ({
        total_jobs_in_hospital: items.length,
        name,
        job_title: items[0].job_title,
        items,
      }))
      .value();
    const results_filters = _.keys(results.data.aggregations)
      .map((key) => ({
        name: key,
        value: results.data.aggregations[key].buckets,
      }))
      .reduce((o, kvp) => _.assign(o, { [kvp.name]: kvp.value }), {});

    res.status(200).json({
      total: results.pagination.total,
      jobs: results_jobs,
      filters: results.data.aggregations,
    });
  });

export default Search;
