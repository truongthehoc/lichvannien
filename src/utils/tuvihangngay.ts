/**
 * Thuật toán & Cơ sở dữ liệu Luận giải Tử Vi Hàng Ngày cho 12 Con Giáp & Theo Năm Sinh
 * Dựa trên tương tác Thiên Can, Địa Chi, Ngũ Hành Nạp Âm, Thập Thần, Trực Nhật và Thần Sát
 */

import { CAN, CHI, convertSolar2Lunar, getCanChiDay, getCanChiMonth, getCanChiYear, MENH_NAP_AM, GIO_12, jdn, getGioHoangDao } from './amlich';
import { getNgayTotXau } from './ngaytotxau';

export interface ZodiacAnimalInfo {
  index: number; // 0 - 11
  chiName: string; // Tý, Sửu,...
  name: string; // Chuột, Trâu,...
  element: 'Thủy' | 'Thổ' | 'Mộc' | 'Hỏa' | 'Kim';
  symbol: string; // 🐭, 🐂,...
  description: string;
  personality: string;
}

export const ZODIAC_LIST: ZodiacAnimalInfo[] = [
  { index: 0, chiName: 'Tý', name: 'Chuột', element: 'Thủy', symbol: '🐭', description: 'Thông minh, nhanh nhạy, khả năng thích ứng cao, giỏi quản lý tài chính.', personality: 'Linh hoạt, tích cực, nhìn xa trông rộng' },
  { index: 1, chiName: 'Sửu', name: 'Trâu', element: 'Thổ', symbol: '🐂', description: 'Kiên trì, cần cù, đáng tin cậy, nguyên tắc vững vàng và trung thực.', personality: 'Điềm tĩnh, nhẫn nại, kiên định' },
  { index: 2, chiName: 'Dần', name: 'Hổ', element: 'Mộc', symbol: '🐯', description: 'Dũng cảm, quyết đoán, khí chất lãnh đạo, dám nghĩ dám làm.', personality: 'Hào sảng, nhiệt huyết, tiên phong' },
  { index: 3, chiName: 'Mão', name: 'Mèo', element: 'Mộc', symbol: '🐱', description: 'Khéo léo, tinh tế, hòa nhã, mắt thẩm mỹ cao và chu đáo.', personality: 'Ôn hòa, lịch thiệp, nhạy bén' },
  { index: 4, chiName: 'Thìn', name: 'Rồng', element: 'Thổ', symbol: '🐲', description: 'Uy quyền, nhiều tham vọng, tài năng xuất chúng, vận số cao quý.', personality: 'Mạnh mẽ, sáng tạo, tự tin' },
  { index: 5, chiName: 'Tỵ', name: 'Rắn', element: 'Hỏa', symbol: '🐍', description: 'Sâu sắc, thông tuệ, trực giác nhạy bén, kín đáo và bí ẩn.', personality: 'Cẩn trọng, mưu lược, kiên quyết' },
  { index: 6, chiName: 'Ngọ', name: 'Ngựa', element: 'Hỏa', symbol: '🐴', description: 'Tự do, năng động, yêu đời, giao thiệp rộng rãi và nhiệt tình.', personality: 'Phóng khoáng, cởi mở, dồi dào năng lượng' },
  { index: 7, chiName: 'Mùi', name: 'Dê', element: 'Thổ', symbol: '🐐', description: 'Hiền lành, nhân hậu, nghệ thuật, giàu lòng trắc ẩn và yêu chuộng hòa bình.', personality: 'Nhã nhặn, chu đáo, tinh tế' },
  { index: 8, chiName: 'Thân', name: 'Khỉ', element: 'Kim', symbol: '🐵', description: 'Thông tuệ, lanh lợi, sáng tạo phi thường, ứng biến linh hoạt.', personality: 'Hài hước, năng động, đa tài' },
  { index: 9, chiName: 'Dậu', name: 'Gà', element: 'Kim', symbol: '🐔', description: 'Chăm chỉ, kỷ luật, chu toàn, thẳng thắn và có mắt quan sát tỉ mỉ.', personality: 'Ngăn nắp, trách nhiệm, kiên định' },
  { index: 10, chiName: 'Tuất', name: 'Chó', element: 'Thổ', symbol: '🐶', description: 'Trung thành, trượng nghĩa, chân thành, giàu tinh thần trách nhiệm.', personality: 'Tận tụy, thẳng thắn, đáng tin cậy' },
  { index: 11, chiName: 'Hợi', name: 'Lợn', element: 'Thủy', symbol: '🐷', description: 'Phúc hậu, an nhiên, rộng lượng, sống tình cảm và vượng tài lộc.', personality: 'Lạc quan, vị tha, chân thành' },
];

