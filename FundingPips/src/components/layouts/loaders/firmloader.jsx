// /src/components/layouts/loaders/FirmLoader.jsx
import React from "react";

const FirmLoader = () => {
  // We render 5 skeleton rows to mimic initial data loading
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="w-full animate-pulse">
      {/* Mimic the Header Section */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <div className="h-8 w-64 bg-gray-700 rounded-md mb-2"></div>
          <div className="h-4 w-48 bg-gray-800 rounded-md"></div>
        </div>
      </div>

      {/* Mimic Grid Header */}
      <div className="grid grid-cols-4 gap-4 px-4 py-2 mb-2">
        <div className="h-4 bg-gray-800 rounded w-20"></div>
        <div className="h-4 bg-gray-800 rounded w-20 ml-auto"></div>
        <div className="h-4 bg-gray-800 rounded w-20 ml-auto"></div>
        <div className="h-4 bg-gray-800 rounded w-20 ml-auto"></div>
      </div>

      {/* Mimic Rows */}
      <div className="space-y-3">
        {skeletonRows.map((_, index) => (
          <div 
            key={index}
            className="grid grid-cols-4 gap-4 items-center p-4 bg-card/50 rounded-lg border-l-4 border-gray-700 shadow-md"
          >
            {/* ID & Name */}
            <div className="col-span-1 space-y-2">
              <div className="h-5 bg-gray-700 rounded w-24"></div>
              <div className="h-3 bg-gray-800 rounded w-32"></div>
            </div>

            {/* Inquiry Type */}
            <div className="flex justify-end">
              <div className="h-5 bg-gray-700 rounded w-28"></div>
            </div>

            {/* Email */}
            <div className="flex justify-end">
              <div className="h-4 bg-gray-800 rounded w-40"></div>
            </div>

            {/* Message Snippet */}
            <div className="flex justify-end">
              <div className="h-4 bg-gray-800 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirmLoader;