'use client';

import { useState } from 'react';

const FAQ_DATA = [
  {
    question: "Lịch âm dương là gì?",
    answer: "Lịch âm dương là hệ thống lịch kết hợp giữa lịch âm (theo chu kỳ mặt trăng) và lịch dương (theo chu kỳ mặt trời). Đây là hệ thống lịch truyền thống của Việt Nam, được sử dụng để xác định các ngày lễ, tết và các sự kiện văn hóa quan trọng."
  },
  {
    question: "Làm thế nào để chuyển đổi từ dương lịch sang âm lịch?",
    answer: "Bạn có thể sử dụng công cụ chuyển đổi lịch trên website này. Chỉ cần nhập ngày dương lịch, hệ thống sẽ tự động tính toán và hiển thị ngày âm lịch tương ứng cùng với các thông tin bổ sung như can chi, tiết khí."
  },
  {
    question: "Giờ hoàng đạo là gì?",
    answer: "Giờ hoàng đạo là những khung giờ trong ngày được xem là tốt lành, thuận lợi để làm việc quan trọng theo quan niệm phong thủy truyền thống. Mỗi ngày có những giờ hoàng đạo khác nhau dựa trên can chi của ngày đó."
  },
  {
    question: "Tại sao cần biết ngày âm lịch?",
    answer: "Ngày âm lịch rất quan trọng trong văn hóa Việt Nam để xác định các ngày lễ tết (như Tết Nguyên Đán, Tết Trung Thu), ngày giỗ tổ tiên, và các hoạt động tâm linh. Nhiều người cũng dựa vào âm lịch để chọn ngày tốt cho các sự kiện quan trọng."
  },
  {
    question: "Làm sao để tạo nhắc nhở sự kiện?",
    answer: "Bạn có thể vào trang 'Nhắc nhở' để tạo các sự kiện cá nhân. Hệ thống sẽ gửi email thông báo trước khi đến ngày sự kiện để bạn không bỏ lỡ những dịp quan trọng."
  },
  {
    question: "Website có miễn phí không?",
    answer: "Có, tất cả các tính năng cơ bản của website đều hoàn toàn miễn phí. Bạn có thể xem lịch, chuyển đổi ngày, tạo nhắc nhở và sử dụng mọi công cụ mà không mất phí."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
        ❓ Câu Hỏi Thường Gặp
      </h2>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-emerald-600 transition-transform">
                {openIndex === index ? '▲' : '▼'}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-3">
          Không tìm thấy câu trả lời bạn cần?
        </p>
        <a href='https://t.me/rumhtmvt' target='_blank' className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors">
          ✉️ Liên hệ hỗ trợ
        </a>
      </div>
    </div>
  );
}
