// SearchResults.js
import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result, index) => (
          <div key={index} className="border rounded-md p-4">
            <h2 className="text-xl font-bold mb-2">{result.title}</h2>
            <p className="text-gray-600">{result.description}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
