import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { fetchAvailableSlots } from '../api/mockApi';
import Calendar from '../components/Calendar';
import SlotList from '../components/SlotList';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const { users } = useUser();

  useEffect(() => {
    fetchAvailableSlots(selectedDate.toISOString().split('T')[0]).then(setAvailableSlots);
  }, [selectedDate]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Available Slots</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">
            Slots for {selectedDate.toDateString()}
          </h2>
          <SlotList slots={availableSlots} users={users} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;