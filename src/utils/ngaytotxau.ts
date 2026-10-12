/**
 * Tra cứu Ngày Tốt Xấu, Thập Nhị Trực, Nhị Thập Bát Tú, Thần Sát, Tuổi Xung, Hướng Xuất Hành
 */

export interface SaoInfo {
  name: string;
  type: 'tot' | 'xau';
  description: string;
}

export interface NgayTotXauInfo {
  truc: { name: string; meaning: string; shouldDo: string[]; shouldAvoid: string[] };
  nhiThapBatTu: { name: string; element: string; animal: string; quality: 'Tốt' | 'Xấu' | 'Bình'; meaning: string; advice: string };
  saoTot: SaoInfo[];
  saoXau: SaoInfo[];
  tuoiXung: string[];
  huongXuatHanh: {
    hyThan: string;
    taiThan: string;
    hacThan: string;
  };
  tamNuong: boolean;
  nguyetKy: boolean;
  duongCongKy: boolean;
  satChu: boolean;
  thoTu: boolean;
  rating: 'Đại Cát' | 'Tiểu Cát' | 'Bình Thường' | 'Hung' | 'Đại Hung';
  score: number; // 0 - 100
  recommendedActivities: string[];
  avoidActivities: string[];
}

export const THAP_NHI_TRUC = [
  { name: 'Kiến', meaning: 'Vạn vật sinh sôi, bắt đầu tạo dựng mới', shouldDo: ['Khởi công', 'Xuất hành', 'Đính hôn', 'Nhập học'], shouldAvoid: ['Động thổ', 'Đào giếng', 'Chôn cất'] },
  { name: 'Trừ', meaning: 'Tẩy trừ điều cũ, trừ tà diệt ác', shouldDo: ['Chữa bệnh', 'Tắm gội', 'Dọn dẹp', 'Cắt cỏ', 'Trừ sâu'], shouldAvoid: ['Cưới hỏi', 'Khai trương', 'Ký hợp đồng'] },
  { name: 'Mãn', meaning: 'Đầy đủ, viên mãn, thu hoạch thành quả', shouldDo: ['Cúng tế', 'Cầu phúc', 'Cưới hỏi', 'Nhậm chức', 'Mở cửa hàng'], shouldAvoid: ['Chữa bệnh', 'Vay mượn', 'Chôn cất'] },
  { name: 'Bình', meaning: 'Bình ổn, cân bằng mọi sự bình an', shouldDo: ['Sửa đường', 'Đắp đê', 'Làm phẳng nền', 'Cưới hỏi', 'Giao dịch'], shouldAvoid: ['Đào mương', 'Tranh chấp', 'Kiện tụng'] },
  { name: 'Định', meaning: 'Định liệu vững chắc, trường tồn lâu dài', shouldDo: ['Ký hợp đồng', 'Giao dịch', 'Cưới hỏi', 'Nhập trạch', 'Làm chuồng trại'], shouldAvoid: ['Kiện tụng', 'Tranh chấp', 'Chữa bệnh'] },
  { name: 'Chấp', meaning: 'Cầm giữ, quy củ, duy trì nề nếp', shouldDo: ['Gieo trồng', 'Bắt trộm', 'Tu bổ nhà cửa', 'Xây đắp'], shouldAvoid: ['Di chuyển chỗ ở', 'Khai trương', 'Xuất kho tiền của'] },
  { name: 'Phá', meaning: 'Phá vỡ cái cũ, dẹp bỏ chướng ngại', shouldDo: ['Phá dỡ nhà cũ', 'Chữa bệnh nan y', 'Trừ tà', 'Bắt gian'], shouldAvoid: ['Cưới hỏi', 'Khai trương', 'Ký hợp đồng', 'Hội họp'] },
  { name: 'Nguy', meaning: 'Nguy hiểm, trắc trở, cần thận trọng', shouldDo: ['Làm việc thiện', 'Cúng tế cầu an'], shouldAvoid: ['Trèo cao', 'Đi thuyền vượt biển', 'Khởi công việc trọng đại'] },
  { name: 'Thành', meaning: 'Thành tựu mỹ mãn, mọi việc hanh thông', shouldDo: ['Khai trương', 'Cưới hỏi', 'Nhập trạch', 'Xuất hành', 'Giao dịch', 'Làm nhà'], shouldAvoid: ['Kiện tụng', 'Tranh cãi'] },
  { name: 'Thâu', meaning: 'Thu gom, đón nhận tài lộc tích lũy', shouldDo: ['Thu tiền nợ', 'Gặt hái', 'Mua sắm tài sản', 'Nuôi gia súc'], shouldAvoid: ['Chôn cất', 'Chữa bệnh', 'Cho vay tiền'] },
  { name: 'Khai', meaning: 'Khai mở, thông suốt, khởi sự phát đạt', shouldDo: ['Khai trương', 'Động thổ', 'Cưới hỏi', 'Nhập học', 'Ký kết hợp đồng'], shouldAvoid: ['Chôn cất', 'Phá dỡ'] },
  { name: 'Bế', meaning: 'Đóng kín, bế tắc, ẩn tàng nghỉ ngơi', shouldDo: ['Đắp đê', 'Xây tường rào', 'Vá lỗ hổng', 'Cất trữ'], shouldAvoid: ['Khai trương', 'Cưới hỏi', 'Chữa mắt', 'Động thổ'] },
];