// Ngũ hành tương sinh tương khắc
const NGU_HANH_SINH: Record<string, string> = {
  'Kim': 'Thủy',
  'Thủy': 'Mộc',
  'Mộc': 'Hỏa',
  'Hỏa': 'Thổ',
  'Thổ': 'Kim',
};

const NGU_HANH_KHAC: Record<string, string> = {
  'Kim': 'Mộc',
  'Mộc': 'Thổ',
  'Thổ': 'Thủy',
  'Thủy': 'Hỏa',
  'Hỏa': 'Kim',
};

// Tam hợp
const TAM_HOP: Record<number, number[]> = {
  0: [8, 4], // Thân Tý Thìn (Thủy)
  1: [5, 9], // Tỵ Dậu Sửu (Kim)
  2: [6, 10], // Dần Ngọ Tuất (Hỏa)
  3: [11, 7], // Hợi Mão Mùi (Mộc)
  4: [0, 8], // Thân Tý Thìn
  5: [9, 1], // Tỵ Dậu Sửu
  6: [2, 10], // Dần Ngọ Tuất
  7: [11, 3], // Hợi Mão Mùi
  8: [0, 4], // Thân Tý Thìn
  9: [5, 1], // Tỵ Dậu Sửu
  10: [2, 6], // Dần Ngọ Tuất
  11: [3, 7], // Hợi Mão Mùi
};

// Lục hợp
const LUC_HOP: Record<number, number> = {
  0: 1, 1: 0,   // Tý - Sửu
  2: 11, 11: 2, // Dần - Hợi
  3: 10, 10: 3, // Mão - Tuất
  4: 9, 9: 4,   // Thìn - Dậu
  5: 8, 8: 5,   // Tỵ - Thân
  6: 7, 7: 6    // Ngọ - Mùi
};

// Lục xung
const LUC_XUNG: Record<number, number> = {
  0: 6, 6: 0,   // Tý - Ngọ
  1: 7, 7: 1,   // Sửu - Mùi
  2: 8, 8: 2,   // Dần - Thân
  3: 9, 9: 3,   // Mão - Dậu
  4: 10, 10: 4, // Thìn - Tuất
  5: 11, 11: 5  // Tỵ - Hợi
};

// Tương hại
const TUONG_HAI: Record<number, number> = {
  0: 7, 7: 0,   // Tý - Mùi
  1: 6, 6: 1,   // Sửu - Ngọ
  2: 5, 5: 2,   // Dần - Tỵ
  3: 4, 4: 3,   // Mão - Thìn
  8: 11, 11: 8, // Thân - Hợi
  9: 10, 10: 9  // Dậu - Tuất
};

// Màu sắc theo ngũ hành
const LUCKY_COLORS: Record<string, string[]> = {
  'Kim': ['Trắng', 'Bạc', 'Ánh Kim', 'Vàng Hoàng Kim', 'Nâu Đất'],
  'Mộc': ['Xanh Lá Cây', 'Xanh Lục', 'Xanh Ngọc', 'Xanh Dương', 'Đen'],
  'Thủy': ['Xanh Dương', 'Xanh Biển', 'Đen', 'Trắng', 'Bạc'],
  'Hỏa': ['Đỏ', 'Hồng', 'Tím', 'Cam', 'Xanh Lá'],
  'Thổ': ['Vàng Đậm', 'Nâu Đất', 'Cam Đất', 'Đỏ', 'Hồng'],
};

