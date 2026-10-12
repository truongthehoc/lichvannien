/**
 * Thuật toán tính Âm lịch Việt Nam chuẩn xác (Dựa trên thiên văn & giải thuật Hồ Ngọc Đức - Múi giờ GMT+7)
 */

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const TIET_KHI = [
  'Xuân phân', 'Thanh minh', 'Cốc vũ', 'Lập hạ', 'Tiểu mãn', 'Mang chủng',
  'Hạ chí', 'Tiểu thử', 'Đại thử', 'Lập thu', 'Xử thử', 'Bạch lộ',
  'Thu phân', 'Hàn lộ', 'Sương giáng', 'Lập đông', 'Tiểu tuyết', 'Đại tuyết',
  'Đông chí', 'Tiểu hàn', 'Đại hàn', 'Lập xuân', 'Vũ thủy', 'Kinh trập'
];

export const HOANG_DAO_NAMES = [
  'Thanh Long (Hoàng đạo - Tốt)',
  'Minh Đường (Hoàng đạo - Tốt)',
  'Thiên Hình (Hắc đạo - Xấu)',
  'Chu Tước (Hắc đạo - Xấu)',
  'Kim Quỹ (Hoàng đạo - Tốt)',
  'Thiên Đức (Hoàng đạo - Tốt)',
  'Bạch Hổ (Hắc đạo - Xấu)',
  'Ngọc Đường (Hoàng đạo - Tốt)',
  'Thiên Lao (Hắc đạo - Xấu)',
  'Huyền Vũ (Hắc đạo - Xấu)',
  'Tư Mệnh (Hoàng đạo - Tốt)',
  'Câu Trận (Hắc đạo - Xấu)'
];

export const GIO_12 = [
  { name: 'Tý', time: '23:00 - 00:59' },
  { name: 'Sửu', time: '01:00 - 02:59' },
  { name: 'Dần', time: '03:00 - 04:59' },
  { name: 'Mão', time: '05:00 - 06:59' },
  { name: 'Thìn', time: '07:00 - 08:59' },
  { name: 'Tỵ', time: '09:00 - 10:59' },
  { name: 'Ngọ', time: '11:00 - 12:59' },
  { name: 'Mùi', time: '13:00 - 14:59' },
  { name: 'Thân', time: '15:00 - 16:59' },
  { name: 'Dậu', time: '17:00 - 18:59' },
  { name: 'Tuất', time: '19:00 - 20:59' },
  { name: 'Hợi', time: '21:00 - 22:59' }
];

