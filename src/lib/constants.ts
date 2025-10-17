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
  { date: '02-27', title: 'Ngày Thầy thuốc Việt Nam', desc: 'Tôn vinh những người làm trong ngành y tế Việt Nam', type: 'culture' },
  { date: '03-08', title: 'Ngày Quốc tế Phụ nữ', desc: 'Ngày 8/3 - Ngày của các bà, các mẹ', type: 'holiday' },
  { date: '03-14', title: 'Ngày sinh Albert Einstein', desc: 'Sinh nhật nhà bác học Albert Einstein', type: 'culture' },
  { date: '03-20', title: 'Ngày Quốc tế Hạnh phúc', desc: 'Ngày vì hạnh phúc của nhân loại', type: 'culture' },
  { date: '03-21', title: 'Ngày quốc tế xóa bỏ phân biệt chủng tộc', desc: 'Ngày đấu tranh vì bình đẳng con người', type: 'culture' },
  { date: '03-22', title: 'Ngày Nước sạch Thế giới', desc: 'Bảo vệ nguồn nước và môi trường', type: 'culture' },
  { date: '03-23', title: 'Ngày Khí tượng Thế giới', desc: 'Ngày tôn vinh ngành khí tượng và thời tiết', type: 'culture' },
  { date: '03-26', title: 'Ngày thành lập Đoàn TNCS Hồ Chí Minh', desc: 'Kỷ niệm thành lập Đoàn (26/3/1931)', type: 'history' },
  { date: '04-04', title: 'Ngày Quốc tế Nhận thức bom mìn', desc: 'Nâng cao nhận thức về hậu quả của bom mìn', type: 'culture' },
  { date: '04-06', title: 'Ngày Toàn dân hiến máu', desc: 'Ngày vì sự sống và nhân đạo', type: 'culture' },
  { date: '04-14', title: 'Tết Khmer Nam Bộ', desc: 'Tết truyền thống của đồng bào Khmer', type: 'culture' },
  { date: '04-22', title: 'Ngày Trái Đất', desc: 'Ngày bảo vệ hành tinh xanh', type: 'culture' },
  { date: '04-23', title: 'Ngày Sách và Bản quyền Thế giới', desc: 'Khuyến khích đọc sách và bảo vệ quyền tác giả', type: 'culture' },
  { date: '04-26', title: 'Ngày Sở hữu trí tuệ Thế giới', desc: 'Nâng cao nhận thức về sáng tạo và bản quyền', type: 'culture' },
  { date: '04-30', title: 'Ngày Giải phóng miền Nam', desc: 'Ngày thống nhất đất nước (30/4/1975)', type: 'holiday' },
  { date: '05-01', title: 'Ngày Quốc tế Lao động', desc: 'Ngày 1/5 - Ngày của người lao động', type: 'holiday' },
  { date: '05-03', title: 'Ngày Tự do Báo chí Thế giới', desc: 'Tôn vinh quyền tự do báo chí', type: 'culture' },
  { date: '05-07', title: 'Ngày Chiến thắng Điện Biên Phủ', desc: 'Chiến thắng lịch sử (7/5/1954)', type: 'history' },
  { date: '05-15', title: 'Ngày Gia đình Việt Nam', desc: 'Ngày của gia đình Việt Nam', type: 'culture' },
  { date: '05-19', title: 'Ngày sinh Chủ tịch Hồ Chí Minh', desc: 'Sinh nhật Bác Hồ (19/5/1890)', type: 'history' },
  { date: '05-21', title: 'Ngày Thế giới Đa dạng Văn hóa', desc: 'Ngày vì đối thoại và phát triển', type: 'culture' },
  { date: '05-22', title: 'Ngày Quốc tế Đa dạng sinh học', desc: 'Bảo vệ sự phong phú của tự nhiên', type: 'culture' },
  { date: '05-31', title: 'Ngày Thế giới Không thuốc lá', desc: 'Cảnh báo tác hại của thuốc lá', type: 'culture' },
  { date: '06-01', title: 'Ngày Quốc tế Thiếu nhi', desc: 'Ngày 1/6 - Ngày của trẻ em', type: 'holiday' },
  { date: '06-05', title: 'Ngày Môi trường Thế giới', desc: 'Bảo vệ môi trường toàn cầu', type: 'culture' },
  { date: '06-17', title: 'Ngày Chống sa mạc hóa Thế giới', desc: 'Phòng chống sa mạc hóa và hạn hán', type: 'culture' },
  { date: '06-21', title: 'Ngày Báo chí Cách mạng Việt Nam', desc: 'Tôn vinh những người làm báo', type: 'history' },
  { date: '06-26', title: 'Ngày Quốc tế chống ma túy', desc: 'Phòng chống ma túy toàn cầu', type: 'culture' },
  { date: '06-28', title: 'Ngày Gia đình Việt Nam', desc: 'Ngày của gia đình', type: 'culture' },
  { date: '07-11', title: 'Ngày Dân số Thế giới', desc: 'Nâng cao nhận thức về dân số', type: 'culture' },
  { date: '07-27', title: 'Ngày Thương binh Liệt sĩ', desc: 'Tưởng nhớ các anh hùng liệt sĩ', type: 'history' },
  { date: '07-28', title: 'Ngày thành lập Công đoàn Việt Nam', desc: 'Kỷ niệm thành lập Công đoàn Việt Nam', type: 'history' },
  { date: '08-09', title: 'Ngày Quốc tế Người bản địa', desc: 'Tôn vinh cộng đồng thổ dân', type: 'culture' },
  { date: '08-12', title: 'Ngày Quốc tế Thanh niên', desc: 'Ngày của giới trẻ toàn cầu', type: 'culture' },
  { date: '08-19', title: 'Cách mạng tháng Tám', desc: 'Cách mạng tháng 8 năm 1945', type: 'history' },
  { date: '08-19', title: 'Ngày Truyền thống Công an Nhân dân', desc: 'Kỷ niệm thành lập lực lượng công an nhân dân', type: 'history' },
  { date: '08-19', title: 'Ngày Nhiếp ảnh Thế giới', desc: 'Ngày tôn vinh nghệ thuật nhiếp ảnh', type: 'culture' },
  { date: '08-23', title: 'Ngày Quốc tế tưởng niệm buôn bán nô lệ', desc: 'Nhắc nhở bài học lịch sử nhân loại', type: 'culture' },
  { date: '09-02', title: 'Quốc khánh Việt Nam', desc: 'Ngày Độc lập 2/9/1945', type: 'holiday' },
  { date: '09-08', title: 'Ngày Quốc tế Xóa mù chữ', desc: 'Khuyến khích học tập suốt đời', type: 'culture' },
  { date: '09-20', title: 'Việt Nam gia nhập Liên Hiệp Quốc', desc: 'Việt Nam gia nhập LHQ (20/9/1977)', type: 'history' },
  { date: '09-21', title: 'Ngày Quốc tế Hòa bình', desc: 'Ngày hòa bình thế giới', type: 'culture' },
  { date: '09-22', title: 'Tết Katê', desc: 'Tết truyền thống của đồng bào Chăm', type: 'culture' },
  { date: '09-23', title: 'Ngày Nam Bộ kháng chiến', desc: 'Ngày Nam Bộ kháng chiến (23/9/1945)', type: 'history' },
  { date: '09-27', title: 'Khởi nghĩa Bắc Sơn', desc: 'Khởi nghĩa Bắc Sơn (27/9/1940)', type: 'history' },
  { date: '09-28', title: 'Lễ hội chọi trâu Đồ Sơn', desc: 'Lễ hội chọi trâu truyền thống Hải Phòng', type: 'culture' },
  { date: '10-01', title: 'Ngày Quốc tế Người cao tuổi', desc: 'Ngày tri ân người cao tuổi', type: 'culture' },
  { date: '10-04', title: 'Ngày Động vật Thế giới', desc: 'Bảo vệ các loài động vật', type: 'culture' },
  { date: '10-05', title: 'Ngày Nhà giáo Thế giới', desc: 'Tôn vinh nghề giáo trên toàn cầu', type: 'culture' },
  { date: '10-09', title: 'Ngày Bưu chính Thế giới', desc: 'Ngày truyền thống ngành bưu chính', type: 'culture' },
  { date: '10-10', title: 'Ngày Giải phóng Thủ đô', desc: 'Giải phóng Hà Nội (10/10/1954)', type: 'history' },
  { date: '10-13', title: 'Ngày Doanh nhân Việt Nam', desc: 'Tôn vinh doanh nhân Việt', type: 'culture' },
  { date: '10-14', title: 'Ngày thành lập Hội Nông dân Việt Nam', desc: 'Kỷ niệm thành lập Hội Nông dân Việt Nam', type: 'culture' },
  { date: '10-15', title: 'Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam', desc: 'Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam', type: 'culture' },
  { date: '10-16', title: 'Ngày Lương thực Thế giới', desc: 'Bảo đảm an ninh lương thực toàn cầu', type: 'culture' },
  { date: '10-17', title: 'Ngày Quốc tế Xóa đói giảm nghèo', desc: 'Chung tay vì thế giới không đói nghèo', type: 'culture' },
  { date: '10-20', title: 'Ngày Phụ nữ Việt Nam', desc: 'Ngày 20/10 - Ngày của phụ nữ Việt Nam', type: 'holiday' },
  { date: '11-09', title: 'Ngày Pháp luật Việt Nam', desc: 'Ngày pháp luật nước CHXHCN Việt Nam', type: 'culture' },
  { date: '11-20', title: 'Ngày Nhà giáo Việt Nam', desc: 'Ngày 20/11 - Ngày của thầy cô giáo', type: 'holiday' },
  { date: '11-25', title: 'Ngày Quốc tế Chống bạo lực với phụ nữ', desc: 'Bảo vệ quyền phụ nữ', type: 'culture' },
  { date: '12-01', title: 'Ngày Thế giới Phòng chống AIDS', desc: 'Phòng chống HIV/AIDS toàn cầu', type: 'culture' },
  { date: '12-03', title: 'Ngày Quốc tế Người khuyết tật', desc: 'Tôn vinh người khuyết tật', type: 'culture' },
  { date: '12-09', title: 'Ngày Quốc tế Chống tham nhũng', desc: 'Phòng chống tham nhũng', type: 'culture' },
  { date: '12-19', title: 'Ngày Toàn quốc kháng chiến', desc: 'Kỷ niệm toàn quốc kháng chiến 1946', type: 'history' },
  { date: '12-22', title: 'Ngày thành lập Quân đội nhân dân Việt Nam', desc: 'Thành lập QĐND Việt Nam (22/12/1944)', type: 'history' },
  { date: '12-25', title: 'Lễ Giáng sinh', desc: 'Lễ Noel - Giáng sinh', type: 'culture' },
  { date: '12-31', title: 'Đêm Giao thừa Dương lịch', desc: 'Khoảnh khắc chuyển giao năm mới', type: 'holiday' }
];

