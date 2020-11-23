import _, { chain } from "lodash";
import jp from "jsonpath";

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(req, setLocalhost) {
  var protocol = "https:";
  var host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
    url: req,
  };
}

export function prepareFilters(filters) {
  var filtersState = {};
  _.keys(filters).forEach((key) => {
    filtersState[key] = {};
    _.forEach(filters[key], (item) => {
      filtersState[key][item.key] = false;
    });
  });
  return filtersState;
}

const wrapComparisonFilter = (key, value) => {
  return key === "department"
    ? `@.${key}.includes('${value}')`
    : `@.${key} === '${value}'`;
};

const filterKeywords = (arr, substr) => {
  const keywords = _.split(_.toLower(substr), " ");
  const includesKeywords = (text) =>
    _.every(keywords, (keyword) => _.includes(text, keyword));

  return _.filter(
    arr,
    _.flow(_.identity, _.values, _.join, _.toLower, _.partial(includesKeywords))
  );
};

const filter = (arr, filterQuery, searchQuery) => {
  arr = _.isEmpty(filterQuery) ? arr : jp.query(arr, `$..[?(${filterQuery})]`);
  return filterKeywords(arr, searchQuery);
};

export function prepareFilteredJobsView(jobs, searchQuery, filters, sorters) {
  searchQuery = _.lowerCase(searchQuery) || "";

  console.log(filters);

  var activeFilters = _.filter(
    _.keys(filters),
    (key) =>
      _.sum(
        _.map(_.keys(filters[key]), (field) => (filters[key][field] ? 1 : 0))
      ) > 0
  );
  console.log(activeFilters);

  var filterQuery = _.chain(activeFilters)
    .map((key) => {
      var multiple = _.chain(_.keys(filters[key]))
        .filter((name) => filters[key][name])
        .map((name) => wrapComparisonFilter(key, name))
        .join(" || ")
        .value();
      return `( ${multiple} )`;
    })
    .join(" && ")
    .value();
  console.log(`filterBy: ${filterQuery}`);

  var sortFields = _.keys(sorters).filter((key) => sorters[key] > 0);
  var sortOrders = _.map(sortFields, (key) =>
    sorters[key] == 1 ? "asc" : "desc"
  );
  var sortOutput = _.join(
    _.zipWith(sortFields, sortOrders, (item1, item2) => `${item1}:${item2}`),
    ", "
  );
  console.log(`sortBy: ${sortOutput}`);

  var filteredJobsView = [];
  _.forEach(jobs, (hospital) => {
    var filteredItems = _.orderBy(
      filter(hospital.items, filterQuery, searchQuery),
      sortFields,
      sortOrders
    );
    filteredJobsView.push({
      ...hospital,
      total_jobs_in_hospital: filteredItems.length,
      items: filteredItems,
    });
  });

  return _.filter(filteredJobsView, (h) => h.total_jobs_in_hospital > 0);
}
