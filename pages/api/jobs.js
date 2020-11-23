// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jobs from "../../data/jobs.json";

export default (req, res) => {
  let keyword = req.query.keyword || "";

  let location = req.query.location || 0;
  let role = req.query.role || 0;
  let department = req.query.department || 0;
  let education = req.query.education || 0;
  let experience = req.query.experience || 0;

  let filteredResult = jobs.filter((job) => {
    return JSON.stringify(job)
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase());
  });

  if (location != 0) {
    filteredResult.sort((job1, job2) => {
      return location * (job1.items[0].zip > job2.items[0].zip ? 1 : -1);
    });
  }

  if (role != 0) {
    filteredResult.forEach((job) => {
      job.items.sort((job1, job2) => {
        return role * (job1.job_type > job2.job_type ? 1 : -1);
      });
    });
  }

  if (department != 0) {
    filteredResult.forEach((job) => {
      job.items.sort((job1, job2) => {
        return department * (job1.department[0] > job2.department[0] ? 1 : -1);
      });
    });
  }

  if (education != 0) {
    filteredResult.forEach((job) => {
      job.items.sort((job1, job2) => {
        return (
          education *
          (job1.required_skills[0] > job2.required_skills[0] ? 1 : -1)
        );
      });
    });
  }

  if (experience != 0) {
    filteredResult.forEach((job) => {
      job.items.sort((job1, job2) => {
        return experience * (job1.experience > job2.experience ? 1 : -1);
      });
    });
  }

  res.statusCode = 200;
  res.json(filteredResult);
};
