import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={150} color={"#123abc"} loading={true} />
    </div>
  );
};

export default Loading;