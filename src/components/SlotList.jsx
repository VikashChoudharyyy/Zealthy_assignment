import React from 'react';

function SlotList({ slots, users }) {
  return (
    <ul className="space-y-2">
      {slots.map((slot) => {
        const user = users.find(u => u.id === slot.userId);
        return (
          <li key={slot.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <p className="font-semibold">{slot.time}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Available by: {user ? user.username : 'Unknown'}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default SlotList;