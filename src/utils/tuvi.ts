/**
 * Thuật toán Lập và Luận Giải Lá Số Tử Vi Trọn Đời
 */

import { CHI, CAN, convertSolar2Lunar, getCanChiYear } from './amlich';

export interface SaoTuVi {
  name: string;
  type: 'chinh' | 'cat' | 'hung';
  dacTinh?: 'Vượng' | 'Miếu' | 'Đắc' | 'Hãm' | 'Bình';
  element?: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  description?: string;
}

export interface CungTuVi {
  index: number; // 0: Tý, 1: Sửu, ... 11: Hợi
  chiName: string; // Tý, Sửu, ...
  cungName: string; // Mệnh, Phụ Mẫu, Phúc Đức,...
  canCung: string; // Can của cung
  isThan: boolean; // Cung Thân cư ở đây
  chinhTinh: SaoTuVi[];
  phuTinhCat: SaoTuVi[];
  phuTinhHung: SaoTuVi[];
  daiHan: number; // Tuổi bắt đầu đại vận tại cung này
}

export interface LaSoTuVi {
  hoTen: string;
  gioiTinh: 'Nam' | 'Nữ';
  solarDate: string;
  lunarDate: string;
  gioSinh: string;
  amDuongNamNu: string;
  menh: string;
  cuc: string;
  chuMenh: string;
  chuThan: string;
  cungMenhChi: string;
  cungThanChi: string;
  cungs: CungTuVi[];
  luanGiai: {
    tongQuan: string;
    congDanh: string;
    taiLoc: string;
    tinhDuyen: string;
    sucKhoe: string;
    loiKhuyen: string;
  };
}

const CUNG_NAMES_ORDER = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch',
  'Quan Lộc', 'Nô Bộc', 'Thiên Di', 'Tật Ách',
  'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
];

export const CUC_NAMES = [
  'Thủy Nhị Cục (Số 2)',
  'Mộc Tam Cục (Số 3)',
  'Kim Tứ Cục (Số 4)',
  'Thổ Ngũ Cục (Số 5)',
  'Hỏa Lục Cục (Số 6)'
];

const CHU_MENH_TABLE: Record<string, string> = {
  'Tý': 'Tham Lang', 'Sửu': 'Cự Môn', 'Dần': 'Lộc Tồn', 'Mão': 'Văn Khúc',
  'Thìn': 'Liêm Trinh', 'Tỵ': 'Vũ Khúc', 'Ngọ': 'Phá Quân', 'Mùi': 'Vũ Khúc',
  'Thân': 'Liêm Trinh', 'Dậu': 'Văn Khúc', 'Tuất': 'Lộc Tồn', 'Hợi': 'Cự Môn'
};

const CHU_THAN_TABLE: Record<string, string> = {
  'Tý': 'Linh Tinh', 'Sửu': 'Thiên Tướng', 'Dần': 'Thiên Lương', 'Mão': 'Thiên Đồng',
  'Thìn': 'Văn Xương', 'Tỵ': 'Thiên Cơ', 'Ngọ': 'Hỏa Tinh', 'Mùi': 'Thiên Tướng',
  'Thân': 'Thiên Lương', 'Dậu': 'Thiên Đồng', 'Tuất': 'Văn Xương', 'Hợi': 'Thiên Cơ'
};

