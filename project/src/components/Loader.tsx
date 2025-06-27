import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
    </div>
  );
}

export default Loader; 