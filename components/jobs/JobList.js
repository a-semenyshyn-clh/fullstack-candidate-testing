import { useState } from 'react';
import JobListItem from './JobListItem';
import JobInfo from './JobInfo';

const JobList = ({ jobs, jobfilter }) => {
  const num_jobs = () => {
    if( jobs.length <= 0) return 0
    let sum = jobs.reduce( (total, val) => ( total + val['items'].length), 0)
    return new Intl.NumberFormat().format(sum)
  }
  const sort_by = [
    {name: 'Location', value:'location'},
    {name: 'Role', value:'type'},
    {name: 'Department', value:'department'},
    {name: 'Education', value:'education'},
    {name: 'Experience', value:'experience'},
  ]

  const [sortKey, setSortKey] = useState('')
  const [sortedJobs, setSortedJobs] = useState([])

  const changeSort = (key) => {
    let jobs_sorted = []
    if(sortKey === key){
      jobs_sorted = sortedJobs.reverse()
    }
    else {
      jobs_sorted = jobs.reduce( (prev, item) => {
        const items_arr = item['items']
        return [...prev, ...items_arr]
      }, [])

      jobs_sorted.sort( (a, b) => {
        if(a[key] < b[key]) { return -1 }
        if(a[key] > b[key]) { return 1 }
        return 0;
      })
      setSortKey(key)
    }
    setSortedJobs([...jobs_sorted])
  }

  return (

    <div className="relativew-full bg-white py-2 px-2 min-h-screen h-full">
      <div className="flex px-2 py-8 justify-between">
        <h2>
         { num_jobs() } job postings
        </h2>

        <div className="hidden lg:flex">
          <h2 className="px-2 text-gray-500">Sort by</h2>
          {
            sort_by.map( (item, idx) => (
              <h2 className={`px-2 cursor-pointer ${item['value'] === sortKey ? 'text-blue-400' : ''}`} key={idx} onClick={()=>changeSort(item['value'])}>
                {item['name']}
              </h2>
            ))
          }
        </div>

      </div>
      {sortKey === ''
        ? (
            jobs.map((item, idx) => (
              <JobListItem jobs={item} key={idx}/>
            )
          )
          )
        : (
            <div>
              {
                sortedJobs.map((item, idx) => (
                  <JobInfo jobInfo={item} key={idx}/>
                  )
                )
              }
            </div>
          )
      }
    </div>
  )
}
export default JobList;