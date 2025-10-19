// Utility functions for localStorage operations

export interface LocalReminder {
  id: string;
  email: string;
  title: string;
  description?: string;
  reminderDate: string;
  reminderTime?: string;
  isRecurring: boolean;
  createdAt: string;
  status: 'pending' | 'sent' | 'failed';
}

const REMINDERS_KEY = 'calendar_reminders';

// Generate random ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get all reminders from localStorage
export function getLocalReminders(): LocalReminder[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(REMINDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading reminders from localStorage:', error);
    return [];
  }
}

// Save reminder to localStorage
export function saveLocalReminder(reminder: Omit<LocalReminder, 'createdAt'> & { id?: string; status?: 'pending' | 'sent' | 'failed' }): LocalReminder {
  const newReminder: LocalReminder = {
    ...reminder,
    id: reminder.id || generateId(),
    createdAt: new Date().toISOString(),
    status: reminder.status || 'pending'
  };

  const reminders = getLocalReminders();
  reminders.push(newReminder);
  
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    return newReminder;
  } catch (error) {
    console.error('Error saving reminder to localStorage:', error);
    throw new Error('Không thể lưu nhắc nhở vào bộ nhớ');
  }
}

// Update reminder in localStorage
export function updateLocalReminder(id: string, updates: Partial<LocalReminder>): LocalReminder | null {
  const reminders = getLocalReminders();
  const index = reminders.findIndex(r => r.id === id);
  
  if (index === -1) return null;
  
  reminders[index] = { ...reminders[index], ...updates };
  
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    return reminders[index];
  } catch (error) {
    console.error('Error updating reminder in localStorage:', error);
    throw new Error('Không thể cập nhật nhắc nhở');
  }
}

// Delete reminder from localStorage
export function deleteLocalReminder(id: string): boolean {
  const reminders = getLocalReminders();
  const filteredReminders = reminders.filter(r => r.id !== id);
  
  if (filteredReminders.length === reminders.length) {
    return false; // Reminder not found
  }
  
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(filteredReminders));
    return true;
  } catch (error) {
    console.error('Error deleting reminder from localStorage:', error);
    throw new Error('Không thể xóa nhắc nhở');
  }
}

// Clear all reminders
export function clearLocalReminders(): void {
  try {
    localStorage.removeItem(REMINDERS_KEY);
  } catch (error) {
    console.error('Error clearing reminders from localStorage:', error);
  }
}

// Get reminder by ID
export function getLocalReminderById(id: string): LocalReminder | null {
  const reminders = getLocalReminders();
  return reminders.find(r => r.id === id) || null;
}