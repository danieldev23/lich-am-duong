'use client';

import { useState, useEffect } from 'react';
import { EVENTS, HOLIDAYS } from '@/lib/constants';

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      
      // Lấy events từ API
      const response = await fetch('/api/events');
      const data = await response.json();
      
      if (data.success) {
        // Kết hợp API events với constants
        const apiEvents = data.data || [];
        const allEvents = [...EVENTS, ...apiEvents];
        setEvents(allEvents);
        setError(null);
      } else {
        // Fallback to constants only
        setEvents(EVENTS);
        setError('Could not fetch latest events, showing cached data');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      // Fallback to constants
      setEvents(EVENTS);
      setError('Network error, showing cached data');
    } finally {
      setIsLoading(false);
    }
  };

  const getUpcomingEvents = (days: number = 30) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    const upcoming: any[] = [];
    
    // Thêm holidays
    HOLIDAYS.forEach(holiday => {
      const [month, day] = holiday.date.split('-').map(Number);
      const eventDate = new Date(today.getFullYear(), month - 1, day);
      
      // Nếu đã qua thì lấy năm sau
      if (eventDate < today) {
        eventDate.setFullYear(today.getFullYear() + 1);
      }
      
      if (eventDate <= futureDate) {
        upcoming.push({
          ...holiday,
          date: eventDate,
          type: 'holiday' as const,
          title: holiday.name
        });
      }
    });
    
    // Thêm events
    events.forEach(event => {
      const [month, day] = event.date.split('-').map(Number);
      const eventDate = new Date(today.getFullYear(), month - 1, day);
      
      // Nếu đã qua thì lấy năm sau
      if (eventDate < today) {
        eventDate.setFullYear(today.getFullYear() + 1);
      }
      
      if (eventDate <= futureDate) {
        upcoming.push({
          ...event,
          date: eventDate
        });
      }
    });
    
    // Sắp xếp theo ngày và giới hạn số lượng
    return upcoming
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 10);
  };

  const getEventsByMonth = (month: number, year?: number) => {
    const targetYear = year || new Date().getFullYear();
    const monthEvents: any[] = [];
    
    // Holidays
    HOLIDAYS.forEach(holiday => {
      const [eventMonth, day] = holiday.date.split('-').map(Number);
      if (eventMonth === month) {
        monthEvents.push({
          ...holiday,
          date: new Date(targetYear, month - 1, day),
          type: 'holiday' as const,
          title: holiday.name
        });
      }
    });
    
    // Events
    events.forEach(event => {
      const [eventMonth, day] = event.date.split('-').map(Number);
      if (eventMonth === month) {
        monthEvents.push({
          ...event,
          date: new Date(targetYear, month - 1, day)
        });
      }
    });
    
    return monthEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  return {
    events,
    isLoading,
    error,
    getUpcomingEvents,
    getEventsByMonth,
    refetch: fetchEvents
  };
}
