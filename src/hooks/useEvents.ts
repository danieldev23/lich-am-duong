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
    
    // Kết hợp và chuẩn hóa data
    const allItems = [
      ...HOLIDAYS.map(h => ({ ...h, type: 'holiday' as const, title: h.name })),
      ...events
    ];
    
    const upcoming = allItems
      .map(item => {
        const [month, day] = item.date.split('-').map(Number);
        const eventDate = new Date(today.getFullYear(), month - 1, day);
        
        // Nếu đã qua thì lấy năm sau
        if (eventDate < today) {
          eventDate.setFullYear(today.getFullYear() + 1);
        }
        
        return { ...item, date: eventDate };
      })
      .filter(item => item.date <= futureDate);
    
    // Loại bỏ duplicate dựa trên title + date
    const uniqueMap = new Map();
    upcoming.forEach(item => {
      const key = `${item.title || item.name}-${item.date.toDateString()}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    
    // Sắp xếp và giới hạn
    return Array.from(uniqueMap.values())
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
