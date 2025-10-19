'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/hooks/useSettings';
import { Turnstile } from '@marsidev/react-turnstile';
import { saveLocalReminder } from '@/lib/localStorage';

interface ReminderFormProps {
  onSuccess?: () => void;
}

export function ReminderForm({ onSuccess }: ReminderFormProps) {
  const { isFeatureEnabled, getSetting, isLoading: settingsLoading } = useSettings();
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: '',
    reminderDate: '',
    reminderTime: '',
    isRecurring: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  // Kiểm tra nếu tính năng bị tắt
  if (settingsLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isFeatureEnabled('enable_reminders')) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <i className="fas fa-bell-slash text-4xl text-neutral-300 mb-4"></i>
          <h3 className="text-lg font-medium text-neutral-600 mb-2">
            Tính năng nhắc nhở đã bị tắt
          </h3>
          <p className="text-neutral-500">
            Vui lòng liên hệ quản trị viên để bật lại tính năng này
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Check CAPTCHA if enabled
    const isCaptchaEnabled = isFeatureEnabled('enable_captcha');
    if (isCaptchaEnabled && !captchaToken) {
      setMessage({ type: 'error', text: 'Vui lòng xác thực CAPTCHA' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Call API to create reminder on server
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: isCaptchaEnabled ? captchaToken : undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra khi tạo nhắc nhở');
      }

      const serverReminder = await response.json();

      setMessage({ 
        type: 'success', 
        text: serverReminder.message // Use message from server
      });
      
      setFormData({
        email: '',
        title: '',
        description: '',
        reminderDate: '',
        reminderTime: '',
        isRecurring: false
      });
      setCaptchaToken(null);
      turnstileRef.current?.reset();
      onSuccess?.();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi lưu nhắc nhở' 
      });
      // Reset CAPTCHA on error
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Tạo nhắc nhở và nhận thông báo qua email
        </p>
      </div>

      {message && (
        <div className={cn(
          "mb-6 p-4 rounded-lg border",
          message.type === 'success' 
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        )}>
          <div className="flex items-center">
            <i className={cn(
              "mr-2",
              message.type === 'success' ? "fas fa-check-circle" : "fas fa-exclamation-circle"
            )}></i>
            {message.text}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            <i className="fas fa-envelope mr-1"></i>
            Email nhận thông báo *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
            <i className="fas fa-tag mr-1"></i>
            Tiêu đề nhắc nhở *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            placeholder="VD: Sinh nhật mẹ, Họp công ty..."
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
            <i className="fas fa-align-left mr-1"></i>
            Mô tả (tùy chọn)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder="Thêm mô tả chi tiết về sự kiện..."
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reminderDate" className="block text-sm font-medium text-neutral-700 mb-2">
              <i className="fas fa-calendar mr-1"></i>
              Ngày nhắc nhở *
            </label>
            <input
              type="date"
              id="reminderDate"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="reminderTime" className="block text-sm font-medium text-neutral-700 mb-2">
              <i className="fas fa-clock mr-1"></i>
              Thời gian (tùy chọn)
            </label>
            <input
              type="time"
              id="reminderTime"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Recurring */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isRecurring"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-gray-300 rounded"
          />
          <label htmlFor="isRecurring" className="ml-2 block text-sm text-neutral-700">
            <i className="fas fa-repeat mr-1"></i>
            Lặp lại hàng năm
          </label>
        </div>

        {/* CAPTCHA */}
        {isFeatureEnabled('enable_captcha') && getSetting('turnstile_site_key') && (
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={getSetting('turnstile_site_key')}
              onSuccess={(token) => setCaptchaToken(token)}
              onError={() => setCaptchaToken(null)}
              onExpire={() => setCaptchaToken(null)}
              options={{
                theme: 'light',
                size: 'normal',
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-3 px-6 rounded-lg font-medium transition-all",
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary text-white hover:shadow-lg transform hover:-translate-y-0.5"
            )}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Đang tạo nhắc nhở...
              </>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                Lưu Nhắc Nhở
              </>
            )}
          </button>
        </div>
      </form>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          <i className="fas fa-info-circle mr-1"></i>
          Lưu ý:
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Nhắc nhở sẽ được lưu vào hệ thống với trạng thái "Chờ gửi"</li>
          <li>• Email sẽ được gửi tự động vào đúng ngày và giờ đã đặt</li>
          <li>• Nếu chọn &ldquo;Lặp lại hàng năm&rdquo;, nhắc nhở sẽ tự động tạo lại mỗi năm</li>
          <li>• Bạn có thể xem, sửa và xóa nhắc nhở trong danh sách bên cạnh</li>
        </ul>
      </div>
    </div>
  );
}
