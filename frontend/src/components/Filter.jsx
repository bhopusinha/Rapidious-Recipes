import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const CategoryFilter = ({ onFilterChange }) => {
  const keywords = ['Healthy', 'Garlic', 'Herb', 'Salad', 'Egg', 'Chicken', 'Vegetarian'];
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState(['All']);

  useEffect(() => {
    if (selectedKeywords.length === 0) {
      setSelectedKeywords(['All']);
    }
  }, [selectedKeywords]);

  const handleKeywordChange = (keyword) => {
    if (keyword === 'All') {
      setSelectedKeywords(['All']);
      onFilterChange([]);
    } else {
      let updatedKeywords = selectedKeywords.includes(keyword)
        ? selectedKeywords.filter((k) => k !== keyword)
        : [...selectedKeywords.filter((k) => k !== 'All'), keyword];

      if (updatedKeywords.length === 0) {
        updatedKeywords = ['All'];
      }

      setSelectedKeywords(updatedKeywords);
      onFilterChange(updatedKeywords.filter((k) => k !== 'All'));
    }
  };

  return (
    <div className="category-filter p-6 border mt-3 rounded-lg bg-white shadow-lg">
      <button
        className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition duration-300"
        onClick={() => setShowFilterOptions(!showFilterOptions)}
      >
        {showFilterOptions ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilterOptions && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="All"
              checked={selectedKeywords.includes('All')}
              onChange={() => handleKeywordChange('All')}
              className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-200"
            />
            <span className="text-gray-800 font-medium">All</span>
          </label>

          {keywords.map((keyword) => (
            <label key={keyword} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={keyword}
                checked={selectedKeywords.includes(keyword)}
                onChange={() => handleKeywordChange(keyword)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-200"
              />
              <span className="text-gray-800 font-medium">{keyword}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
