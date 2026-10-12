/**
 * Thước Lỗ Ban Phong Thủy
 * 1. Thước 52.2cm: Thông Thủy (Đo lọt lòng cửa sổ, cửa đi, chiều cao thông thủy)
 * 2. Thước 42.9cm: Dương Trạch (Đo khối xây dựng: bậc thang, bếp, bàn ghế, giường ngủ)
 * 3. Thước 38.8cm: Âm Phần (Đo bàn thờ, mồ mả, tiểu quách, đồ thờ cúng)
 */

export interface CungLoBan {
  name: string;
  isTot: boolean;
  meaning: string;
  subCung: string;
}

export function checkLoBan522(cm: number): CungLoBan {
  // Chu kỳ 52.2 cm chia thành 8 cung lớn (mỗi cung 6.525 cm):
  // 1. Quý Nhân (Tốt), 2. Hiểm Họa (Xấu), 3. Thiên Tai (Xấu), 4. Thiên Tài (Tốt),
  // 5. Nhân Lộc (Tốt), 6. Cô Độc (Xấu), 7. Thiên Tặc (Xấu), 8. Tể Tướng (Tốt)
  const cycle = 52.2;
  const posInCycle = (cm % cycle + cycle) % cycle;
  const cungIdx = Math.floor(posInCycle / (cycle / 8));

  const cungs = [
    { name: 'Quý Nhân', isTot: true, meaning: 'Gặp quý nhân giúp đỡ, con cái thông minh hiếu thảo', subCung: 'Quyền lộc, Trung tín' },
    { name: 'Hiểm Họa', isTot: false, meaning: 'Gia đạo bất an, dễ gặp tai ương', subCung: 'Tán tài, Quan quỷ' },
    { name: 'Thiên Tai', isTot: false, meaning: 'Ốm đau liên miên, mất của', subCung: 'Thân bệnh, Tử biệt' },
    { name: 'Thiên Tài', isTot: true, meaning: 'Tài lộc dồi dào, may mắn bất ngờ', subCung: 'Thi tiến bảo, Phú quý' },
    { name: 'Nhân Lộc', isTot: true, meaning: 'Gia đình hưng vượng, con cháu hiển đạt', subCung: 'Trí phú, Ích tử' },
    { name: 'Cô Độc', isTot: false, meaning: 'Hao người tốn của, đơn độc', subCung: 'Biệt ly, Tuyệt tự' },
    { name: 'Thiên Tặc', isTot: false, meaning: 'Đề phòng trộm cắp, tù ngục', subCung: 'Thất tài, Tai bay vạ gió' },
    { name: 'Tể Tướng', isTot: true, meaning: 'Công danh hiển hách, vạn sự thuận lợi', subCung: 'Đại tài, Quý tử' }
  ];

  return cungs[cungIdx % 8];
}