export const HOLIDAYS: HolidayData[] = [
  { date: '01-01', name: 'Tết Dương lịch' },
  { date: '02-14', name: 'Lễ Tình nhân Valentine' },
  { date: '03-08', name: 'Ngày Quốc tế Phụ nữ' },
  { date: '04-30', name: 'Ngày Giải phóng miền Nam' },
  { date: '05-01', name: 'Ngày Quốc tế Lao động' },
  { date: '06-01', name: 'Ngày Quốc tế Thiếu nhi' },
  { date: '09-02', name: 'Quốc khánh Việt Nam' },
  { date: '10-20', name: 'Ngày Phụ nữ Việt Nam' },
  { date: '11-20', name: 'Ngày Nhà giáo Việt Nam' },
  { date: '12-25', name: 'Lễ Giáng sinh' },
  { date: '12-31', name: 'Đêm Giao thừa Dương lịch' }
];

export const QUOTES = [
  // --- Việt Nam: Tục ngữ & Ca dao ---
  { text: "Có chí thì nên, không gì là khó", author: "Tục ngữ Việt Nam" },
  { text: "Trăm hay không bằng tay quen", author: "Tục ngữ Việt Nam" },
  { text: "Học thầy không tày học bạn", author: "Tục ngữ Việt Nam" },
  { text: "Cái khó ló cái khôn", author: "Tục ngữ Việt Nam" },
  { text: "Ăn quả nhớ kẻ trồng cây", author: "Tục ngữ Việt Nam" },
  { text: "Một cây làm chẳng nên non, Ba cây chụm lại nên hòn núi cao", author: "Ca dao Việt Nam" },
  { text: "Công cha như núi Thái Sơn, Nghĩa mẹ như nước trong nguồn chảy ra", author: "Ca dao Việt Nam" },
  { text: "Uống nước nhớ nguồn", author: "Tục ngữ Việt Nam" },
  { text: "Đi một ngày đàng, học một sàng khôn", author: "Tục ngữ Việt Nam" },
  { text: "Gần mực thì đen, gần đèn thì sáng", author: "Tục ngữ Việt Nam" },
  { text: "Có công mài sắt, có ngày nên kim", author: "Tục ngữ Việt Nam" },
  { text: "Thất bại là mẹ thành công", author: "Tục ngữ Việt Nam" },
  { text: "Không thầy đố mày làm nên", author: "Tục ngữ Việt Nam" },
  { text: "Lửa thử vàng, gian nan thử sức", author: "Tục ngữ Việt Nam" },
  { text: "Khó khăn là mẹ của thành công", author: "Tục ngữ Việt Nam" },
  { text: "Việc gì khó, đã có trời xanh", author: "Tục ngữ Việt Nam" },

  // --- Triết lý & Học tập (Khổng Tử, Lão Tử, Phật giáo) ---
  { text: "Làm việc khó mộng để thành, việc dễ thành lòng thường kiêu ngạo", author: "Khổng Tử" },
  { text: "Học mà không nghĩ thì mông lung, nghĩ mà không học thì nguy hiểm", author: "Khổng Tử" },
  { text: "Biết mà học không bằng thích học, thích học không bằng vui học", author: "Khổng Tử" },
  { text: "Người quân tử hòa mà không đồng, kẻ tiểu nhân đồng mà không hòa", author: "Khổng Tử" },
  { text: "Ai thắng người đó là mạnh, ai thắng chính mình mới là anh hùng", author: "Lão Tử" },
  { text: "Biết đủ là giàu, biết dừng là an", author: "Lão Tử" },
  { text: "Không có con đường dẫn đến hạnh phúc, hạnh phúc chính là con đường", author: "Phật Thích Ca" },
  { text: "Tâm tĩnh thì vạn vật đều tĩnh", author: "Thiền ngữ" },

  // --- Thành công & Làm việc ---
  { text: "Đừng để đến ngày mai những việc gì anh có thể làm hôm nay", author: "Lord Chesterfield" },
  { text: "Thành công là đi từ thất bại này đến thất bại khác mà không mất đi nhiệt huyết", author: "Winston Churchill" },
  { text: "Điều duy nhất không thể thay thế được chính là thời gian", author: "Napoleon Bonaparte" },
  { text: "Người thành công tạo ra cơ hội, kẻ thất bại chờ cơ hội đến", author: "Khuyết danh" },
  { text: "Khi bạn dám ước mơ, hãy dám làm", author: "Walt Disney" },
  { text: "Không ai có thể quay lại quá khứ và bắt đầu lại, nhưng ai cũng có thể bắt đầu hôm nay để tạo ra một kết thúc mới", author: "Maria Robinson" },
  { text: "Thành công không phải là điểm đến, mà là hành trình bạn đi qua", author: "Zig Ziglar" },
  { text: "Để thành công, trước tiên hãy tin rằng mình có thể", author: "Nikos Kazantzakis" },

  // --- Cuộc sống & Hạnh phúc ---
  { text: "Cuộc sống là những gì xảy ra với bạn khi bạn đang bận rộn lập kế hoạch khác", author: "John Lennon" },
  { text: "Hạnh phúc không phải là điều gì đó có sẵn. Nó đến từ hành động của chính bạn", author: "Dalai Lama" },
  { text: "Nếu bạn muốn sống một cuộc đời hạnh phúc, hãy gắn nó với một mục tiêu, không phải với con người hay vật chất", author: "Albert Einstein" },
  { text: "Đừng khóc vì điều đã kết thúc, hãy cười vì nó đã xảy ra", author: "Dr. Seuss" },
  { text: "Sống là cho đâu chỉ nhận riêng mình", author: "Tố Hữu" },
  { text: "Đời thay đổi khi chúng ta thay đổi", author: "Khuyết danh" },
  { text: "Mỗi ngày là một cơ hội để trở nên tốt hơn hôm qua", author: "Khuyết danh" },
  { text: "Thời gian là thứ duy nhất ta không thể lấy lại, vì thế hãy dùng nó khôn ngoan", author: "Khuyết danh" },

  // --- Tình yêu & Nhân sinh ---
  { text: "Tình yêu là khi hạnh phúc của người khác quan trọng hơn của chính bạn", author: "H. Jackson Brown Jr." },
  { text: "Không có con đường nào dẫn đến tình yêu, bởi tình yêu chính là con đường", author: "Thích Nhất Hạnh" },
  { text: "Tình yêu chân thành bắt đầu từ lòng vị tha", author: "Khuyết danh" },
  { text: "Sống là yêu thương, vì yêu thương chính là sự sống", author: "Khuyết danh" },
  { text: "Người biết yêu thương sẽ không bao giờ nghèo nàn", author: "Khuyết danh" },
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

export const ZODIAC_ANIMALS = {
  rat: { name: 'Tý (Chuột)', emoji: '🐭', icon: 'fas fa-mouse' },
  ox: { name: 'Sửu (Trâu)', emoji: '🐂', icon: 'fas fa-cow' },
  tiger: { name: 'Dần (Hổ)', emoji: '🐅', icon: 'fas fa-tiger' },
  rabbit: { name: 'Mão (Mèo)', emoji: '🐰', icon: 'fas fa-rabbit' },
  dragon: { name: 'Thìn (Rồng)', emoji: '🐉', icon: 'fas fa-dragon' },
  snake: { name: 'Tỵ (Rắn)', emoji: '🐍', icon: 'fas fa-snake' },
  horse: { name: 'Ngọ (Ngựa)', emoji: '🐎', icon: 'fas fa-horse' },
  goat: { name: 'Mùi (Dê)', emoji: '🐐', icon: 'fas fa-goat' },
  monkey: { name: 'Thân (Khỉ)', emoji: '🐵', icon: 'fas fa-monkey' },
  rooster: { name: 'Dậu (Gà)', emoji: '🐓', icon: 'fas fa-rooster' },
  dog: { name: 'Tuất (Chó)', emoji: '🐕', icon: 'fas fa-dog' },
  pig: { name: 'Hợi (Heo)', emoji: '🐷', icon: 'fas fa-pig' }
};

export const getZodiacAnimal = (year: number) => {
  const animals = ['monkey', 'rooster', 'dog', 'pig', 'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat'];
  const animalIndex = year % 12;
  const animalKey = animals[animalIndex] as keyof typeof ZODIAC_ANIMALS;
  return ZODIAC_ANIMALS[animalKey];
};