// Con số may mắn theo ngũ hành & chi
const LUCKY_NUMBERS_MAP: Record<number, number[][]> = {
  0: [[1, 6], [2, 7]], // Tý
  1: [[0, 5], [2, 7]], // Sửu
  2: [[3, 8], [1, 6]], // Dần
  3: [[3, 8], [9, 4]], // Mão
  4: [[5, 0], [2, 7]], // Thìn
  5: [[2, 7], [3, 8]], // Tỵ
  6: [[2, 7], [9, 4]], // Ngọ
  7: [[0, 5], [2, 7]], // Mùi
  8: [[4, 9], [1, 6]], // Thân
  9: [[4, 9], [0, 5]], // Dậu
  10: [[5, 0], [2, 7]], // Tuất
  11: [[1, 6], [3, 8]], // Hợi
};

export interface DailyHoroscopeDetail {
  zodiac: ZodiacAnimalInfo;
  targetDateStr: string;
  solarDate: string;
  lunarDate: string;
  canChiDay: string;
  canChiMonth: string;
  canChiYear: string;
  menhDay: string;
  relationType: string; // 'Lục Hợp Quý Nhân' | 'Tam Hợp Cát Thần' | 'Bình Hòa' | 'Lục Xung' | 'Tương Hại' | 'Tự Hình'
  overallScore: number; // 40 - 99
  overallRating: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Thận Trọng';
  stars: {
    career: number; // 1 - 5
    wealth: number;
    love: number;
    health: number;
  };
  overviewText: string;
  careerText: string;
  wealthText: string;
  loveText: string;
  healthText: string;
  fengshui: {
    luckyNumbers: number[];
    luckyColors: string[];
    nobleMen: string[]; // Quý nhân
    unluckyTuoi: string[]; // Tuổi kỵ hôm nay
    bestHours: string[]; // Giờ tốt
    direction: {
      hyThan: string;
      taiThan: string;
    };
    goldenAdvice: string;
  };
}

// Bảng năm sinh phổ biến cho 12 con giáp
export interface PopularBirthYear {
  year: number;
  canChi: string;
  menh: string;
  chiIndex: number;
}

export function getPopularBirthYears(): PopularBirthYear[] {
  const years: PopularBirthYear[] = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 75; y <= currentYear - 10; y++) {
    const canChiObj = getCanChiYear(y);
    const canChi = canChiObj.fullName;
    const chiIndex = CHI.indexOf(canChiObj.chi);
    const menh = MENH_NAP_AM[canChi] || 'Ngũ Hành Nạp Âm';
    years.push({
      year: y,
      canChi,
      menh,
      chiIndex: chiIndex >= 0 ? chiIndex : 0
    });
  }
  return years.reverse();
}

/**
 * Tính toán Tử Vi Hàng Ngày cho 1 con giáp trong ngày cụ thể
 */
