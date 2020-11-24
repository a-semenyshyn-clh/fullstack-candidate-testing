import _ from "lodash";
import Head from "next/head";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

import EmptySearchResults from "../components/emptySearchResults";
import FilterList from "../components/filterList";
import Footer from "../components/footer";
import JobListing from "../components/jobListing";
import Nav from "../components/nav";
import SearchBar from "../components/searchbar";
import SortButton from "../components/sortButton";

const IndexPage = () => {
  const [searchResults, setSearchResults] = useState({
    total: 0,
    jobs: [],
    filters: {},
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [locationSortOrder, setLocationSortOrder] = useState(0);
  const [roleSortOrder, setRoleSortOrder] = useState(0);
  const [departmentSortOrder, setDepartmentSortOrder] = useState(0);
  const [educationSortOrder, setEducationSortOrder] = useState(0);
  const [experienceSortOrder, setExperienceSortOrder] = useState(0);

  const fetchSearchResults = async () => {
    const sort = {
      field: [],
      order: [],
    };

    const fields = [
      "location",
      "role",
      "department",
      "education",
      "experience",
    ];
    const orders = [
      locationSortOrder,
      roleSortOrder,
      departmentSortOrder,
      educationSortOrder,
      experienceSortOrder,
    ];

    _.forEach(
      _.filter(
        _.zipWith(fields, orders, (field, order) => ({ field, order })),
        (i) => i.order > 0
      ),
      (i) => {
        sort.field.push(i.field);
        sort.order.push(i.order === 1 ? "asc" : "desc");
      }
    );
    console.log("sort:", sort);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: searchQuery,
        sort,
        filters,
      }),
    };

    const searchResponse = await fetch(`/api/search`, requestOptions);
    const results = await searchResponse.json();

    console.log("results:", results);

    setSearchResults(results);
  };

  const onFilterResults = (name, values, remove = false) => {
    console.log(`doFilter: name:${name}, values:${values}, remove:${remove}`);

    console.log("Before", filters);
    var newFilters = {
      ...filters,
      [name]: filters[name] || [],
    };

    var func = remove ? _.difference : _.concat;
    newFilters[name] = func(newFilters[name], _.castArray(values));
    console.log("After", newFilters);
    setFilters(newFilters);
  };

  useEffect(fetchSearchResults, [
    searchQuery,
    filters,
    locationSortOrder,
    roleSortOrder,
    departmentSortOrder,
    educationSortOrder,
    experienceSortOrder,
  ]);

  return (
    <>
      <Head>
        <title>Kevin Blake-Thomas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="bg-white-242">
        <div className="w-100 sm:pt-3">
          <SearchBar searchQuery={(q) => setSearchQuery(q)} />
          <div className="sm:p-3">
            <div className="grid grid-cols-4 gap-4">
              <div className="hidden sm:block">
                {_.orderBy(
                  _.keys(searchResults.filters),
                  (key) => searchResults.filters[key].position
                ).map((key) => (
                  <FilterList
                    key={key}
                    filter={searchResults.filters[key]}
                    filterResults={onFilterResults}
                  />
                ))}
              </div>
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white sm:mt-3 p-3">
                  <div className="lg:flex justify-between mt-4 mb-3">
                    <div className="pt-2 md:pl-4">
                      <label className="font-bold">
                        <NumberFormat
                          value={searchResults.total}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </label>
                      <label className="ml-2">job postings</label>
                    </div>
                    <div className="hidden lg:block lg:flex">
                      <label className="mr-2 flex items-center text-sm text-gray-400">
                        Sort by
                      </label>
                      <SortButton
                        title="Location"
                        onClick={(sortOrder) => setLocationSortOrder(sortOrder)}
                      />
                      <SortButton
                        title="Role"
                        onClick={(sortOrder) => setRoleSortOrder(sortOrder)}
                      />
                      <SortButton
                        title="Department"
                        onClick={(sortOrder) =>
                          setDepartmentSortOrder(sortOrder)
                        }
                      />
                      <SortButton
                        title="Education"
                        onClick={(sortOrder) =>
                          setEducationSortOrder(sortOrder)
                        }
                      />
                      <SortButton
                        title="Experience"
                        onClick={(sortOrder) =>
                          setExperienceSortOrder(sortOrder)
                        }
                      />
                    </div>
                  </div>
                  {_.map(searchResults.jobs, (item) => (
                    <JobListing list={item} key={item.name} />
                  ))}
                  {!searchResults.total && <EmptySearchResults />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
