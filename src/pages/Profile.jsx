import React from 'react';

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full shadow-md"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">John Doe</h2>
          <p className="mt-2 text-gray-600 text-center">
            A passionate developer with a love for creating amazing web applications.
          </p>
        </div>
        <div className="mt-6 flex justify-around w-full">
          <a
            href="https://twitter.com"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="text-blue-700 hover:text-blue-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            className="text-gray-800 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;