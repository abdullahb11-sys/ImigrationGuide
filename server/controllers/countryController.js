import countryComparisonData from '../data/countryComparison.js';

export const getCountryComparison = (req, res) => {
  const { countries } = req.query;
  if (!countries) {
    return res.status(400).json({ message: 'No countries specified.' });
  }
  const countryList = countries.split(',').map((c) => c.trim());
  const result = countryComparisonData.filter((country) =>
    countryList.includes(country.name)
  );
  res.json(result);
}; 