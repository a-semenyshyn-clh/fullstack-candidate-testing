import { useCallback } from "react";
import {useSearchParamsContext} from "../contexts/search";

export default function SearchBar() {

  const { params, setParams } = useSearchParamsContext();

  const handleTextFieldChange = useCallback((value) => {
    setParams({
      ...params,
      text: value
    });
  }, [params]);

  const debouncedHandleChange = debounce(handleTextFieldChange, 500);

  return (
      <div className="m-4 p-4 flex bg-white space-x-4">
        <input onChange={e => debouncedHandleChange(e.target.value)} type="text" className="w-full outline-none" placeholder="Search for any job, title, keywords or company" />
      </div>
  );
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}