export function calculateDailyHoroscope(
  chiIndex: number,
  targetDate: Date,
  birthYearCanChi?: string
): DailyHoroscopeDetail {
  const zodiac = ZODIAC_LIST[chiIndex] || ZODIAC_LIST[0];
  const d = targetDate.getDate();
  const m = targetDate.getMonth() + 1;
  const y = targetDate.getFullYear();

  const jd = jdn(d, m, y);
  const [lunarDay, lunarMonth, lunarYear, isLeap] = convertSolar2Lunar(d, m, y, 7.0);
  const canChiDayObj = getCanChiDay(jd);
  const canChiDay = canChiDayObj.fullName;
  const canChiMonth = getCanChiMonth(lunarMonth, lunarYear).fullName;
  const canChiYear = getCanChiYear(lunarYear).fullName;
  const menhDay = MENH_NAP_AM[canChiDay] || 'Hải Trung Kim';

  // Lấy chi ngày
  const dayChiIndex = canChiDayObj.chiIndex;
  const dayCanStr = canChiDayObj.can;

  // Chiết xuất ngũ hành của ngày từ nạp âm
  let dayElement: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' = 'Kim';
  if (menhDay.includes('Kim')) dayElement = 'Kim';
  else if (menhDay.includes('Mộc')) dayElement = 'Mộc';
  else if (menhDay.includes('Thủy')) dayElement = 'Thủy';
  else if (menhDay.includes('Hỏa')) dayElement = 'Hỏa';
  else if (menhDay.includes('Thổ')) dayElement = 'Thổ';

  // Xét quan hệ Địa Chi giữa Tuổi và Ngày
  let relationScore = 0;
  let relationType = 'Bình Hòa Cát Lành';
  let isLucHop = false;
  let isTamHop = false;
  let isLucXung = false;
  let isTuongHai = false;
  let isTuHinh = false;

  if (LUC_HOP[chiIndex] === dayChiIndex) {
    relationScore = 25;
    relationType = 'Lục Hợp Quý Nhân (Đại Cát)';
    isLucHop = true;
  } else if (TAM_HOP[chiIndex] && TAM_HOP[chiIndex].includes(dayChiIndex)) {
    relationScore = 20;
    relationType = 'Tam Hợp Cát Thần (Cát Tường)';
    isTamHop = true;
  } else if (LUC_XUNG[chiIndex] === dayChiIndex) {
    relationScore = -22;
    relationType = 'Lục Xung Đối Kháng (Cần Thận Trọng)';
    isLucXung = true;
  } else if (TUONG_HAI[chiIndex] === dayChiIndex) {
    relationScore = -16;
    relationType = 'Tương Hại Khẩu Thiệt (Đề Phòng Tiểu Nhân)';
    isTuongHai = true;
  } else if (chiIndex === dayChiIndex && [4, 6, 9, 11].includes(chiIndex)) {
    relationScore = -10;
    relationType = 'Tự Hình Nội Tâm (Giữ Tâm Thanh Thản)';
    isTuHinh = true;
  } else if (chiIndex === dayChiIndex) {
    relationScore = 10;
    relationType = 'Thái Tuế Trùng Phùng (Bình Ổn)';
  } else {
    relationScore = 8;
    relationType = 'Bình Hòa Thuận Lợi';
  }

  // Xét ngũ hành nạp âm
  let elementScore = 0;
  const myElement = zodiac.element;
  if (NGU_HANH_SINH[dayElement] === myElement) {
    elementScore += 12; // Ngày sinh Tuổi
  } else if (dayElement === myElement) {
    elementScore += 8; // Tỷ hòa
  } else if (NGU_HANH_KHAC[myElement] === dayElement) {
    elementScore += 5; // Tuổi khắc Ngày (Khắc xuất - Chế ngự cầu tài)
  } else if (NGU_HANH_SINH[myElement] === dayElement) {
    elementScore -= 4; // Tuổi sinh Ngày (Sinh xuất - Hao tổn)
  } else if (NGU_HANH_KHAC[dayElement] === myElement) {
    elementScore -= 12; // Ngày khắc Tuổi (Khắc nhập - Áp lực)
  }

  // Hash nhỏ từ ngày để tạo biến thiên ngẫu nhiên theo chu kỳ tự nhiên
  const dateHash = (d * 13 + m * 7 + y + chiIndex * 19) % 15;
  const baseScore = 65 + relationScore + elementScore + (dateHash - 7);
  const finalScore = Math.max(42, Math.min(98, baseScore));

  let overallRating: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Thận Trọng' = 'Bình Hòa';
  if (finalScore >= 82) overallRating = 'Đại Cát';
  else if (finalScore >= 70) overallRating = 'Tiểu Cát';
  else if (finalScore >= 55) overallRating = 'Bình Hòa';
  else overallRating = 'Thận Trọng';

  // Tính số sao (1 - 5) cho các phương diện
  const getStars = (factor: number) => {
    const val = Math.round((finalScore + factor) / 20);
    return Math.max(2, Math.min(5, val));
  };

  const careerStars = getStars(isLucHop || isTamHop ? 8 : (isLucXung ? -8 : 0));
  const wealthStars = getStars(isLucHop ? 10 : (isTuongHai ? -10 : (myElement === 'Kim' || myElement === 'Hỏa' ? 4 : 0)));
  const loveStars = getStars(isLucHop || isTamHop ? 12 : (isLucXung || isTuHinh ? -12 : 2));
  const healthStars = getStars(elementScore > 0 ? 6 : -6);

  // Soạn thảo luận giải chi tiết theo con giáp và ngày
  const overviewText = isLucHop
    ? `Hôm nay tuổi ${zodiac.name} đón nhận vận khí đỉnh cao nhờ cục diện Lục Hợp Quý Nhân che chở. Mọi kế hoạch, công việc hay giao dịch tài chính đều diễn ra vô cùng suôn sẻ, có người quyền quý chỉ đường dẫn lối.`
    : isTamHop
    ? `Vận trình ngày hôm nay của tuổi ${zodiac.name} vô cùng sáng sủa nhờ Tam Hợp cát tinh tương trợ. Bạn tràn đầy năng lượng tích cực, tư duy mạch lạc và dễ dàng gặt hái thành quả xứng đáng với công sức bỏ ra.`
    : isLucXung
    ? `Cục diện Lục Xung nhắc nhở tuổi ${zodiac.name} hôm nay nên hành sự cẩn trọng, dĩ hòa vi quý. Tránh đối đầu trực diện hoặc vội vàng đưa ra quyết định đầu tư lớn khi chưa tìm hiểu thấu đáo.`
    : isTuongHai
    ? `Hôm nay tuổi ${zodiac.name} chịu ảnh hưởng của Tương Hại, cần chú ý giữ mồm giữ miệng, đề phòng tiểu nhân gièm pha sau lưng. Trong vấn đề tiền bạc nên rõ ràng rành mạch để tránh mất lòng bạn bè.`
    : isTuHinh
    ? `Tuổi ${zodiac.name} có xu hướng tự tạo áp lực và suy nghĩ quá nhiều trong ngày hôm nay. Hãy thả lỏng tâm trí, chia sẻ khó khăn với người thân để cảm nhận sự nhẹ nhõm và tìm ra hướng giải quyết tối ưu.`
    : `Vận thế hôm nay của tuổi ${zodiac.name} ở mức bình hòa, êm ấm. Đây là thời điểm tuyệt vời để bạn củng cố các nền tảng công việc hiện tại, duy trì nhịp sống đều đặn và chăm sóc các mối quan hệ thân thiết.`;

  const careerText = careerStars >= 5
    ? `Công danh sự nghiệp thăng hoa rực rỡ. Bạn thể hiện xuất sắc năng lực chuyên môn, giải quyết gọn gàng các đầu việc hóc búa và nhận được sự tín nhiệm lớn từ cấp trên cùng đồng nghiệp.`
    : careerStars === 4
    ? `Công việc diễn tiến thuận lợi đúng theo lộ trình đã định. Hãy tự tin triển khai các ý tưởng mới hoặc đề xuất hợp tác, cơ hội mở rộng tầm ảnh hưởng đang mở ra trước mắt.`
    : careerStars === 3
    ? `Nhịp độ công việc ổn định, không có biến động lớn. Bản mệnh nên tập trung hoàn thành các nhiệm vụ dang dở, tránh ôm đồm nhiều việc cùng lúc để đảm bảo chất lượng cao nhất.`
    : `Nên cẩn trọng trong từng văn bản, số liệu và hợp đồng. Tránh tranh cãi với cấp trên hoặc đối tác; sự nhẫn nại và mềm mỏng sẽ giúp bạn vượt qua mọi thử thách một cách êm đẹp.`;

  const wealthText = wealthStars >= 5
    ? `Tài lộc vượng phát, tiền bạc đổ về túi dồi dào. Người kinh doanh buôn bán đắt hàng, lợi nhuận tăng vọt; người làm công ăn lương có cơ hội nhận thưởng hoặc tìm được nguồn thu nhập phụ hấp dẫn.`
    : wealthStars === 4
    ? `Tình hình tài chính khởi sắc rõ rệt. Các khoản đầu tư trước đây bắt đầu sinh lời. Bạn có thể chi tiêu thoải mái hơn cho nhu cầu cá nhân nhưng vẫn nên duy trì một khoản tiết kiệm dự phòng.`
    : wealthStars === 3
    ? `Tài vận giữ ở mức cân bằng, thu chi đều đặn. Hôm nay thích hợp để lập kế hoạch chi tiêu trung và dài hạn, tránh tiêu xài theo cảm xúc vào những món đồ xa xỉ không thực sự cần thiết.`
    : `Hôm nay cần siết chặt ví tiền, cảnh giác trước các lời mời gọi đầu tư lợi nhuận cao bất thường. Hạn chế cho vay mượn tiền bạc trong ngày để bảo vệ ngân sách gia đình.`;

  const loveText = loveStars >= 5
    ? `Đào hoa nở rộ, tình cảm thăng hoa ngọt ngào. Người độc thân dễ dàng tìm thấy nửa kia tâm đầu ý hợp qua những cuộc gặp gỡ tình cờ. Các cặp đôi thêm gắn kết, thấu hiểu và sẻ chia sâu sắc.`
    : loveStars === 4
    ? `Phương diện tình duyên đón nhận nhiều tin vui. Mối quan hệ gia đình êm ấm, thuận hòa; tình cảm lứa đôi có bước chuyển biến tích cực, là chỗ dựa tinh thần vững chắc cho bạn.`
    : loveStars === 3
    ? `Chuyện tình cảm duy trì trạng thái bình ổn. Đôi khi bạn và đối phương cần một khoảng không gian riêng tư để lắng đọng hoặc một bữa tối ấm cúng cùng nhau để hâm nóng tình cảm.`
    : `Dễ nảy sinh bất đồng quan điểm nhỏ vì những chuyện vụn vặt thường ngày. Hãy học cách lắng nghe và bao dung, tránh để cái tôi quá cao làm tổn thương người mình yêu thương.`;

  const healthText = healthStars >= 4
    ? `Khí sắc hồng hào, thể lực dồi dào và tinh thần sảng khoái. Năng lượng tích cực lan tỏa giúp bạn làm việc hăng say không biết mệt mỏi.`
    : healthStars === 3
    ? `Sức khỏe ở mức ổn định. Chú ý duy trì thói quen uống đủ nước, vận động nhẹ nhàng giữa các giờ làm việc và ngủ đủ giấc để tinh thần luôn tỉnh táo.`
    : `Nên chú ý vấn đề tiêu hóa và đi lại xe cộ cẩn thận. Hạn chế thức khuya và dùng các chất kích thích; dành thời gian nghỉ ngơi tĩnh tâm vào buổi tối.`;

  // Phong thủy kích tài lộc
  const luckyNumsPair = LUCKY_NUMBERS_MAP[chiIndex] || [[1, 6], [2, 7]];
  const luckyNumbers = [
    luckyNumsPair[0][0],
    luckyNumsPair[0][1],
    luckyNumsPair[1][0] * 10 + luckyNumsPair[0][1],
    luckyNumsPair[1][1] * 10 + luckyNumsPair[0][0],
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);

  const luckyColors = LUCKY_COLORS[zodiac.element] || ['Đỏ', 'Vàng'];

  // Quý nhân & Tuổi xung
  const nobleChiIndices = [
    LUC_HOP[chiIndex] !== undefined ? LUC_HOP[chiIndex] : 0,
    ...(TAM_HOP[chiIndex] || [])
  ];
  const nobleMen = nobleChiIndices.map(idx => `Tuổi ${ZODIAC_LIST[idx].name} (${ZODIAC_LIST[idx].chiName})`);

  const unluckyChiIndices = [
    LUC_XUNG[chiIndex] !== undefined ? LUC_XUNG[chiIndex] : 6,
    TUONG_HAI[chiIndex] !== undefined ? TUONG_HAI[chiIndex] : 7
  ];
  const unluckyTuoi = unluckyChiIndices.map(idx => `Tuổi ${ZODIAC_LIST[idx].name} (${ZODIAC_LIST[idx].chiName})`);

  // Giờ tốt trong ngày
  const hoangDaoHours = getGioHoangDao(jd).filter(g => g.isHoangDao);
  const bestHours = hoangDaoHours.slice(0, 3).map(h => `Giờ ${h.name} (${h.time})`);

  // Hướng xuất hành
  const ngayTotXauInfo = getNgayTotXau(jd, lunarDay, lunarMonth, canChiDayObj.can, canChiDayObj.chi);
  const direction = {
    hyThan: ngayTotXauInfo.huongXuatHanh.hyThan,
    taiThan: ngayTotXauInfo.huongXuatHanh.taiThan,
  };

  const goldenAdvice = isLucHop || isTamHop
    ? 'Nắm bắt thời cơ, mạnh dạn triển khai việc lớn; kết hợp sức mạnh đồng đội để vươn tới thành công rực rỡ.'
    : isLucXung || isTuongHai
    ? 'Học chữ Nhẫn để bình an, lắng nghe nhiều hơn nói, giữ tâm bình thản trước mọi thị phi bên ngoài.'
    : 'Tích lũy nội lực, chăm chỉ làm việc và giữ trọn chữ Tín; vận may sẽ tự nhiên hội tụ.';

  return {
    zodiac,
    targetDateStr: `${d}/${m}/${y}`,
    solarDate: `Ngày ${d} tháng ${m} năm ${y}`,
    lunarDate: `Ngày ${lunarDay} tháng ${lunarMonth} năm ${lunarYear}${isLeap ? ' (Nhuận)' : ''} (${canChiDay})`,
    canChiDay,
    canChiMonth,
    canChiYear,
    menhDay,
    relationType,
    overallScore: finalScore,
    overallRating,
    stars: {
      career: careerStars,
      wealth: wealthStars,
      love: loveStars,
      health: healthStars,
    },
    overviewText,
    careerText,
    wealthText,
    loveText,
    healthText,
    fengshui: {
      luckyNumbers,
      luckyColors,
      nobleMen,
      unluckyTuoi,
      bestHours,
      direction,
      goldenAdvice,
    },
  };
}

/**
 * Lấy tóm tắt nhanh vận thế của toàn bộ 12 con giáp trong ngày
 */
export function get12ZodiacDailySummary(targetDate: Date) {
  return ZODIAC_LIST.map((zodiac) => {
    const detail = calculateDailyHoroscope(zodiac.index, targetDate);
    return {
      index: zodiac.index,
      chiName: zodiac.chiName,
      name: zodiac.name,
      symbol: zodiac.symbol,
      element: zodiac.element,
      score: detail.overallScore,
      rating: detail.overallRating,
      relationType: detail.relationType,
      careerStars: detail.stars.career,
      wealthStars: detail.stars.wealth,
      loveStars: detail.stars.love,
      luckyNumbers: detail.fengshui.luckyNumbers,
      luckyColors: detail.fengshui.luckyColors,
      nobleMen: detail.fengshui.nobleMen[0] || 'Quý nhân',
      unluckyTuoi: detail.fengshui.unluckyTuoi[0] || 'Đề phòng xung khắc',
    };
  });
}
