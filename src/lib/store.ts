import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CalendarState {
  // Current display date
  displayDate: Date;
  selectedDate: Date | null;
  
  // Modal state
  isModalOpen: boolean;
  modalContent: any;
  
  // Sidebar state
  isSidebarOpen: boolean;
  
  // Filter state
  showHolidays: boolean;
  showEvents: boolean;
  eventTypeFilter: 'all' | 'holiday' | 'history' | 'culture';
  
  // Actions
  setDisplayDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  openModal: (content: any) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setShowHolidays: (show: boolean) => void;
  setShowEvents: (show: boolean) => void;
  setEventTypeFilter: (filter: 'all' | 'holiday' | 'history' | 'culture') => void;
  
  // Navigation actions
  goToToday: () => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
}

export const useCalendarStore = create<CalendarState>()(
  devtools(
    (set, get) => ({
      // Initial state
      displayDate: new Date(),
      selectedDate: null,
      isModalOpen: false,
      modalContent: null,
      isSidebarOpen: false,
      showHolidays: true,
      showEvents: true,
      eventTypeFilter: 'all',
      
      // Actions
      setDisplayDate: (date: Date) => set({ displayDate: date }),
      setSelectedDate: (date: Date | null) => set({ selectedDate: date }),
      
      openModal: (content: any) => set({ isModalOpen: true, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null }),
      
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
      
      setShowHolidays: (show: boolean) => set({ showHolidays: show }),
      setShowEvents: (show: boolean) => set({ showEvents: show }),
      setEventTypeFilter: (filter: 'all' | 'holiday' | 'history' | 'culture') => 
        set({ eventTypeFilter: filter }),
      
      // Navigation actions
      goToToday: () => set({ displayDate: new Date(), selectedDate: null }),
      
      goToPreviousMonth: () => {
        const { displayDate } = get();
        const newDate = new Date(displayDate);
        newDate.setMonth(newDate.getMonth() - 1);
        set({ displayDate: newDate });
      },
      
      goToNextMonth: () => {
        const { displayDate } = get();
        const newDate = new Date(displayDate);
        newDate.setMonth(newDate.getMonth() + 1);
        set({ displayDate: newDate });
      },
      
      goToPreviousDay: () => {
        const { displayDate } = get();
        const newDate = new Date(displayDate);
        newDate.setDate(newDate.getDate() - 1);
        set({ displayDate: newDate, selectedDate: newDate });
      },
      
      goToNextDay: () => {
        const { displayDate } = get();
        const newDate = new Date(displayDate);
        newDate.setDate(newDate.getDate() + 1);
        set({ displayDate: newDate, selectedDate: newDate });
      },
    }),
    {
      name: 'calendar-store',
    }
  )
);

// Reminder state
interface ReminderState {
  reminders: any[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addReminder: (reminder: any) => void;
  removeReminder: (id: string) => void;
  updateReminder: (id: string, updates: any) => void;
  setReminders: (reminders: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useReminderStore = create<ReminderState>()(
  devtools(
    (set) => ({
      reminders: [],
      isLoading: false,
      error: null,
      
      addReminder: (reminder: any) => 
        set((state) => ({ reminders: [...state.reminders, reminder] })),
      
      removeReminder: (id: string) => 
        set((state) => ({ reminders: state.reminders.filter(r => r.id !== id) })),
      
      updateReminder: (id: string, updates: any) => 
        set((state) => ({
          reminders: state.reminders.map(r => 
            r.id === id ? { ...r, ...updates } : r
          )
        })),
      
      setReminders: (reminders: any[]) => set({ reminders }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'reminder-store',
    }
  )
);