export const MENH_NAP_AM: Record<string, string> = {
  'Giáp Tý': 'Hải Trung Kim (Vàng trong biển)',
  'Ất Sửu': 'Hải Trung Kim (Vàng trong biển)',
  'Bính Dần': 'Lư Trung Hỏa (Lửa trong lò)',
  'Đinh Mão': 'Lư Trung Hỏa (Lửa trong lò)',
  'Mậu Thìn': 'Đại Lâm Mộc (Gỗ rừng già)',
  'Kỷ Tỵ': 'Đại Lâm Mộc (Gỗ rừng già)',
  'Canh Ngọ': 'Lộ Bàng Thổ (Đất ven đường)',
  'Tân Mùi': 'Lộ Bàng Thổ (Đất ven đường)',
  'Nhâm Thân': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Quý Dậu': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Giáp Tuất': 'Sơn Đầu Hỏa (Lửa trên núi)',
  'Ất Hợi': 'Sơn Đầu Hỏa (Lửa trên núi)',
  'Bính Tý': 'Giản Hạ Thủy (Nước dưới khe)',
  'Đinh Sửu': 'Giản Hạ Thủy (Nước dưới khe)',
  'Mậu Dần': 'Thành Đầu Thổ (Đất đắp thành)',
  'Kỷ Mão': 'Thành Đầu Thổ (Đất đắp thành)',
  'Canh Thìn': 'Bạch Lạp Kim (Vàng sáp ong)',
  'Tân Tỵ': 'Bạch Lạp Kim (Vàng sáp ong)',
  'Nhâm Ngọ': 'Dương Liễu Mộc (Gỗ cây dương)',
  'Quý Mùi': 'Dương Liễu Mộc (Gỗ cây dương)',
  'Giáp Thân': 'Tuyền Trung Thủy (Nước trong suối)',
  'Ất Dậu': 'Tuyền Trung Thủy (Nước trong suối)',
  'Bính Tuất': 'Ốc Thượng Thổ (Đất nóc nhà)',
  'Đinh Hợi': 'Ốc Thượng Thổ (Đất nóc nhà)',
  'Mậu Tý': 'Tích Lịch Hỏa (Lửa sấm sét)',
  'Kỷ Sửu': 'Tích Lịch Hỏa (Lửa sấm sét)',
  'Canh Dần': 'Tùng Bách Mộc (Gỗ tùng bách)',
  'Tân Mão': 'Tùng Bách Mộc (Gỗ tùng bách)',
  'Nhâm Thìn': 'Trường Lưu Thủy (Nước sông dài)',
  'Quý Tỵ': 'Trường Lưu Thủy (Nước sông dài)',
  'Giáp Ngọ': 'Sa Trung Kim (Vàng trong cát)',
  'Ất Mùi': 'Sa Trung Kim (Vàng trong cát)',
  'Bính Thân': 'Sơn Hạ Hỏa (Lửa dưới núi)',
  'Đinh Dậu': 'Sơn Hạ Hỏa (Lửa dưới núi)',
  'Mậu Tuất': 'Bình Địa Mộc (Gỗ đồng bằng)',
  'Kỷ Hợi': 'Bình Địa Mộc (Gỗ đồng bằng)',
  'Canh Tý': 'Bích Thượng Thổ (Đất tườmg nhà)',
  'Tân Sửu': 'Bích Thượng Thổ (Đất tường nhà)',
  'Nhâm Dần': 'Kim Bạch Kim (Vàng mạ vàng)',
  'Quý Mão': 'Kim Bạch Kim (Vàng mạ vàng)',
  'Giáp Thìn': 'Phúc Đăng Hỏa (Lửa ngọn đèn)',
  'Ất Tỵ': 'Phúc Đăng Hỏa (Lửa ngọn đèn)',
  'Bính Ngọ': 'Thiên Hà Thủy (Nước trên trời)',
  'Đinh Mùi': 'Thiên Hà Thủy (Nước trên trời)',
  'Mậu Thân': 'Đại Trạch Thổ (Đất nền nhà)',
  'Kỷ Dậu': 'Đại Trạch Thổ (Đất nền nhà)',
  'Canh Tuất': 'Thoa Xuyến Kim (Vàng trang sức)',
  'Tân Hợi': 'Thoa Xuyến Kim (Vàng trang sức)',
  'Nhâm Tý': 'Tang Đố Mộc (Gỗ cây dâu)',
  'Quý Sửu': 'Tang Đố Mộc (Gỗ cây dâu)',
  'Giáp Dần': 'Đại Khê Thủy (Nước khe lớn)',
  'Ất Mão': 'Đại Khê Thủy (Nước khe lớn)',
  'Bính Thìn': 'Sa Trung Thổ (Đất pha cát)',
  'Đinh Tỵ': 'Sa Trung Thổ (Đất pha cát)',
  'Mậu Ngọ': 'Thiên Thượng Hỏa (Lửa trên trời)',
  'Kỷ Mùi': 'Thiên Thượng Hỏa (Lửa trên trời)',
  'Canh Thân': 'Thạch Lựu Mộc (Gỗ thạch lựu)',
  'Tân Dậu': 'Thạch Lựu Mộc (Gỗ thạch lựu)',
  'Nhâm Tuất': 'Đại Hải Thủy (Nước biển lớn)',
  'Quý Hợi': 'Đại Hải Thủy (Nước biển lớn)',
};

export const VIETNAMESE_HOLIDAYS: Record<string, string> = {
  '1-1': 'Tết Dương Lịch',
  '14-2': 'Lễ Tình Nhân (Valentine)',
  '8-3': 'Quốc tế Phụ nữ',
  '26-3': 'Ngày thành lập Đoàn TNCS HCM',
  '30-4': 'Ngày Giải phóng Miền Nam',
  '1-5': 'Quốc tế Lao động',
  '7-5': 'Chiến thắng Điện Biên Phủ',
  '1-6': 'Quốc tế Thiếu nhi',
  '28-6': 'Ngày Gia đình Việt Nam',
  '27-7': 'Ngày Thương binh Liệt sĩ',
  '19-8': 'Cách mạng Tháng Tám',
  '2-9': 'Quốc Khánh Việt Nam',
  '20-10': 'Ngày Phụ nữ Việt Nam',
  '20-11': 'Ngày Nhà giáo Việt Nam',
  '22-12': 'Ngày thành lập QĐND Việt Nam',
  '25-12': 'Lễ Giáng sinh (Noel)',
};