export function checkLoBan429(cm: number): CungLoBan {
  // Chu kỳ 42.9 cm chia thành 8 cung lớn (mỗi cung 5.3625 cm):
  // 1. Tài (Tốt), 2. Bệnh (Xấu), 3. Ly (Xấu), 4. Nghĩa (Tốt),
  // 5. Quan (Tốt), 6. Kiếp (Xấu), 7. Hại (Xấu), 8. Bản (Tốt)
  const cycle = 42.9;
  const posInCycle = (cm % cycle + cycle) % cycle;
  const cungIdx = Math.floor(posInCycle / (cycle / 8));

  const cungs = [
    { name: 'Tài (Tài Lộc)', isTot: true, meaning: 'Đón nhận phúc lộc, tiền tài sung túc', subCung: 'Tài đức, Bảo khố, Lục hợp' },
    { name: 'Bệnh (Bệnh Tật)', isTot: false, meaning: 'Dễ sinh bệnh tật, ưu phiền', subCung: 'Thoát tài, Công sự, Cô quả' },
    { name: 'Ly (Chia Ly)', isTot: false, meaning: 'Bất hòa, phân ly của cải', subCung: 'Trường khố, Kiếp tài, Quan quỷ' },
    { name: 'Nghĩa (Nghĩa Khí)', isTot: true, meaning: 'Được nhiều người kính nể, may mắn', subCung: 'Thêm đinh, Ích lợi, Quý tử' },
    { name: 'Quan (Quan Lộc)', isTot: true, meaning: 'Thăng quan tiến chức, danh tiếng vang xa', subCung: 'Thuận khoa, Tiến bảo, Phú quý' },
    { name: 'Kiếp (Hao Tốn)', isTot: false, meaning: 'Thất thoát tiền tài, trộm cắp', subCung: 'Tử biệt, Thoái khẩu, Ly hương' },
    { name: 'Hại (Tai Họa)', isTot: false, meaning: 'Tai bay vạ gió, khẩu thiệt', subCung: 'Tai chí, Tử tuyệt, Bệnh tật' },
    { name: 'Bản (Bản Mệnh)', isTot: true, meaning: 'Gia đình thịnh vượng, an khang trường thọ', subCung: 'Tài chí, Hưng vượng, Phú quý' }
  ];

  return cungs[cungIdx % 8];
}

export function checkLoBan388(cm: number): CungLoBan {
  // Chu kỳ 38.8 cm chia thành 10 cung lớn (mỗi cung 3.88 cm):
  // 1. Đinh (Tốt), 2. Hại (Xấu), 3. Vượng (Tốt), 4. Khổ (Xấu), 5. Nghĩa (Tốt),
  // 6. Quan (Tốt), 7. Tử (Xấu), 8. Hưng (Tốt), 9. Thất (Xấu), 10. Tài (Tốt)
  const cycle = 38.8;
  const posInCycle = (cm % cycle + cycle) % cycle;
  const cungIdx = Math.floor(posInCycle / (cycle / 10));

  const cungs = [
    { name: 'Đinh (Phúc Tinh)', isTot: true, meaning: 'Con cháu đỗ đạt, thêm đinh phát tài', subCung: 'Phúc tinh, Cập đệ' },
    { name: 'Hại (Họa Hại)', isTot: false, meaning: 'Khẩu thiệt thị phi, ốm đau', subCung: 'Khẩu thiệt, Bệnh lâm' },
    { name: 'Vượng (Thịnh Vượng)', isTot: true, meaning: 'Tài lộc dồi dào, phúc khí gia tăng', subCung: 'Thiên đức, Hỷ sự' },
    { name: 'Khổ (Gian Khổ)', isTot: false, meaning: 'Mất mát của cải, cô đơn', subCung: 'Thất tài, Ly hương' },
    { name: 'Nghĩa (Chính Nghĩa)', isTot: true, meaning: 'Đại cát đại lợi, quý nhân trợ mệnh', subCung: 'Đại cát, Tài vượng' },
    { name: 'Quan (Quan Vận)', isTot: true, meaning: 'Thăng quan tiến chức, danh giá', subCung: 'Phú quý, Tiến bảo' },
    { name: 'Tử (Tử Biệt)', isTot: false, meaning: 'Hao người tốn của, tai ách', subCung: 'Ly hương, Tử biệt' },
    { name: 'Hưng (Hưng Thịnh)', isTot: true, meaning: 'Gia đạo hưng long, con cháu hiển vinh', subCung: 'Đăng khoa, Quý tử' },
    { name: 'Thất (Thất Thoát)', isTot: false, meaning: 'Thất thoát tài sản, tù ngục', subCung: 'Cô quả, Lao ngục' },
    { name: 'Tài (Tài Lộc)', isTot: true, meaning: 'Tài nguyên phong phú, đắc lộc', subCung: 'Nghinh phúc, Lục hợp' }
  ];

  return cungs[cungIdx % 10];
}
