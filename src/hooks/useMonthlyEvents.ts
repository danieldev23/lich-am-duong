'use client';

import { useState, useEffect, useCallback } from 'react';

export function useMonthlyEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventsByMonth = useCallback(async (month: number, year?: number) => {
    const targetYear = year || new Date().getFullYear();
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch holidays and events in parallel
      const [holidaysResponse, eventsResponse] = await Promise.all([
        fetch(`/api/holidays?month=${month}&year=${targetYear}`),
        fetch(`/api/events?month=${month}`)
      ]);

      const [holidaysData, eventsData] = await Promise.all([
        holidaysResponse.json(),
        eventsResponse.json()
      ]);

      const monthEvents: any[] = [];

      // Add holidays
      if (holidaysData.success) {
        monthEvents.push(...holidaysData.data);
      }

      // Add events
      if (eventsData.success) {
        const apiEvents = eventsData.data.map((event: any) => {
          const [eventMonth, day] = event.date.split('-').map(Number);
          return {
            ...event,
            date: new Date(targetYear, month - 1, day)
          };
        });
        monthEvents.push(...apiEvents);
      }

      // Remove duplicates based on title + date
      const uniqueEvents = monthEvents.filter((event, index, self) => 
        index === self.findIndex(e => 
          e.title === event.title && 
          e.date.getTime() === event.date.getTime()
        )
      );

      // Sort by date
      const sortedEvents = uniqueEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
      
      setEvents(sortedEvents);
    } catch (err) {
      console.error('Error fetching monthly events:', err);
      setError('Không thể tải dữ liệu sự kiện');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    events,
    isLoading,
    error,
    fetchEventsByMonth
  };
}