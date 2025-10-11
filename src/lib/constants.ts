export interface EventData {
  date: string; // Format: MM-DD
  title: string;
  desc: string;
  type: 'holiday' | 'history' | 'culture';
}

export interface HolidayData {
  date: string; // Format: MM-DD
  name: string;
}

export const EVENTS: EventData[] = [
  { date: '01-01', title: 'Tết Dương lịch', desc: 'Năm mới dương lịch', type: 'holiday' },
  { date: '02-03', title: 'Ngày thành lập Đảng Cộng sản Việt Nam', desc: 'Kỷ niệm thành lập Đảng (3/2/1930)', type: 'history' },
  { date: '02-14', title: 'Lễ tình nhân Valentine', desc: 'Ngày lễ tình yêu quốc tế', type: 'culture' },
  { date: '03-08', title: 'Ngày Quốc tế Phụ nữ', desc: 'Ngày 8/3 - Ngày của các bà, các mẹ', type: 'holiday' },
  { date: '03-26', title: 'Ngày thành lập Đoàn TNCS Hồ Chí Minh', desc: 'Kỷ niệm thành lập Đoàn (26/3/1931)', type: 'history' },
  { date: '04-30', title: 'Ngày Giải phóng miền Nam', desc: 'Ngày thống nhất đất nước (30/4/1975)', type: 'holiday' },
  { date: '05-01', title: 'Ngày Quốc tế Lao động', desc: 'Ngày 1/5 - Ngày của người lao động', type: 'holiday' },
  { date: '05-07', title: 'Ngày Chiến thắng Điện Biên Phủ', desc: 'Chiến thắng lịch sử (7/5/1954)', type: 'history' },
  { date: '05-15', title: 'Ngày gia đình Việt Nam', desc: 'Ngày của gia đình Việt Nam', type: 'culture' },
  { date: '05-19', title: 'Ngày sinh Chủ tịch Hồ Chí Minh', desc: 'Sinh nhật Bác Hồ (19/5/1890)', type: 'history' },
  { date: '06-01', title: 'Ngày Quốc tế Thiếu nhi', desc: 'Ngày 1/6 - Ngày của trẻ em', type: 'holiday' },
  { date: '06-28', title: 'Ngày Gia đình Việt Nam', desc: 'Ngày của gia đình', type: 'culture' },
  { date: '07-27', title: 'Ngày Thương binh Liệt sĩ', desc: 'Tưởng nhớ các anh hùng liệt sĩ', type: 'history' },
  { date: '08-19', title: 'Cách mạng tháng Tám', desc: 'Cách mạng tháng 8 năm 1945', type: 'history' },
  { date: '09-02', title: 'Quốc khánh Việt Nam', desc: 'Ngày Độc lập 2/9/1945', type: 'holiday' },
  { date: '09-20', title: 'Việt Nam gia nhập Liên Hiệp Quốc', desc: 'Việt Nam gia nhập LHQ (20/9/1977)', type: 'history' },
  { date: '09-21', title: 'Ngày Quốc tế Hòa bình', desc: 'Ngày hòa bình thế giới', type: 'culture' },
  { date: '09-22', title: 'Tết Katê', desc: 'Tết truyền thống của đồng bào Chăm', type: 'culture' },
  { date: '09-23', title: 'Ngày Nam Bộ kháng chiến', desc: 'Ngày Nam Bộ kháng chiến (23/9/1945)', type: 'history' },
  { date: '09-25', title: 'Lễ hội Đình Châm Khê', desc: 'Lễ hội truyền thống Bắc Ninh', type: 'culture' },
  { date: '09-27', title: 'Khởi nghĩa Bắc Sơn', desc: 'Khởi nghĩa Bắc Sơn (27/9/1940)', type: 'history' },
  { date: '09-28', title: 'Lễ hội chọi trâu Đồ Sơn', desc: 'Lễ hội chọi trâu truyền thống Hải Phòng', type: 'culture' },
  { date: '10-10', title: 'Ngày Giải phóng Thủ đô', desc: 'Giải phóng Hà Nội (10/10/1954)', type: 'history' },
  { date: '10-20', title: 'Ngày Phụ nữ Việt Nam', desc: 'Ngày 20/10 - Ngày của phụ nữ Việt Nam', type: 'holiday' },
  { date: '11-09', title: 'Ngày pháp luật Việt Nam', desc: 'Ngày pháp luật nước CHXHCN Việt Nam', type: 'culture' },
  { date: '11-20', title: 'Ngày Nhà giáo Việt Nam', desc: 'Ngày 20/11 - Ngày của thầy cô giáo', type: 'holiday' },
  { date: '12-22', title: 'Ngày thành lập Quân đội nhân dân Việt Nam', desc: 'Thành lập QĐND Việt Nam (22/12/1944)', type: 'history' },
  { date: '12-25', title: 'Lễ Giáng sinh', desc: 'Lễ Noel - Giáng sinh', type: 'culture' }
];

export const HOLIDAYS: HolidayData[] = [
  { date: '01-01', name: 'Tết Dương lịch' },
  { date: '03-08', name: 'Ngày Quốc tế Phụ nữ' },
  { date: '04-30', name: 'Ngày Giải phóng miền Nam' },
  { date: '05-01', name: 'Ngày Quốc tế Lao động' },
  { date: '09-02', name: 'Quốc khánh Việt Nam' },
  { date: '10-20', name: 'Ngày Phụ nữ Việt Nam' },
  { date: '11-20', name: 'Ngày Nhà giáo Việt Nam' }
];

export const INSPIRATIONAL_QUOTES = [
  {
    text: "Đừng để đến ngày mai những việc gì anh có thể làm hôm nay",
    author: "LORD CHESTERFIELD"
  },
  {
    text: "Thành công là đi từ thất bại này đến thất bại khác mà không mất đi nhiệt huyết",
    author: "WINSTON CHURCHILL"
  },
  {
    text: "Điều duy nhất không thể thay thế được chính là thời gian",
    author: "NAPOLEON BONAPARTE"
  },
  {
    text: "Hạnh phúc không phải là điều gì đó có sẵn. Nó đến từ hành động của chính bạn",
    author: "DALAI LAMA"
  },
  {
    text: "Cuộc sống là những gì xảy ra với bạn khi bạn đang bận rộn lập kế hoạch khác",
    author: "JOHN LENNON"
  }
];

export const DAY_NAMES = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
export const DAY_NAMES_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export const MONTH_NAMES_SHORT = [
  'T1', 'T2', 'T3', 'T4', 'T5', 'T6',
  'T7', 'T8', 'T9', 'T10', 'T11', 'T12'
];

export const EVENT_TYPE_COLORS = {
  holiday: 'text-red-500 bg-red-50',
  history: 'text-blue-500 bg-blue-50',
  culture: 'text-pink-500 bg-pink-50'
};

export const EVENT_TYPE_ICONS = {
  holiday: 'fas fa-star',
  history: 'fas fa-landmark',
  culture: 'fas fa-heart'
};
