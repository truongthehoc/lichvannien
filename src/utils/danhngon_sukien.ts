/**
 * Danh Ngôn Ý Nghĩa & Sự Kiện Lịch Sử Việt Nam "Ngày Này Năm Xưa"
 */

export interface DailyQuote {
  quote: string;
  author: string;
}

export interface HistoricalEventVN {
  year: number | string;
  title: string;
  description: string;
}

export const DAILY_QUOTES: DailyQuote[] = [
  { quote: 'Tâm an vạn sự an. Khi lòng thanh tịnh, mọi khó khăn trắc trở đều có hướng đi.', author: 'Cổ nhân' },
  { quote: 'Không có việc gì khó, chỉ sợ lòng không bền. Đào núi và lấp biển, quyết chí ắt làm nên.', author: 'Chủ tịch Hồ Chí Minh' },
  { quote: 'Đức năng thắng số. Sống hướng thiện, tích đức hành thiện là cái gốc của mọi phúc lành.', author: 'Triết lý Á Đông' },
  { quote: 'Người biết đủ trong cái đủ là người giàu có nhất thiên hạ.', author: 'Lão Tử' },
  { quote: 'Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh rồi lên cao.', author: 'Thân Nhân Trung' },
  { quote: 'Mỗi ngày mới đến là một món quà vô giá của thời gian, hãy trân trọng và sống trọn vẹn.', author: 'Danh ngôn' },
  { quote: 'Học để biết, học để làm, học để chung sống và học để tự khẳng định mình.', author: 'UNESCO' },
  { quote: 'Nước chảy đá mòn, người có chí thì ắt nên việc lớn.', author: 'Tục ngữ Việt Nam' },
  { quote: 'Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau.', author: 'Tục ngữ' },
  { quote: 'Giữ tâm trong sáng, nói lời hòa ái, làm việc chân chính, đó là cội nguồn của bình an.', author: 'Phật gia' },
  { quote: 'Càng trong gian khó, ý chí và tinh thần kiên cường của con người càng tỏa sáng rực rỡ.', author: 'Danh ngôn' },
  { quote: 'Gia đình hòa thuận thì muôn sự hưng long; lòng người đồng thuận thì dời non lấp bể.', author: 'Gia huấn' },
];

export const VIETNAMESE_HISTORY_EVENTS: Record<string, HistoricalEventVN[]> = {
  '6-10': [
    { year: '1954', title: 'Bác Hồ nói chuyện với các đơn vị bộ đội tiếp quản Thủ đô', description: 'Chủ tịch Hồ Chí Minh căn dặn bộ đội giữ vững phẩm chất, kỷ luật khi vào tiếp quản Thủ đô Hà Nội.' },
    { year: '1974', title: 'Hội nghị Bộ Chính trị quyết định kế hoạch giải phóng miền Nam', description: 'Bộ Chính trị họp bàn chiến lược tổng tiến công và nổi dậy mùa xuân năm 1975.' }
  ],
  '10-10': [
    { year: '1954', title: 'Giải phóng Thủ đô Hà Nội', description: 'Ủy ban Quân chính thành phố và các đơn vị quân đội nhân dân Việt Nam tiến vào tiếp quản Thủ đô trong rừng cờ hoa.' }
  ],
  '2-9': [
    { year: '1945', title: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa', description: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập lịch sử tại Quảng trường Ba Đình, Hà Nội.' },
    { year: '1969', title: 'Chủ tịch Hồ Chí Minh từ trần', description: 'Vị lãnh tụ kính yêu của dân tộc Việt Nam để lại Bản Di chúc thiêng liêng cho toàn Đảng, toàn dân.' }
  ],
  '30-4': [
    { year: '1975', title: 'Giải phóng Miền Nam, Thống nhất Đất nước', description: 'Chiến dịch Hồ Chí Minh lịch sử toàn thắng, lá cờ Mặt trận Dân tộc Giải phóng tung bay trên nóc Dinh Độc Lập lúc 11h30.' }
  ],
  '7-5': [
    { year: '1954', title: 'Chiến thắng Lịch sử Điện Biên Phủ', description: 'Lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm tướng De Castries, kết thúc thắng lợi cuộc kháng chiến chống thực dân Pháp.' }
  ],
  '19-8': [
    { year: '1945', title: 'Cách mạng Tháng Tám thành công rực rỡ tại Hà Nội', description: 'Hàng chục vạn quần chúng nhân dân mít tinh tại Nhà hát Lớn và đánh chiếm các cơ quan đầu não chính quyền tay sai.' }
  ],
  '3-2': [
    { year: '1930', title: 'Thành lập Đảng Cộng sản Việt Nam', description: 'Hội nghị hợp nhất các tổ chức cộng sản họp tại Cửu Long (Hương Cảng, Trung Quốc) dưới sự chủ trì của đồng chí Nguyễn Ái Quốc.' }
  ],
  '26-3': [
    { year: '1931', title: 'Thành lập Đoàn TNCS Hồ Chí Minh', description: 'Tổ chức cách mạng của tuổi trẻ Việt Nam chính thức được thành lập dưới sự lãnh đạo của Đảng.' }
  ],
  '27-7': [
    { year: '1947', title: 'Ngày Thương binh Liệt sĩ Toàn quốc', description: 'Ngày tri ân công lao to lớn của các anh hùng liệt sĩ, thương binh đã cống hiến vì độc lập tự do của Tổ quốc.' }
  ],
  '20-10': [
    { year: '1930', title: 'Thành lập Hội Phụ nữ Phản đế Việt Nam (Hội LHPN Việt Nam)', description: 'Tổ chức đại diện cho quyền lợi và sự nghiệp giải phóng của phụ nữ Việt Nam.' }
  ],
  '20-11': [
    { year: '1982', title: 'Ngày Nhà giáo Việt Nam', description: 'Ngày tôn vinh truyền thống tôn sư trọng đạo và các thế hệ thầy cô giáo nước nhà.' }
  ],
  '22-12': [
    { year: '1944', title: 'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân', description: 'Tiền thân của Quân đội Nhân dân Việt Nam được thành lập tại khu rừng Trần Hưng Đạo (Cao Bằng).' }
  ],
  '18-12': [
    { year: '1972', title: 'Mở đầu trận "Điện Biên Phủ trên không"', description: 'Quân dân Hà Nội và miền Bắc kiên cường đánh trả cuộc tập kích chiến lược bằng máy bay B-52 của không quân Mỹ.' }
  ]
};

export function getDailyQuote(day: number, month: number): DailyQuote {
  const index = (day * 31 + month) % DAILY_QUOTES.length;
  return DAILY_QUOTES[index];
}

export function getDailyVNEvents(day: number, month: number): HistoricalEventVN[] {
  const key = `${day}-${month}`;
  if (VIETNAMESE_HISTORY_EVENTS[key]) {
    return VIETNAMESE_HISTORY_EVENTS[key];
  }
  
  // Sự kiện lịch sử tiêu biểu truyền thống
  return [
    {
      year: 'Lịch sử Việt Nam',
      title: `Ngày ${day}/${month} trong dòng chảy lịch sử dân tộc`,
      description: 'Ghi dấu những mốc son hào hùng trong công cuộc dựng nước, giữ nước và phát triển trường tồn của non sông Đại Việt.'
    }
  ];
}
