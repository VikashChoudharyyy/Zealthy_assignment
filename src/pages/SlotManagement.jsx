import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { fetchUserSlots, createSlot, updateSlot, deleteSlot, copyDayAvailability } from '../api/mockApi';
import Calendar from '../components/Calendar';

function SlotManagement() {
  const { currentUser } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userSlots, setUserSlots] = useState([]);
  const [newSlotTime, setNewSlotTime] = useState('');
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchUserSlots(currentUser.id).then(setUserSlots);
    }
  }, [currentUser]);

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (newSlotTime) {
      createSlot(currentUser.id, selectedDate.toISOString().split('T')[0], newSlotTime)
        .then(newSlot => {
          setUserSlots([...userSlots, newSlot]);
          setNewSlotTime('');
        });
    }
  };

  const handleUpdateSlot = (e) => {
    e.preventDefault();
    if (editingSlot && newSlotTime) {
      updateSlot(editingSlot.id, { time: newSlotTime })
        .then(updatedSlot => {
          setUserSlots(userSlots.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot));
          setEditingSlot(null);
          setNewSlotTime('');
        });
    }
  };

  const handleDeleteSlot = (slotId) => {
    deleteSlot(slotId).then(() => {
      setUserSlots(userSlots.filter(slot => slot.id !== slotId));
    });
  };

  const handleCopyAvailability = () => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    copyDayAvailability(
      currentUser.id,
      selectedDate.toISOString().split('T')[0],
      tomorrow.toISOString().split('T')[0]
    ).then(newSlots => {
      setUserSlots([...userSlots, ...newSlots]);
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Your Slots</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-xl font-semibold">
            Your Slots for {selectedDate.toDateString()}
          </h2>
          <form onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot} className="flex space-x-2">
            <input
              type="time"
              value={newSlotTime}
              onChange={(e) => setNewSlotTime(e.target.value)}
              className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingSlot ? 'Update Slot' : 'Add Slot'}
            </button>
          </form>
          <button
            onClick={handleCopyAvailability}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Copy to Next Day
          </button>
          <ul className="space-y-2">
            {userSlots
              .filter(slot => slot.date === selectedDate.toISOString().split('T')[0])
              .map((slot) => (
                <li
                  key={slot.id}
                  className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <span>{slot.time}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingSlot(slot);
                        setNewSlotTime(slot.time);
                      }}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SlotManagement;