export const LUNAR_HOLIDAYS: Record<string, string> = {
  '1-1': 'Tết Nguyên Đán (Mùng 1 Tết)',
  '2-1': 'Mùng 2 Tết Nguyên Đán',
  '3-1': 'Mùng 3 Tết Nguyên Đán',
  '15-1': 'Tết Nguyên Tiêu (Rằm tháng Giêng)',
  '3-3': 'Tết Hàn Thực',
  '10-3': 'Giỗ Tổ Hùng Vương',
  '15-4': 'Lễ Phật Đản',
  '5-5': 'Tết Đoan Ngọ (Giết sâu bọ)',
  '15-7': 'Lễ Vu Lan & Xá tội vong nhân (Rằm tháng 7)',
  '15-8': 'Tết Trung Thu',
  '9-9': 'Tết Trùng Cửu',
  '10-10': 'Tết Trùng Thập (Tết thầy thuốc)',
  '23-12': 'Tiễn Ông Táo Chầu Trời',
};

export interface LunarDate {
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  dayOfWeek: number; // 0: Chủ nhật, 1: Thứ 2,... 6: Thứ 7
  dayOfWeekName: string;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeap: boolean;
  canYear: string;
  chiYear: string;
  canMonth: string;
  chiMonth: string;
  canDay: string;
  chiDay: string;
  canChiYear: string;
  canChiMonth: string;
  canChiDay: string;
  tietKhi: string;
  isHoangDao: boolean;
  hoangDaoType: string;
  gioHoangDao: { name: string; time: string; canChi: string; isHoangDao: boolean }[];
  napAmDay: string;
  napAmYear: string;
  holiday?: string;
  lunarHoliday?: string;
  jd: number;
}

export function jdn(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

export function jdToDate(jd: number): [number, number, number] {
  let z: number, a: number, b: number, c: number, d: number, e: number, day: number, month: number, year: number;
  z = Math.floor(jd + 0.5);
  if (z < 2299161) {
    a = z;
  } else {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  b = a + 1524;
  c = Math.floor((b - 122.1) / 365.25);
  d = Math.floor(365.25 * c);
  e = Math.floor((b - d) / 30.6001);
  day = Math.floor(b - d - Math.floor(30.6001 * e));
  month = e < 14 ? e - 1 : e - 13;
  year = month > 2 ? c - 4716 : c - 4715;
  return [day, month, year];
}

const PI = Math.PI;

function getNewMoonDay(k: number, timeZone: number = 7): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
  C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
  C1 += 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
  C1 -= 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
  C1 -= 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
  C1 += 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);
  const JdNew = Jd1 + C1;
  return Math.floor(JdNew + 0.5 + timeZone / 24);
}

function getSunLongitude(jdnVal: number, timeZone: number = 7): number {
  const T = (jdnVal - 2451545.0 + 0.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - PI * 2 * Math.floor(L / (PI * 2));
  return Math.floor((L / PI) * 6);
}

function getLunarMonth11(yy: number, timeZone: number = 7): number {
  const off = jdn(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number = 7): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

export function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number = 7): [number, number, number, boolean] {
  const dayNumber = jdn(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = true;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }
  return [lunarDay, lunarMonth, lunarYear, lunarLeap];
}

export function convertLunar2Solar(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap: boolean = false, timeZone: number = 7): [number, number, number] {
  let a11: number;
  let b11: number;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }
  let off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth <= 0) leapMonth += 12;
    if (lunarLeap && lunarMonth !== leapMonth) {
      return [0, 0, 0];
    }
    if (lunarLeap || off >= leapOff) {
      off += 1;
    }
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarDay - 1);
}

