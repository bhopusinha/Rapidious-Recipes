import { FaSearch } from "react-icons/fa";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function NavBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="h-16 shadow-md bg-gradient-to-r from-green-400 to-blue-500">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div className="text-white font-bold text-xl">
          EpiRecipes <strong>Rapidious</strong>
        </div>

        <div className="flex items-center w-full max-w-md border-2 border-white rounded-full p-2 bg-white shadow-inner">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="w-full px-4 py-2 rounded-l-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div
            className="text-lg min-w-[50px] h-10 bg-red-600 flex items-center justify-center rounded-full text-white cursor-pointer"
            onClick={handleSearch}
          >
            <FaSearch />
          </div>
        </div>

        <div className="text-white text-2xl cursor-pointer">👤</div>
      </div>
    </nav>
  );
}

export default NavBar;
