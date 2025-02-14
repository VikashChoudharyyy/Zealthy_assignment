import { addDays, format } from 'date-fns';

let users = [
  { id: 1, username: 'john_doe', timezone: 'America/New_York' },
  { id: 2, username: 'jane_smith', timezone: 'Europe/London' },
];

let slots = [
  { id: 1, userId: 1, date: '2023-05-10', time: '09:00' },
  { id: 2, userId: 1, date: '2023-05-10', time: '10:00' },
  { id: 3, userId: 2, date: '2023-05-11', time: '14:00' },
];

export const fetchUsers = () => {
  return Promise.resolve(users);
};

export const fetchUserSlots = (userId) => {
  return Promise.resolve(slots.filter(slot => slot.userId === userId));
};

export const fetchAvailableSlots = (date) => {
  return Promise.resolve(slots.filter(slot => slot.date === date));
};

export const createSlot = (userId, date, time) => {
  const newSlot = { id: slots.length + 1, userId, date, time };
  slots.push(newSlot);
  return Promise.resolve(newSlot);
};

export const updateSlot = (slotId, updates) => {
  const index = slots.findIndex(slot => slot.id === slotId);
  if (index !== -1) {
    slots[index] = { ...slots[index], ...updates };
    return Promise.resolve(slots[index]);
  }
  return Promise.reject(new Error('Slot not found'));
};

export const deleteSlot = (slotId) => {
  const index = slots.findIndex(slot => slot.id === slotId);
  if (index !== -1) {
    slots.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.reject(new Error('Slot not found'));
};

export const updateUser = (userId, updates) => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    return Promise.resolve(users[userIndex]);
  }
  return Promise.reject(new Error('User not found'));
};

export const copyDayAvailability = (userId, sourceDate, targetDate) => {
  const sourceDaySlots = slots.filter(slot => slot.userId === userId && slot.date === sourceDate);
  const newSlots = sourceDaySlots.map(slot => ({
    ...slot,
    id: slots.length + 1,
    date: targetDate,
  }));
  slots = [...slots, ...newSlots];
  return Promise.resolve(newSlots);
};