export const NHI_THAP_BAT_TU = [
  { name: 'Giác', element: 'Mộc', animal: 'Giao long', quality: 'Tốt', meaning: 'Giác Mộc Giao - Sao tốt, chủ về thi cử đỗ đạt, công danh thăng tiến', advice: 'Tốt cho xuất hành, khai trương, cưới hỏi. Kỵ việc mai táng.' },
  { name: 'Cang', element: 'Kim', animal: 'Rồng', quality: 'Xấu', meaning: 'Cang Kim Long - Sao hung, chủ về kiện tụng, tranh chấp, tai bay vạ gió', advice: 'Tránh cưới hỏi, xây dựng, khởi công công trình.' },
  { name: 'Đê', element: 'Thổ', animal: 'Lạc đà', quality: 'Xấu', meaning: 'Đê Thổ Lạc - Sao hung, chủ về bệnh tật, thất thoát', advice: 'Không nên khởi công việc lớn, tránh khai trương mở tiệm.' },
  { name: 'Phòng', element: 'Nhật', animal: 'Thỏ', quality: 'Tốt', meaning: 'Phòng Nhật Thố - Đại cát tinh, vạn sự hanh thông như ý', advice: 'Rất tốt cho cưới hỏi, nhập trạch, khai trương, xuất hành, thăng quan.' },
  { name: 'Tâm', element: 'Nguyệt', animal: 'Cáo', quality: 'Xấu', meaning: 'Tâm Nguyệt Hồ - Sao hung, chủ về mất mát, thị phi khẩu thiệt', advice: 'Kỵ cưới gả, nhậm chức, tranh chấp kiện tụng.' },
  { name: 'Vĩ', element: 'Hỏa', animal: 'Hổ', quality: 'Tốt', meaning: 'Vĩ Hỏa Hổ - Đại cát tinh, gia tăng tài lộc, con cháu hiển vinh', advice: 'Tốt cho cưới hỏi, gieo trồng, nhập trạch, đào ao mở giếng.' },
  { name: 'Cơ', element: 'Thủy', animal: 'Báo', quality: 'Tốt', meaning: 'Cơ Thủy Báo - Sao tốt, công việc thuận buồm xuôi gió', advice: 'Thuận lợi cho khởi công, xuất hành, mua bán cầu tài.' },
  { name: 'Đẩu', element: 'Mộc', animal: 'Giải', quality: 'Tốt', meaning: 'Đẩu Mộc Giải - Cát tinh, chiêu tài đón lộc, công danh rạng rỡ', advice: 'Tốt cho làm nhà, cưới hỏi, gieo trồng, nhậm chức.' },
  { name: 'Ngưu', element: 'Kim', animal: 'Trâu', quality: 'Xấu', meaning: 'Ngưu Kim Ngưu - Sao hung, dễ gặp trắc trở, hao tốn', advice: 'Kỵ việc cưới hỏi, đóng thuyền, khởi công xây dựng.' },
  { name: 'Nữ', element: 'Thổ', animal: 'Dơi', quality: 'Xấu', meaning: 'Nữ Thổ Bức - Sao hung, bất lợi cho phụ nữ và gia đạo', advice: 'Tránh kiện tụng, cưới gả, khởi công làm nhà.' },
  { name: 'Hư', element: 'Nhật', animal: 'Chuột', quality: 'Xấu', meaning: 'Hư Nhật Thử - Sao xấu, chủ về hư hao, lận đận trắc trở', advice: 'Nên cẩn trọng mọi việc, tránh mở cửa hàng, ký kết hợp đồng.' },
  { name: 'Nguy', element: 'Nguyệt', animal: 'Én', quality: 'Xấu', meaning: 'Nguy Nguyệt Yến - Sao xấu, đề phòng trượt ngã, tai nạn sông nước', advice: 'Kỵ leo cao, đi thuyền, làm mái nhà.' },
  { name: 'Thất', element: 'Hỏa', animal: 'Lợn', quality: 'Tốt', meaning: 'Thất Hỏa Trư - Cát tinh, gia đạo an khang, tài lộc dồi dào', advice: 'Tốt cho khai trương, cưới gả, làm nhà, xuất hành cầu tài.' },
  { name: 'Bích', element: 'Thủy', animal: 'Nhím', quality: 'Tốt', meaning: 'Bích Thủy Dụ - Đại cát tinh, vinh hoa phú quý, may mắn ngập tràn', advice: 'Mọi việc đại cát: Khai trương, cưới hỏi, động thổ, thi cử.' },
  { name: 'Khuê', element: 'Mộc', animal: 'Chó sói', quality: 'Xấu', meaning: 'Khuê Mộc Lang - Sao hung, dễ gặp trở ngại học hành, quan trường', advice: 'Kỵ mở kho, đào giếng, khởi công làm nhà cửa.' },
  { name: 'Lâu', element: 'Kim', animal: 'Chó', quality: 'Tốt', meaning: 'Lâu Kim Cẩu - Cát tinh, bội thu mùa màng, buôn bán phát tài', advice: 'Tốt cho cưới hỏi, khai trương, xuất hành, nuôi dạy con cái.' },
  { name: 'Vị', element: 'Thổ', animal: 'Chim trĩ', quality: 'Tốt', meaning: 'Vị Thổ Trĩ - Cát tinh, chủ về thăng quan tiến chức, thêm đinh thêm tài', advice: 'Tốt cho nhập trạch, khai trương, mở cửa hàng, cưới gả.' },
  { name: 'Mão', element: 'Nhật', animal: 'Gà', quality: 'Xấu', meaning: 'Mão Nhật Kê - Sao hung, dễ sinh khẩu thiệt, mất mát của cải', advice: 'Tránh việc xây dựng, cưới gả, ký kết văn tự quan trọng.' },
  { name: 'Tất', element: 'Nguyệt', animal: 'Quạ', quality: 'Tốt', meaning: 'Tất Nguyệt Ô - Cát tinh, mùa màng tốt tươi, công việc thành tựu', advice: 'Tốt cho cưới hỏi, gieo trồng, nhập học, làm nhà.' },
  { name: 'Chủy', element: 'Hỏa', animal: 'Khỉ', quality: 'Xấu', meaning: 'Chủy Hỏa Hầu - Sao hung, dễ gặp khẩu thiệt, hao hụt ngân quỹ', advice: 'Kỵ xuất hành, cưới gả, làm nhà.' },
  { name: 'Sâm', element: 'Thủy', animal: 'Vượn', quality: 'Tốt', meaning: 'Sâm Thủy Viên - Cát tinh, vinh hoa quý hiển, kinh doanh phát đạt', advice: 'Rất tốt cho cầu tài lộc, mở cửa hàng, xuất hành buôn bán.' },
  { name: 'Tỉnh', element: 'Mộc', animal: 'Hươu', quality: 'Tốt', meaning: 'Tỉnh Mộc Hãn - Cát tinh, mưu sự tất thành, vạn sự thuận lợi', advice: 'Tốt cho đào giếng, tu bổ nhà cửa, xuất hành, thăng quan.' },
  { name: 'Quỷ', element: 'Kim', animal: 'Dê', quality: 'Xấu', meaning: 'Quỷ Kim Dương - Sao hung, dễ gặp chuyện buồn phiền, tang ma', advice: 'Kỵ cưới gả, động thổ, khởi công, xuất hành xa.' },
  { name: 'Liễu', element: 'Thổ', animal: 'Hoẵng', quality: 'Xấu', meaning: 'Liễu Thổ Chương - Sao hung, hao tổn nhân lực, tiền bạc', advice: 'Kỵ cưới gả, làm nhà, xuất hành mưu sự.' },
  { name: 'Tinh', element: 'Nhật', animal: 'Ngựa', quality: 'Xấu', meaning: 'Tinh Nhật Mã - Sao hung, chủ về tranh chấp, bất hòa', advice: 'Tránh việc cưới hỏi, nhập trạch, giao dịch lớn.' },
  { name: 'Trương', element: 'Nguyệt', animal: 'Nai', quality: 'Tốt', meaning: 'Trương Nguyệt Lộc - Cát tinh, công thành danh toại, đại cát', advice: 'Tốt cho cưới hỏi, khai trương, làm nhà, gieo trồng.' },
  { name: 'Dực', element: 'Hỏa', animal: 'Rắn', quality: 'Tốt', meaning: 'Dực Hỏa Xà - Cát tinh, đón nhận tin vui từ phương xa', advice: 'Tốt cho xuất hành, thi cử, cầu tài, kết bạn.' },
  { name: 'Chẩn', element: 'Thủy', animal: 'Giun', quality: 'Tốt', meaning: 'Chẩn Thủy Dẫn - Đại cát tinh, vạn sự hanh thông, cát khánh sum vầy', advice: 'Đại cát cho cưới hỏi, động thổ, nhậm chức, xuất hành buôn bán.' }
] as const;

