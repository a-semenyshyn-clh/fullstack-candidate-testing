import _ from "lodash";
import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { prepareFilters, prepareFilteredJobsView } from "./middleware/utils";

let store;

const SORT_STATES = 3;

const initialState = {
  jobs: [],
  filteredJobs: [],
  sorters: {
    state: 0,
    type: 0,
    department: 0,
    required_skills: 0,
    experience: 0,
  },
  filters: {
    job_type: [],
    department: [],
    work_schedule: [],
    experience: [],
  },
  searchQuery: "",
  status: "loading",
  lastUpdate: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "jobs/loaded":
      return {
        ...state,
        jobs: action.jobs,
        filters: prepareFilters(action.filters),
        filteredJobs: action.jobs,
        lastUpdate: action.lastUpdate,
      };
    case "jobs/sortBy":
      var sorters = {
        ...state.sorters,
        [action.sortField]: ++state.sorters[action.sortField] % SORT_STATES,
      };
      return {
        ...state,
        sorters: {
          ...sorters,
        },
        filteredJobs: prepareFilteredJobsView(
          state.jobs,
          state.searchQuery,
          state.filters,
          sorters
        ),
      };
    case "jobs/filterBy":
      console.log(action);
      var filters = {
        ...state.filters,
      };

      _.castArray(action.filterValue).forEach((item) => {
        filters[action.filterField][item] = !filters[action.filterField][item];
      });

      return {
        ...state,
        filters: {
          ...filters,
        },
        filteredJobs: prepareFilteredJobsView(
          state.jobs,
          state.searchQuery,
          filters,
          state.sorters
        ),
      };
    case "jobs/searchKeyword":
      console.log(`jobs/searchKeyword: ${action.searchQuery}`);
      return {
        ...state,
        searchQuery: action.searchQuery,
        filteredJobs: prepareFilteredJobsView(
          state.jobs,
          action.searchQuery,
          state.filters,
          state.sorters
        ),
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
