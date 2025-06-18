import jobsEducationData from '../data/jobsEducation.js';

export const getJobsEducation = (req, res) => {
  let { country, type, search, page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let results = jobsEducationData;

  if (country) {
    results = results.filter((item) => item.country === country);
  }
  if (type) {
    results = results.filter((item) => item.type === type);
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(s) ||
        item.description.toLowerCase().includes(s) ||
        item.location.toLowerCase().includes(s)
    );
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = results.slice(start, end);

  res.json({
    data: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}; 