export const TAM_NUONG_DAYS = [3, 7, 13, 18, 22, 27];
export const NGUYET_KY_DAYS = [5, 14, 23];
export const DUONG_CONG_KY_DAYS: Record<number, number> = {
  1: 13, 2: 11, 3: 9, 4: 7, 5: 5, 6: 3, 7: 1, 8: 29, 9: 27, 10: 25, 11: 23, 12: 21
};

export const TUOI_LUC_XUNG: Record<string, string> = {
  'Tý': 'Ngọ', 'Ngọ': 'Tý',
  'Sửu': 'Mùi', 'Mùi': 'Sửu',
  'Dần': 'Thân', 'Thân': 'Dần',
  'Mão': 'Dậu', 'Dậu': 'Mão',
  'Thìn': 'Tuất', 'Tuất': 'Thìn',
  'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
};

export const HUONG_XUAT_HANH_TABLE: Record<string, { hyThan: string; taiThan: string; hacThan: string }> = {
  'Giáp': { hyThan: 'Đông Bắc', taiThan: 'Đông Nam', hacThan: 'Đông Bắc' },
  'Ất': { hyThan: 'Tây Bắc', taiThan: 'Đông Nam', hacThan: 'Tây Bắc' },
  'Bính': { hyThan: 'Tây Nam', taiThan: 'Chính Đông', hacThan: 'Tây Nam' },
  'Đinh': { hyThan: 'Chính Nam', taiThan: 'Chính Đông', hacThan: 'Chính Nam' },
  'Mậu': { hyThan: 'Đông Nam', taiThan: 'Chính Bắc', hacThan: 'Đông Nam' },
  'Kỷ': { hyThan: 'Đông Bắc', taiThan: 'Chính Nam', hacThan: 'Đông Bắc' },
  'Canh': { hyThan: 'Tây Bắc', taiThan: 'Tây Nam', hacThan: 'Tây Bắc' },
  'Tân': { hyThan: 'Tây Nam', taiThan: 'Tây Nam', hacThan: 'Tây Nam' },
  'Nhâm': { hyThan: 'Chính Nam', taiThan: 'Tây Bắc', hacThan: 'Chính Nam' },
  'Quý': { hyThan: 'Đông Nam', taiThan: 'Tây Bắc', hacThan: 'Đông Nam' }
};

