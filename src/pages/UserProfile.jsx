import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

function UserProfile() {
  const { currentUser, updateUser } = useUser();
  const [username, setUsername] = useState('');
  const [timezone, setTimezone] = useState('UTC');

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setTimezone(currentUser.timezone);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ username, timezone });
  };

  if (!currentUser) return <div className="text-center text-xl">Please log in to view your profile.</div>;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Timezone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserProfile;