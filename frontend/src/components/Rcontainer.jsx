import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import summaryApi from "../api/index";
import RecipeCard from "./Rcard";
import CategoryFilter from "./Filter";
import '../index.css';

const RecipeContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({});
  const itemsPerPage = 10;
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      setError(null);
      try {
        const searchParams = new URLSearchParams({
          page: currentPage,
          size: itemsPerPage,
        });

        if (searchQuery) {
          searchParams.append("q", searchQuery);
        }

        if (filter && Object.keys(filter).length > 0) {
          Object.entries(filter).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((val) => searchParams.append(key, val));
            } else if (value) {
              searchParams.append(key, value);
            }
          });
        }

        const url = `${summaryApi.recipeURL.url}/search?${searchParams.toString()}`;

        console.log("Fetching from URL:", url);

        const response = await fetch(url, {
          method: summaryApi.recipeURL.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setRecipes(data.recipes || []);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error.message || "An error occurred");
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [currentPage, searchQuery, filter]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleKeywordFilterChange = (selectedKeywords) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      categories: selectedKeywords.length > 0 ? selectedKeywords : undefined,
    }));
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-green-200 via-white to-blue-200 min-h-screen boxScroll">
      <CategoryFilter onFilterChange={handleKeywordFilterChange} />

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {!error && (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <RecipeCard key={index} info={recipe._source || recipe} />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No recipes found.</p>
          )}
        </div>
      )}
      {recipes.length > 0 && (
        <div className="flex items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="mx-4 px-4 py-2 text-white bg-gray-800 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeContainer;