export function getNgayTotXau(jd: number, lunarDay: number, lunarMonth: number, canDay: string, chiDay: string): NgayTotXauInfo {
  // 1. Thập Nhị Trực:
  // Tháng 1 (Dần) khởi Kiến tại Dần. Ngày Chi nào tương ứng offset:
  // Trực index = (chiDayIndex - lunarMonthStartChi + 12) % 12
  const chiDayIndex = (jd + 1) % 12;
  const monthStartChi = (lunarMonth + 1) % 12; // Tháng 1 là Dần (2), Tháng 2 Mão (3)...
  const trucIndex = (chiDayIndex - monthStartChi + 12) % 12;
  const truc = THAP_NHI_TRUC[trucIndex];

  // 2. Nhị Thập Bát Tú:
  // Chu kỳ 28 ngày tính từ JD mốc
  const starIndex = (jd + 12) % 28;
  const nhiThapBatTu = NHI_THAP_BAT_TU[starIndex];

  // 3. Ngày Tam Nương, Nguyệt Kỵ, Dương Công Kỵ
  const isTamNuong = TAM_NUONG_DAYS.includes(lunarDay);
  const isNguyetKy = NGUYET_KY_DAYS.includes(lunarDay);
  const isDuongCongKy = DUONG_CONG_KY_DAYS[lunarMonth] === lunarDay;

  // 4. Sát Chủ & Thọ Tử
  // Bảng ngày Sát chủ âm/dương theo tháng
  const satChuTable: Record<number, string> = {
    1: 'Tỵ', 2: 'Tý', 3: 'Mùi', 4: 'Mão', 5: 'Thân', 6: 'Tuất',
    7: 'Sửu', 8: 'Hợi', 9: 'Ngọ', 10: 'Dậu', 11: 'Dần', 12: 'Thìn'
  };
  const thoTuTable: Record<number, string> = {
    1: 'Bính Dần', 2: 'Nhâm Thìn', 3: 'Tân Tỵ', 4: 'Bính Thân', 5: 'Mậu Tuất', 6: 'Kỷ Hợi',
    7: 'Tân Sửu', 8: 'Đinh Mùi', 9: 'Giáp Tuất', 10: 'Ất Hợi', 11: 'Canh Dần', 12: 'Tân Mão'
  };
  const isSatChu = satChuTable[lunarMonth] === chiDay;
  const isThoTu = (thoTuTable[lunarMonth] || '').includes(chiDay);

  // 5. Thần Sát (Cát tinh & Hung tinh)
  const saoTot: SaoInfo[] = [];
  const saoXau: SaoInfo[] = [];

  // Logic sao tốt
  if (['Định', 'Thành', 'Khai', 'Mãn'].includes(truc.name)) {
    saoTot.push({ name: 'Thiên Đức', type: 'tot', description: 'Tốt cho mọi việc, giải trừ hung hiểm.' });
  }
  if (nhiThapBatTu.quality === 'Tốt') {
    saoTot.push({ name: 'Nguyệt Đức Hợp', type: 'tot', description: 'Cát lợi cho mưu sự, hôn nhân, thăng tiến.' });
  }
  if ([1, 4, 8, 15, 20].includes(lunarDay)) {
    saoTot.push({ name: 'Sinh Khí', type: 'tot', description: 'Tốt cho làm nhà, cưới hỏi, khai trương, mở cửa hàng.' });
  }
  if (['Thìn', 'Tỵ', 'Dậu', 'Hợi'].includes(chiDay)) {
    saoTot.push({ name: 'Thiên Hỷ', type: 'tot', description: 'Vui mừng, cát khánh, hỷ sự trọn vẹn.' });
  }
  if (['Thanh Long', 'Minh Đường', 'Kim Quỹ', 'Ngọc Đường'].some(s => saoTot.length < 5)) {
    saoTot.push({ name: 'Tuế Đức', type: 'tot', description: 'Tốt cho mọi công việc lớn nhỏ, phúc lộc tăng trưởng.' });
  }

  // Logic sao xấu
  if (isTamNuong) {
    saoXau.push({ name: 'Tam Nương', type: 'xau', description: 'Kỵ xuất hành, cưới hỏi, động thổ xây dựng.' });
  }
  if (isNguyetKy) {
    saoXau.push({ name: 'Nguyệt Kỵ (Nửa đời nửa đoạn)', type: 'xau', description: 'Kỵ khởi công, buôn bán, đi xa.' });
  }
  if (isDuongCongKy) {
    saoXau.push({ name: 'Dương Công Kỵ', type: 'xau', description: 'Trăm sự đều nên tránh, đại kỵ khởi sự.' });
  }
  if (isSatChu) {
    saoXau.push({ name: 'Sát Chủ', type: 'xau', description: 'Kỵ xây dựng, nhập trạch, cưới hỏi.' });
  }
  if (isThoTu) {
    saoXau.push({ name: 'Thọ Tử', type: 'xau', description: 'Kỵ trăm việc, đặc biệt là cưới hỏi và đi xa.' });
  }
  if (truc.name === 'Phá') {
    saoXau.push({ name: 'Đại Hao (Tử Khí)', type: 'xau', description: 'Hao tài tốn của, thất thoát ngân sách.' });
  }

  // 6. Tuổi xung
  const xungChi = TUOI_LUC_XUNG[chiDay] || 'Không rõ';
  const tuoiXung = [
    `Tuổi ${xungChi} (Lục xung)`,
    `Các tuổi mạng xung khắc với ngày ${canDay} ${chiDay}`
  ];

  // 7. Hướng xuất hành
  const huongXuatHanh = HUONG_XUAT_HANH_TABLE[canDay] || {
    hyThan: 'Chính Nam',
    taiThan: 'Chính Đông',
    hacThan: 'Tây Nam'
  };

  // 8. Tính điểm & Đánh giá ngày
  let score = 65;
  if (truc.name === 'Thành' || truc.name === 'Khai' || truc.name === 'Định') score += 15;
  if (truc.name === 'Phá' || truc.name === 'Bế' || truc.name === 'Nguy') score -= 20;
  if (nhiThapBatTu.quality === 'Tốt') score += 15;
  if (nhiThapBatTu.quality === 'Xấu') score -= 15;
  if (isTamNuong) score -= 20;
  if (isNguyetKy) score -= 20;
  if (isDuongCongKy) score -= 30;
  if (isSatChu) score -= 25;
  if (isThoTu) score -= 25;

  score = Math.max(10, Math.min(98, score));

  let rating: NgayTotXauInfo['rating'] = 'Bình Thường';
  if (score >= 80) rating = 'Đại Cát';
  else if (score >= 65) rating = 'Tiểu Cát';
  else if (score >= 45) rating = 'Bình Thường';
  else if (score >= 30) rating = 'Hung';
  else rating = 'Đại Hung';

  // Hoạt động khuyên làm & kiêng kỵ
  const recommendedActivities: string[] = [];
  const avoidActivities: string[] = [];

  if (score >= 65) {
    recommendedActivities.push(...truc.shouldDo);
    if (!recommendedActivities.includes('Cầu phúc')) recommendedActivities.push('Cầu phúc, đi lễ chùa');
  } else {
    recommendedActivities.push('Làm việc thiện', 'Dọn dẹp nhà cửa', 'Cúng tế cầu an');
  }

  avoidActivities.push(...truc.shouldAvoid);
  if (isTamNuong || isNguyetKy || isDuongCongKy) {
    if (!avoidActivities.includes('Cưới hỏi')) avoidActivities.push('Cưới hỏi');
    if (!avoidActivities.includes('Động thổ')) avoidActivities.push('Động thổ');
    if (!avoidActivities.includes('Khai trương')) avoidActivities.push('Khai trương');
  }

  return {
    truc,
    nhiThapBatTu: {
      name: nhiThapBatTu.name,
      element: nhiThapBatTu.element,
      animal: nhiThapBatTu.animal,
      quality: nhiThapBatTu.quality as 'Tốt' | 'Xấu' | 'Bình',
      meaning: nhiThapBatTu.meaning,
      advice: nhiThapBatTu.advice
    },
    saoTot,
    saoXau,
    tuoiXung,
    huongXuatHanh,
    tamNuong: isTamNuong,
    nguyetKy: isNguyetKy,
    duongCongKy: isDuongCongKy,
    satChu: isSatChu,
    thoTu: isThoTu,
    rating,
    score,
    recommendedActivities: Array.from(new Set(recommendedActivities)),
    avoidActivities: Array.from(new Set(avoidActivities))
  };
}