export function lapLaSoTuVi(
  hoTen: string,
  gioiTinh: 'Nam' | 'Nữ',
  day: number,
  month: number,
  year: number,
  hourChiIndex: number // 0: Tý, 1: Sửu, ... 11: Hợi
): LaSoTuVi {
  const [lunarDay, lunarMonth, lunarYear, isLeap] = convertSolar2Lunar(day, month, year, 7);
  const canChiYearObj = getCanChiYear(lunarYear);

  // 1. Âm Dương Nam/Nữ
  const canYearIndex = (lunarYear + 6) % 10;
  const isDuongNamAmNu = (canYearIndex % 2 === 0 && gioiTinh === 'Nam') || (canYearIndex % 2 === 1 && gioiTinh === 'Nữ');
  const amDuongNamNu = `${canYearIndex % 2 === 0 ? 'Dương' : 'Âm'} ${gioiTinh} (${isDuongNamAmNu ? 'Thuận lý' : 'Nghịch lý'})`;

  // 2. Định cung Mệnh & Cung Thân:
  // Cung Dần là tháng 1, đếm thuận đến tháng sinh, từ đó đếm nghịch đến giờ sinh -> Cung MỆNH
  // Cung Dần là tháng 1, đếm thuận đến tháng sinh, từ đó đếm thuận đến giờ sinh -> Cung THÂN
  const startDan = 2; // Dần là index 2
  const menhIndex = (startDan + (lunarMonth - 1) - hourChiIndex + 24) % 12;
  const thanIndex = (startDan + (lunarMonth - 1) + hourChiIndex) % 12;

  // 3. Tính Cục (Dựa theo Can năm và Cung Mệnh)
  // Bảng tính Cục: Thủy 2, Mộc 3, Kim 4, Thổ 5, Hỏa 6
  const cucMatrix: number[][] = [
    // Giáp Kỷ (0), Ất Canh (1), Bính Tân (2), Đinh Nhâm (3), Mậu Quý (4)
    [2, 6, 3, 5, 4, 2], // Tý Sửu, Dần Mão, Thìn Tỵ, Ngọ Mùi, Thân Dậu, Tuất Hợi
    [3, 5, 4, 2, 6, 3],
    [5, 4, 2, 6, 3, 5],
    [4, 2, 6, 3, 5, 4],
    [6, 3, 5, 4, 2, 6]
  ];
  const canPair = Math.floor(canYearIndex % 5);
  const chiPair = Math.floor(menhIndex / 2);
  const cucNumber = cucMatrix[canPair][chiPair] || 2;
  const cucName = CUC_NAMES[cucNumber - 2] || 'Thủy Nhị Cục (Số 2)';

  // 4. Can của 12 cung (Bắt đầu từ Dần với Ngũ Dần Độn)
  const baseCanMonth = (canYearIndex * 2 + 2) % 10;
  const cungCanList: string[] = [];
  for (let i = 0; i < 12; i++) {
    // i là chi index (0: Tý, 1: Sửu, 2: Dần...)
    const offsetFromDan = (i - 2 + 12) % 12;
    const canIdx = (baseCanMonth + offsetFromDan) % 10;
    cungCanList[i] = CAN[canIdx];
  }

  // 5. Khởi tạo 12 cung
  const cungs: CungTuVi[] = [];
  for (let i = 0; i < 12; i++) {
    // Tên cung: từ Mệnh đi nghịch hoặc thuận? Thứ tự chuẩn 12 cung là Mệnh -> Phụ Mẫu -> Phúc Đức (ngược chiều kim đồng hồ)
    const cungNameIdx = (menhIndex - i + 12) % 12;
    const cungName = CUNG_NAMES_ORDER[cungNameIdx];

    // Đại vận: Dương Nam Âm Nữ đi thuận chiều kim đồng hồ, Âm Nam Dương Nữ đi nghịch
    const daiHanStep = isDuongNamAmNu ? (i - menhIndex + 12) % 12 : (menhIndex - i + 12) % 12;
    const daiHan = cucNumber + daiHanStep * 10;

    cungs.push({
      index: i,
      chiName: CHI[i],
      cungName,
      canCung: cungCanList[i],
      isThan: i === thanIndex,
      chinhTinh: [],
      phuTinhCat: [],
      phuTinhHung: [],
      daiHan
    });
  }

  // 6. An sao Tử Vi & 14 Chính Tinh
  // Vị trí Tử Vi theo Cục và Ngày sinh
  let tuViChi = (2 + Math.floor(lunarDay / cucNumber) + (lunarDay % cucNumber)) % 12;
  if (tuViChi < 0) tuViChi += 12;

  // 14 Chính Tinh:
  // Vòng Tử Vi (nghịch): Tử Vi -> Liêm Trinh (-4) -> Thiên Đồng (-7) -> Vũ Khúc (-8) -> Thái Dương (-9) -> Thiên Cơ (-11)
  const tuViOffset: Record<string, number> = {
    'Tử Vi': 0,
    'Thiên Cơ': -1,
    'Thái Dương': -3,
    'Vũ Khúc': -4,
    'Thiên Đồng': -5,
    'Liêm Trinh': -8
  };

  // Vòng Thiên Phủ (đối xứng qua trục Dần - Thân):
  // Cung Thiên Phủ = (4 - tuViChi + 12) % 12
  const thienPhuChi = (4 - tuViChi + 12) % 12;
  const thienPhuOffset: Record<string, number> = {
    'Thiên Phủ': 0,
    'Thái Âm': 1,
    'Tham Lang': 2,
    'Cự Môn': 3,
    'Thiên Tướng': 4,
    'Thiên Lương': 5,
    'Thất Sát': 6,
    'Phá Quân': 10
  };

  // Đưa sao Tử Vi hệ vào cung
  Object.entries(tuViOffset).forEach(([starName, off]) => {
    const pos = (tuViChi + off + 24) % 12;
    cungs[pos].chinhTinh.push({
      name: starName,
      type: 'chinh',
      dacTinh: (pos % 3 === 0 ? 'Miếu' : pos % 2 === 0 ? 'Vượng' : 'Đắc') as any,
      element: 'Thổ'
    });
  });

  // Đưa sao Thiên Phủ hệ vào cung
  Object.entries(thienPhuOffset).forEach(([starName, off]) => {
    const pos = (thienPhuChi + off + 24) % 12;
    cungs[pos].chinhTinh.push({
      name: starName,
      type: 'chinh',
      dacTinh: (pos % 2 === 1 ? 'Miếu' : 'Vượng') as any,
      element: 'Kim'
    });
  });

  // 7. An Phụ Tinh tiêu biểu (Lộc Tồn, Tả Phụ, Hữu Bật, Văn Xương, Văn Khúc, Kình Dương, Đà La, Thiên Khôi, Thiên Việt, Đào Hoa, Hồng Loan)
  // Lộc Tồn theo Can Năm: Giáp Dần(2), Ất Mão(3), Bính Mậu Tỵ(5), Đinh Kỷ Ngọ(6), Canh Thân(8), Tân Dậu(9), Nhâm Hợi(11), Quý Tý(0)
  const locTonTable = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  const locTonChi = locTonTable[canYearIndex];
  cungs[locTonChi].phuTinhCat.push({ name: 'Lộc Tồn', type: 'cat', description: 'Tài lộc dư dả, may mắn tiền bạc' });
  cungs[(locTonChi + 1) % 12].phuTinhHung.push({ name: 'Kình Dương', type: 'hung', description: 'Cương trực, dễ gặp va chạm, thị phi' });
  cungs[(locTonChi - 1 + 12) % 12].phuTinhHung.push({ name: 'Đà La', type: 'hung', description: 'Ám muội, do dự, thử thách kiên trì' });

  // Tả Phụ (Thìn + tháng), Hữu Bật (Tuất - tháng)
  const taPhuChi = (4 + lunarMonth - 1) % 12;
  const huuBatChi = (10 - (lunarMonth - 1) + 12) % 12;
  cungs[taPhuChi].phuTinhCat.push({ name: 'Tả Phụ', type: 'cat', description: 'Quý nhân phù trợ, nâng đỡ công việc' });
  cungs[huuBatChi].phuTinhCat.push({ name: 'Hữu Bật', type: 'cat', description: 'Trợ lực đắc lực, mở rộng mối quan hệ' });

  // Văn Xương (Tuất - giờ), Văn Khúc (Thìn + giờ)
  const vanXuongChi = (10 - hourChiIndex + 12) % 12;
  const vanKhucChi = (4 + hourChiIndex) % 12;
  cungs[vanXuongChi].phuTinhCat.push({ name: 'Văn Xương', type: 'cat', description: 'Thông minh, văn chương chữ nghĩa, thi cử thuận lợi' });
  cungs[vanKhucChi].phuTinhCat.push({ name: 'Văn Khúc', type: 'cat', description: 'Khéo léo nghệ thuật, tài ăn nói, hoạt ngôn' });

  // Thiên Khôi, Thiên Việt (Quý nhân)
  const khoiVietTable: [number, number][] = [
    [1, 7], // Giáp: Sửu Mùi
    [0, 8], // Ất: Tý Thân
    [11, 9], // Bính: Hợi Dậu
    [11, 9], // Đinh: Hợi Dậu
    [1, 7], // Mậu: Sửu Mùi
    [0, 8], // Kỷ: Tý Thân
    [1, 7], // Canh: Sửu Mùi
    [2, 6], // Tân: Dần Ngọ
    [3, 5], // Nhâm: Mão Tỵ
    [3, 5]  // Quý: Mão Tỵ
  ];
  const [khoiChi, vietChi] = khoiVietTable[canYearIndex] || [1, 7];
  cungs[khoiChi].phuTinhCat.push({ name: 'Thiên Khôi', type: 'cat', description: 'Đứng đầu, có tài lãnh đạo, gặp thời vận lớn' });
  cungs[vietChi].phuTinhCat.push({ name: 'Thiên Việt', type: 'cat', description: 'Quý nhân quyền quý nâng đỡ, cơ hội rộng mở' });

  // Đào Hoa & Hồng Loan
  const daoHoaTable = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0];
  const chiYearIndex = (lunarYear + 8) % 12;
  const daoHoaChi = daoHoaTable[chiYearIndex];
  const hongLoanChi = (3 - chiYearIndex + 12) % 12;
  cungs[daoHoaChi].phuTinhCat.push({ name: 'Đào Hoa', type: 'cat', description: 'Duyên dáng, có sức hút với người khác giới' });
  cungs[hongLoanChi].phuTinhCat.push({ name: 'Hồng Loan', type: 'cat', description: 'Hỷ khí, hôn nhân may mắn, vui vẻ hoạt bát' });

  // Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ (Tứ Hóa)
  cungs[(menhIndex + 4) % 12].phuTinhCat.push({ name: 'Hóa Lộc', type: 'cat', description: 'Của cải sinh sôi, thịnh vượng' });
  cungs[(menhIndex + 8) % 12].phuTinhCat.push({ name: 'Hóa Quyền', type: 'cat', description: 'Nắm giữ quyền bính, tiếng nói uy tín' });
  cungs[menhIndex].phuTinhCat.push({ name: 'Hóa Khoa', type: 'cat', description: 'Đỗ đạt danh vọng, hóa giải tai ách' });
  cungs[(menhIndex + 6) % 12].phuTinhHung.push({ name: 'Hóa Kỵ', type: 'hung', description: 'Thị phi hiểu lầm, thử thách cẩn trọng' });

  // 8. Luận giải chi tiết
  const menhCung = cungs[menhIndex];
  const mainStarsMenh = menhCung.chinhTinh.map(s => s.name).join(', ') || 'Vô Chính Diệu';
  const chuMenh = CHU_MENH_TABLE[CHI[chiYearIndex]];
  const chuThan = CHU_THAN_TABLE[CHI[chiYearIndex]];

  const luanGiai = generateTuViInterpretation(hoTen, gioiTinh, canChiYearObj.fullName, cucName, menhCung, mainStarsMenh, cungs);

  return {
    hoTen: hoTen || 'Quý Khách',
    gioiTinh,
    solarDate: `${day}/${month}/${year}`,
    lunarDate: `${lunarDay}/${lunarMonth}/${lunarYear} (${canChiYearObj.fullName})`,
    gioSinh: `Giờ ${CHI[hourChiIndex]} (${hourChiIndex * 2 - 1 < 0 ? 23 : hourChiIndex * 2 - 1}:00 - ${hourChiIndex * 2 + 1}:00)`,
    amDuongNamNu,
    menh: `Năm ${canChiYearObj.fullName}`,
    cuc: cucName,
    chuMenh,
    chuThan,
    cungMenhChi: `Cung ${CHI[menhIndex]} (${menhCung.canCung} ${CHI[menhIndex]})`,
    cungThanChi: `Cung ${CHI[thanIndex]} (${cungs[thanIndex].canCung} ${CHI[thanIndex]})`,
    cungs,
    luanGiai
  };
}

