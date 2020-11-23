import jobs from "../../data/jobs.json";
import filters from "../../data/filters.json";

export default function handler(req, res) {
  res.status(200).json({
    jobs,
    filters,
  });
}
