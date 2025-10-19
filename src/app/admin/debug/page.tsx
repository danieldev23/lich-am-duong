"use client";

import { useState } from "react";
import { Header } from "@/components/Header";

export default function DebugPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const testCronJob = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/reminders/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reminders');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const testCronEndpoint = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/cron/reminders', {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Cron endpoint failed');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const checkPendingReminders = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/reminders?status=PENDING', {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch reminders');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const startCronJob = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/cron/start', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to start cron job');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const triggerCronNow = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/cron/trigger', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to trigger cron job');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const triggerRemindersNow = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/reminders/trigger', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to trigger reminders');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const stopCronJob = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/cron/stop', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to stop cron job');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getCronStatus = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/cron/start', {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get cron status');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getNextReminder = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/reminders/next', {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get next reminder');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-beige">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                        🔧 Real-Time Cron Job System
                    </h1>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">⚡</span>
                            <h2 className="text-base sm:text-lg font-semibold text-green-800">Smart Real-Time Scheduling</h2>
                        </div>
                        <p className="text-green-700 text-xs sm:text-sm">
                            • <strong>30-second intervals</strong> with smart scheduling<br />
                            • <strong>Dynamic frequency</strong> - checks more often when reminders are near<br />
                            • <strong>Zero delay</strong> for urgent notifications (16:07 → 16:08 reminder = instant send)<br />
                            • <strong>Manual triggers</strong> available for immediate execution
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <button
                            onClick={testCronJob}
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? "⏳ Testing..." : "🚀 Test Send Reminders"}
                        </button>

                        <button
                            onClick={testCronEndpoint}
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? "⏳ Testing..." : "⚡ Test Cron Endpoint"}
                        </button>

                        <button
                            onClick={checkPendingReminders}
                            disabled={loading}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? "⏳ Loading..." : "📋 Check Pending"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                        <button
                            onClick={triggerCronNow}
                            disabled={loading}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? "⏳ Triggering..." : "🔥 Trigger Cron NOW"}
                        </button>

                        <button
                            onClick={triggerRemindersNow}
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? "⏳ Triggering..." : "⚡ Send Reminders NOW"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-6">
                        <button
                            onClick={startCronJob}
                            disabled={loading}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                        >
                            {loading ? "⏳ Starting..." : "▶️ Start Real-Time Cron"}
                        </button>

                        <button
                            onClick={stopCronJob}
                            disabled={loading}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                        >
                            {loading ? "⏳ Stopping..." : "⏹️ Stop Cron Job"}
                        </button>

                        <button
                            onClick={getCronStatus}
                            disabled={loading}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                        >
                            {loading ? "⏳ Checking..." : "📊 Cron Status"}
                        </button>

                        <button
                            onClick={getNextReminder}
                            disabled={loading}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                        >
                            {loading ? "⏳ Checking..." : "⏰ Next Reminder"}
                        </button>

                        <button
                            onClick={() => window.open('/api/init', '_blank')}
                            disabled={loading}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                        >
                            🔄 Auto Init
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-6">
                            <h3 className="text-red-800 font-semibold mb-2 text-sm sm:text-base">❌ Error:</h3>
                            <pre className="text-red-700 text-xs sm:text-sm whitespace-pre-wrap">
                                {error}
                            </pre>
                        </div>
                    )}

                    {result && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                            <h3 className="text-green-800 font-semibold mb-2 text-sm sm:text-base">✅ Result:</h3>
                            <pre className="text-green-700 text-xs sm:text-sm whitespace-pre-wrap bg-white p-2 sm:p-3 rounded border overflow-auto max-h-64 sm:max-h-96">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}

                    <div className="mt-8 bg-gray-50 rounded-lg p-3 sm:p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">📝 Debug Info:</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium text-gray-700 mb-1 text-sm sm:text-base">🧪 Test Functions:</h4>
                                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                                    <li>• <strong>Test Send Reminders:</strong> Gọi trực tiếp API /api/reminders/send</li>
                                    <li>• <strong>Test Cron Endpoint:</strong> Gọi endpoint /api/cron/reminders</li>
                                    <li>• <strong>Check Pending:</strong> Xem danh sách reminder đang chờ gửi</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700 mb-1 text-sm sm:text-base">⚙️ Cron Management:</h4>
                                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                                    <li>• <strong>Start Cron Job:</strong> Bật cron job tự động (chạy mỗi 5 phút)</li>
                                    <li>• <strong>Stop Cron Job:</strong> Tắt cron job</li>
                                    <li>• <strong>Cron Status:</strong> Kiểm tra trạng thái cron job</li>
                                    <li>• <strong>Auto Init:</strong> Tự động khởi tạo cron job khi server start</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs sm:text-sm text-gray-600 break-words">
                                <strong>Current Time:</strong> {new Date().toLocaleString('vi-VN')} <br className="sm:hidden" />
                                <span className="hidden sm:inline">|</span>
                                <strong> Alternative:</strong> <code className="bg-gray-200 px-1 rounded text-xs">npm run dev:with-cron</code> để chạy server + cron cùng lúc
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}