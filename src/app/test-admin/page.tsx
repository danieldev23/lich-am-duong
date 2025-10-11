'use client';

import { useSettings } from '@/hooks/useSettings';
import { useEvents } from '@/hooks/useEvents';

export default function TestAdminPage() {
  const { settings, isLoading: settingsLoading, getSetting, isFeatureEnabled } = useSettings();
  const { events, isLoading: eventsLoading, getUpcomingEvents } = useEvents();

  const upcomingEvents = getUpcomingEvents(7); // Next 7 days

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Test Admin Integration</h1>

        {/* Settings Test */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Settings Test</h2>
          
          {settingsLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Site Title:</strong> {getSetting('site_title')}</p>
              <p><strong>Site Description:</strong> {getSetting('site_description')}</p>
              <p><strong>Contact Email:</strong> {getSetting('contact_email')}</p>
              <p><strong>Reminders Enabled:</strong> {isFeatureEnabled('enable_reminders') ? '✅ Yes' : '❌ No'}</p>
              
              <details className="mt-4">
                <summary className="cursor-pointer font-medium">Raw Settings Data</summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(settings, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* Events Test */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Events Test</h2>
          
          {eventsLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <p><strong>Total Events:</strong> {events.length}</p>
              <p><strong>Upcoming Events (7 days):</strong> {upcomingEvents.length}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.slice(0, 4).map((event, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {event.date.toLocaleDateString('vi-VN')}
                    </p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer font-medium">Raw Events Data (first 3)</summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(events.slice(0, 3), null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* API Test */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">API Test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.open('/api/settings', '_blank')}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Test /api/settings
            </button>
            
            <button
              onClick={() => window.open('/api/events', '_blank')}
              className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Test /api/events
            </button>
            
            <button
              onClick={() => window.open('/api/admin/settings', '_blank')}
              className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Test /api/admin/settings
            </button>
            
            <button
              onClick={() => window.open('/api/admin/events', '_blank')}
              className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Test /api/admin/events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