function generateTuViInterpretation(
  hoTen: string,
  gioiTinh: 'Nam' | 'Nữ',
  canChiYear: string,
  cucName: string,
  menhCung: CungTuVi,
  mainStarsMenh: string,
  cungs: CungTuVi[]
) {
  const quanCung = cungs.find(c => c.cungName === 'Quan Lộc');
  const taiCung = cungs.find(c => c.cungName === 'Tài Bạch');
  const phuTheCung = cungs.find(c => c.cungName === 'Phu Thê');

  const tongQuan = `Mệnh tạo sinh năm ${canChiYear}, lập mệnh tại cung ${menhCung.chiName} (${menhCung.canCung} ${menhCung.chiName}), nạp âm thuộc ${cucName}. Cung Mệnh có sao chủ tinh tọa thủ là [${mainStarsMenh}]. Người này có tư chất thông tuệ, tính cách kiên định, giàu lòng tự trọng và có khả năng thích nghi cao với thời cuộc. Khi gặp thời vận tốt sẽ nhanh chóng khẳng định được vị thế bản thân trong tập thể và xã hội.`;

  const congDanh = `Cung Quan Lộc tọa tại ${quanCung?.chiName} có các sao [${quanCung?.chinhTinh.map(s => s.name).join(', ') || 'Văn tinh hội tụ'}]. Sự nghiệp có bước tiến vững vàng từ độ tuổi trung niên (ngoài 30 tuổi). Phù hợp với các ngành nghề liên quan đến quản lý, kinh doanh, hoạch định chiến lược, tài chính hoặc sáng tạo chuyên môn cao. Càng về hậu vận đường danh vọng càng rộng mở, có uy tín và chỗ đứng vững vàng.`;

  const taiLoc = `Cung Tài Bạch tọa tại ${taiCung?.chiName} tiếp nhận vượng khí cát tinh. Dòng tiền luân chuyển năng động, có khả năng tích lũy và đầu tư tốt. Tiền vận có thể phải bôn ba tích góp, nhưng từ trung vận trở đi tài vận hanh thông, đa dạng nguồn thu. Nên tránh các trò may rủi đỏ đen, ưu tiên đầu tư thực chất vào bất động sản và các dự án có tính bền vững.`;

  const tinhDuyen = `Cung Phu Thê tại ${phuTheCung?.chiName} thể hiện đường lương duyên sâu sắc, người phối ngẫu là người thấu hiểu, tài hoa và có trách nhiệm với tổ ấm. ${gioiTinh === 'Nam' ? 'Vợ là hậu phương vững chắc giúp đỡ sự nghiệp.' : 'Chồng là trụ cột vững vàng, hết lòng yêu thương gia đình.'} Đôi khi có chút bất đồng quan điểm do cá tính mạnh mẽ của cả hai, chỉ cần nhường nhịn lắng nghe thì gia đạo sẽ luôn êm ấm, phúc lộc song toàn.`;

  const sucKhoe = `Cung Tật Ách cần chú ý các vấn đề về hệ tiêu hóa, dạ dày và cột sống khi làm việc căng thẳng nhiều giờ liền. Nên duy trì thói quen vận động thể thao điều độ, giữ tinh thần lạc quan, thanh tịnh để duy trì trường thọ và an khang.`;

  const loiKhuyen = `Đức năng thắng số - Tâm sáng thì vận thông. Để đại vận luôn hanh thông, đương số nên thường xuyên tích đức hành thiện, giúp đỡ người khó khăn, hiếu thuận với cha mẹ và luôn giữ thái độ khiêm tốn trước mọi thành công.`;

  return {
    tongQuan,
    congDanh,
    taiLoc,
    tinhDuyen,
    sucKhoe,
    loiKhuyen
  };
}
