import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

function Calendar({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {daysInMonth.map(day => (
          <button
            key={day.toString()}
            onClick={() => setSelectedDate(day)}
            className={`p-2 text-center ${
              !isSameMonth(day, currentMonth) ? 'text-gray-400' :
              isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-full' :
              'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calendar;