export function getCanChiYear(year: number): { can: string; chi: string; fullName: string } {
  const can = CAN[(year + 6) % 10];
  const chi = CHI[(year + 8) % 12];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiMonth(month: number, year: number): { can: string; chi: string; fullName: string } {
  // Can tháng: dựa theo can năm
  const canYearIndex = (year + 6) % 10;
  // Giáp Kỷ -> Bính Dần (2), Ất Canh -> Mậu Dần (4), Bính Tân -> Canh Dần (6), Đinh Nhâm -> Nhâm Dần (8), Mậu Quý -> Giáp Dần (0)
  const baseCanMonth = (canYearIndex * 2 + 2) % 10;
  const canIndex = (baseCanMonth + (month - 1)) % 10;
  // Chi tháng: Tháng 1 là Dần (2), Tháng 2 Mão (3), ...
  const chiIndex = (month + 1) % 12;
  const can = CAN[canIndex];
  const chi = CHI[chiIndex];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiDay(jd: number): { can: string; chi: string; fullName: string; canIndex: number; chiIndex: number } {
  const canIndex = (jd + 9) % 10;
  const chiIndex = (jd + 1) % 12;
  const can = CAN[canIndex];
  const chi = CHI[chiIndex];
  return { can, chi, fullName: `${can} ${chi}`, canIndex, chiIndex };
}

export function getCanChiHour(jd: number, hourChiIndex: number): { can: string; chi: string; fullName: string } {
  const canDayIndex = (jd + 9) % 10;
  // Giáp Kỷ khởi Giáp Tý (0), Ất Canh khởi Bính Tý (2), Bính Tân khởi Mậu Tý (4), Đinh Nhâm khởi Canh Tý (6), Mậu Quý khởi Nhâm Tý (8)
  const baseCan = (canDayIndex % 5) * 2;
  const canIndex = (baseCan + hourChiIndex) % 10;
  const can = CAN[canIndex];
  const chi = CHI[hourChiIndex];
  return { can, chi, fullName: `${can} ${chi}` };
}

// Bảng tính Hoàng đạo/Hắc đạo của ngày theo Chi Tháng và Chi Ngày
// Thanh Long, Minh Đường, Thiên Hình, Chu Tước, Kim Quỹ, Thiên Đức, Bạch Hổ, Ngọc Đường, Thiên Lao, Huyền Vũ, Tư Mệnh, Câu Trận
export function getHoangDaoDay(lunarMonth: number, dayChiIndex: number): { isHoangDao: boolean; name: string } {
  // Bảng khởi sao hoàng đạo của tháng
  // Tháng 1, 7 khởi từ Tý (0); Tháng 2, 8 khởi từ Dần (2); Tháng 3, 9 khởi từ Thìn (4); Tháng 4, 10 khởi từ Ngọ (6); Tháng 5, 11 khởi từ Thân (8); Tháng 6, 12 khởi từ Tuất (10)
  const monthStarts = [0, 0, 2, 4, 6, 8, 10, 0, 2, 4, 6, 8, 10];
  const startChi = monthStarts[lunarMonth] || 0;
  const starOffset = (dayChiIndex - startChi + 12) % 12;
  
  // 12 thần: 0: Thanh Long (H), 1: Minh Đường (H), 2: Thiên Hình (X), 3: Chu Tước (X), 4: Kim Quỹ (H), 5: Thiên Đức (H), 6: Bạch Hổ (X), 7: Ngọc Đường (H), 8: Thiên Lao (X), 9: Huyền Vũ (X), 10: Tư Mệnh (H), 11: Câu Trận (X)
  const hoangDaoIndices = [0, 1, 4, 5, 7, 10];
  const isHoangDao = hoangDaoIndices.includes(starOffset);
  const name = HOANG_DAO_NAMES[starOffset];
  return { isHoangDao, name };
}

export function getGioHoangDao(jd: number): { name: string; time: string; canChi: string; isHoangDao: boolean }[] {
  const dayChiIndex = (jd + 1) % 12;
  // Bảng giờ hoàng đạo theo Chi ngày:
  // Dần Thân: Tý, Sửu, Thìn, Tỵ, Mùi, Tuất (0, 1, 4, 5, 7, 10)
  // Mão Dậu: Tý, Dần, Mão, Ngọ, Mùi, Dậu (0, 2, 3, 6, 7, 9)
  // Thìn Tuất: Dần, Thìn, Tỵ, Thân, Dậu, Hợi (2, 4, 5, 8, 9, 11)
  // Tỵ Hợi: Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi (1, 4, 6, 7, 10, 11)
  // Tý Ngọ: Tý, Sửu, Mão, Ngọ, Thân, Dậu (0, 1, 3, 6, 8, 9)
  // Sửu Mùi: Dần, Mão, Tỵ, Thân, Tuất, Hợi (2, 3, 5, 8, 10, 11)
  const hoangDaoTable: Record<number, number[]> = {
    0: [0, 1, 3, 6, 8, 9],   // Tý
    6: [0, 1, 3, 6, 8, 9],   // Ngọ
    1: [2, 3, 5, 8, 10, 11], // Sửu
    7: [2, 3, 5, 8, 10, 11], // Mùi
    2: [0, 1, 4, 5, 7, 10],  // Dần
    8: [0, 1, 4, 5, 7, 10],  // Thân
    3: [0, 2, 3, 6, 7, 9],   // Mão
    9: [0, 2, 3, 6, 7, 9],   // Dậu
    4: [2, 4, 5, 8, 9, 11],  // Thìn
    10: [2, 4, 5, 8, 9, 11], // Tuất
    5: [1, 4, 6, 7, 10, 11], // Tỵ
    11: [1, 4, 6, 7, 10, 11] // Hợi
  };

  const goodHours = hoangDaoTable[dayChiIndex] || [];
  
  return GIO_12.map((gio, idx) => {
    const canChiHour = getCanChiHour(jd, idx);
    const isHoangDao = goodHours.includes(idx);
    return {
      name: `${gio.name} (${canChiHour.fullName})`,
      time: gio.time,
      canChi: canChiHour.fullName,
      isHoangDao
    };
  });
}

export function getTietKhi(jd: number): string {
  const sunLong = getSunLongitude(jd, 7);
  // 24 tiết khí tương ứng với kinh độ mặt trời
  const tietKhiNames = [
    'Xuân phân', 'Thanh minh', 'Cốc vũ', 'Lập hạ', 'Tiểu mãn', 'Mang chủng',
    'Hạ chí', 'Tiểu thử', 'Đại thử', 'Lập thu', 'Xử thử', 'Bạch lộ',
    'Thu phân', 'Hàn lộ', 'Sương giáng', 'Lập đông', 'Tiểu tuyết', 'Đại tuyết',
    'Đông chí', 'Tiểu hàn', 'Đại hàn', 'Lập xuân', 'Vũ thủy', 'Kinh trập'
  ];
  return tietKhiNames[sunLong % 24] || 'Xuân phân';
}

const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

export function getFullDateDetails(date: Date): LunarDate {
  const solarDay = date.getDate();
  const solarMonth = date.getMonth() + 1;
  const solarYear = date.getFullYear();
  const dayOfWeek = date.getDay();
  const dayOfWeekName = WEEKDAYS[dayOfWeek];

  const jd = jdn(solarDay, solarMonth, solarYear);
  const [lunarDay, lunarMonth, lunarYear, isLeap] = convertSolar2Lunar(solarDay, solarMonth, solarYear, 7);

  const canChiYearObj = getCanChiYear(lunarYear);
  const canChiMonthObj = getCanChiMonth(lunarMonth, lunarYear);
  const canChiDayObj = getCanChiDay(jd);

  const hoangDaoInfo = getHoangDaoDay(lunarMonth, canChiDayObj.chiIndex);
  const gioHoangDao = getGioHoangDao(jd);
  const tietKhi = getTietKhi(jd);

  const napAmDay = MENH_NAP_AM[canChiDayObj.fullName] || 'Không rõ';
  const napAmYear = MENH_NAP_AM[canChiYearObj.fullName] || 'Không rõ';

  const solarKey = `${solarDay}-${solarMonth}`;
  const lunarKey = `${lunarDay}-${lunarMonth}`;
  const holiday = VIETNAMESE_HOLIDAYS[solarKey];
  const lunarHoliday = LUNAR_HOLIDAYS[lunarKey];

  return {
    solarDay,
    solarMonth,
    solarYear,
    dayOfWeek,
    dayOfWeekName,
    lunarDay,
    lunarMonth,
    lunarYear,
    isLeap,
    canYear: canChiYearObj.can,
    chiYear: canChiYearObj.chi,
    canMonth: canChiMonthObj.can,
    chiMonth: canChiMonthObj.chi,
    canDay: canChiDayObj.can,
    chiDay: canChiDayObj.chi,
    canChiYear: canChiYearObj.fullName,
    canChiMonth: canChiMonthObj.fullName,
    canChiDay: canChiDayObj.fullName,
    tietKhi,
    isHoangDao: hoangDaoInfo.isHoangDao,
    hoangDaoType: hoangDaoInfo.name,
    gioHoangDao,
    napAmDay,
    napAmYear,
    holiday,
    lunarHoliday,
    jd
  };
}
