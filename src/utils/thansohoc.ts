/**
 * Thuật toán Thần Số Học Pitago (Pythagorean Numerology)
 * Tính toán Con số chủ đạo, Sứ mệnh, Linh hồn, Nhân cách, Năm cá nhân, Biểu đồ ngày sinh,
 * Giải mã Crush và Luận giải Tương hợp Cặp đôi chuyên sâu.
 */

// Bảng quy đổi chữ cái sang số theo Pitago
const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

// Loại bỏ dấu tiếng Việt để chuẩn hóa về bảng chữ cái Latin
export function removeVietnameseAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

// Kiểm tra nguyên âm tiếng Việt (A, E, I, O, U, Y)
function isVowel(char: string, prevChar?: string, nextChar?: string): boolean {
  if (['A', 'E', 'I', 'O', 'U'].includes(char)) return true;
  if (char === 'Y') {
    // Chữ Y đứng cạnh nguyên âm thì coi là phụ âm (như trong NGUYEN), đứng cạnh phụ âm thì coi là nguyên âm (như trong LY, MY)
    const isPrevVowel = prevChar && ['A', 'E', 'I', 'O', 'U'].includes(prevChar);
    const isNextVowel = nextChar && ['A', 'E', 'I', 'O', 'U'].includes(nextChar);
    return !isPrevVowel && !isNextVowel;
  }
  return false;
}

// Rút gọn tổng các chữ số về 1 chữ số (hoặc giữ lại Master numbers: 11, 22, 33 cho Con số chủ đạo)
export function reduceDigits(num: number, allowMasterNumbers: boolean = false): number {
  while (num > 9) {
    if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}

/**
 * 1. Tính Con Số Chủ Đạo (Life Path Number)
 */
export function calculateLifePathNumber(day: number, month: number, year: number): number {
  const reducePart = (n: number) => {
    let sum = String(n)
      .split('')
      .reduce((acc, d) => acc + parseInt(d, 10), 0);
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = String(sum)
        .split('')
        .reduce((acc, d) => acc + parseInt(d, 10), 0);
    }
    return sum;
  };

  const dayReduced = reducePart(day);
  const monthReduced = reducePart(month);
  const yearReduced = reducePart(year);

  const total = dayReduced + monthReduced + yearReduced;
  return reduceDigits(total, true);
}

/**
 * 2. Tính Con Số Sứ Mệnh (Destiny Number) - Tổng tất cả các chữ cái trong tên
 */
export function calculateDestinyNumber(name: string): number {
  const cleanName = removeVietnameseAccents(name);
  if (!cleanName) return 1;

  let sum = 0;
  for (const char of cleanName) {
    sum += PYTHAGOREAN_MAP[char] || 0;
  }
  return reduceDigits(sum, true);
}

/**
 * 3. Tính Con Số Linh Hồn (Soul Urge) - Tổng các nguyên âm
 */
export function calculateSoulUrgeNumber(name: string): number {
  const cleanName = removeVietnameseAccents(name);
  if (!cleanName) return 1;

  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    const prev = i > 0 ? cleanName[i - 1] : undefined;
    const next = i < cleanName.length - 1 ? cleanName[i + 1] : undefined;

    if (isVowel(char, prev, next)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }
  return reduceDigits(sum, true);
}

/**
 * 4. Tính Con Số Nhân Cách (Personality Number) - Tổng các phụ âm
 */
export function calculatePersonalityNumber(name: string): number {
  const cleanName = removeVietnameseAccents(name);
  if (!cleanName) return 1;

  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    const prev = i > 0 ? cleanName[i - 1] : undefined;
    const next = i < cleanName.length - 1 ? cleanName[i + 1] : undefined;

    if (!isVowel(char, prev, next)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }
  return reduceDigits(sum);
}

/**
 * 5. Tính Năm Cá Nhân (Personal Year Number)
 */
export function calculatePersonalYear(day: number, month: number, targetYear: number = new Date().getFullYear()): number {
  const dayR = reduceDigits(day);
  const monthR = reduceDigits(month);
  const yearR = reduceDigits(targetYear);
  return reduceDigits(dayR + monthR + yearR);
}

/**
 * 6. Tính Con Số Thái Độ (Attitude Number)
 */
export function calculateAttitudeNumber(day: number, month: number): number {
  return reduceDigits(day + month);
}

/**
 * 7. Biểu Đồ Ngày Sinh (3x3 Grid) & Mũi Tên Sức Mạnh
 */
export interface BirthChartResult {
  grid: Record<number, number>; // Số lần xuất hiện của số 1 - 9
  arrows: { name: string; type: 'strength' | 'empty'; description: string }[];
}

export function calculateBirthChart(day: number, month: number, year: number): BirthChartResult {
  const dateStr = `${day}${month}${year}`;
  const grid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (const digit of dateStr) {
    const n = parseInt(digit, 10);
    if (n >= 1 && n <= 9) {
      grid[n] = (grid[n] || 0) + 1;
    }
  }

  const arrows: { name: string; type: 'strength' | 'empty'; description: string }[] = [];

  // 1-2-3: Kế hoạch
  if (grid[1] > 0 && grid[2] > 0 && grid[3] > 0) {
    arrows.push({ name: 'Mũi tên Kế Hoạch (1-2-3)', type: 'strength', description: 'Có óc tổ chức, sắp xếp công việc logic, chu đáo và ngăn nắp.' });
  } else if (grid[1] === 0 && grid[2] === 0 && grid[3] === 0) {
    arrows.push({ name: 'Mũi tên Hỗn Độn (Thiếu 1-2-3)', type: 'empty', description: 'Dễ làm việc ngẫu hứng, cần rèn luyện tính kiên trì và lập kế hoạch.' });
  }

  // 4-5-6: Ý chí
  if (grid[4] > 0 && grid[5] > 0 && grid[6] > 0) {
    arrows.push({ name: 'Mũi tên Ý Chí (4-5-6)', type: 'strength', description: 'Ý chí sắt đá, kiên định vượt qua mọi nghịch cảnh và biến cố.' });
  } else if (grid[4] === 0 && grid[5] === 0 && grid[6] === 0) {
    arrows.push({ name: 'Mũi tên Uất Giận (Thiếu 4-5-6)', type: 'empty', description: 'Dễ nản lòng khi gặp khó khăn, cần nuôi dưỡng niềm tin nội tâm.' });
  }

  // 7-8-9: Hoạt động
  if (grid[7] > 0 && grid[8] > 0 && grid[9] > 0) {
    arrows.push({ name: 'Mũi tên Hoạt Động (7-8-9)', type: 'strength', description: 'Năng động, thích xê dịch, hăng hái hành động và trải nghiệm thực tế.' });
  } else if (grid[7] === 0 && grid[8] === 0 && grid[9] === 0) {
    arrows.push({ name: 'Mũi tên Thụ Động (Thiếu 7-8-9)', type: 'empty', description: 'Có xu hướng chần chừ, nên chủ động bắt tay vào thực hiện ý tưởng.' });
  }

  // 1-4-7: Thực tế
  if (grid[1] > 0 && grid[4] > 0 && grid[7] > 0) {
    arrows.push({ name: 'Mũi tên Thực Tế (1-4-7)', type: 'strength', description: 'Thực tiễn, khéo tay, tin vào trải nghiệm thực tế hơn lý thuyết.' });
  }

  // 2-5-8: Cảm xúc & Cân bằng
  if (grid[2] > 0 && grid[5] > 0 && grid[8] > 0) {
    arrows.push({ name: 'Mũi tên Cân Bằng Cảm Xúc (2-5-8)', type: 'strength', description: 'Giàu lòng trắc ẩn, tâm hồn phong phú, trực giác tâm linh nhạy bén.' });
  } else if (grid[2] === 0 && grid[5] === 0 && grid[8] === 0) {
    arrows.push({ name: 'Mũi tên Nhạy Cảm (Thiếu 2-5-8)', type: 'empty', description: 'Dễ bị tổn thương cảm xúc, cần học cách biểu đạt tâm tư rõ ràng.' });
  }

  // 3-6-9: Trí tuệ
  if (grid[3] > 0 && grid[6] > 0 && grid[9] > 0) {
    arrows.push({ name: 'Mũi tên Trí Tuệ (3-6-9)', type: 'strength', description: 'Tư duy sắc sảo, trí nhớ vượt trội, khả năng học hỏi và sáng tạo đỉnh cao.' });
  }

  // 1-5-9: Quyết tâm
  if (grid[1] > 0 && grid[5] > 0 && grid[9] > 0) {
    arrows.push({ name: 'Mũi tên Quyết Tâm (1-5-9)', type: 'strength', description: 'Kiên trì theo đuổi mục tiêu đến cùng, không bao giờ bỏ cuộc nửa chừng.' });
  } else if (grid[1] === 0 && grid[5] === 0 && grid[9] === 0) {
    arrows.push({ name: 'Mũi tên Trì Hoãn (Thiếu 1-5-9)', type: 'empty', description: 'Có thói quen do dự, cần rèn luyện tính dứt khoát trong hành động.' });
  }

  // 3-5-7: Tâm linh
  if (grid[3] > 0 && grid[5] > 0 && grid[7] > 0) {
    arrows.push({ name: 'Mũi tên Tâm Linh / Trực Giác (3-5-7)', type: 'strength', description: 'Có niềm tin tâm linh sâu sắc, giác quan thứ 6 nhạy bén và hiểu đời.' });
  } else if (grid[3] === 0 && grid[5] === 0 && grid[7] === 0) {
    arrows.push({ name: 'Mũi tên Hoài Nghi (Thiếu 3-5-7)', type: 'empty', description: 'Thường nghi ngờ mọi việc, cần học cách mở lòng đón nhận bài học cuộc sống.' });
  }

  return { grid, arrows };
}

/**
 * Cơ sở dữ liệu luận giải Con Số Chủ Đạo (Life Path)
 */
export interface LifePathInterpretation {
  number: number;
  title: string;
  keyword: string;
  element: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  careerPaths: string[];
  loveAdvice: string;
  generalAdvice: string;
}

export const LIFE_PATH_DATA: Record<number, LifePathInterpretation> = {
  2: {
    number: 2,
    title: 'Sứ Giả Hòa Bình & Người Kết Nối',
    keyword: 'Hòa giải, Lắng nghe, Nhạy bén, Hợp tác',
    element: 'Thủy',
    traits: ['Nhẹ nhàng, tình cảm', 'Khéo léo trong giao tiếp', 'Giàu lòng trắc ẩn', 'Trực giác tốt'],
    strengths: ['Khả năng đàm phán và giải quyết mâu thuẫn tuyệt vời', 'Người bạn đồng hành trung thành, đáng tin cậy', 'Mắt thẩm mỹ và trực giác nghệ thuật cao'],
    weaknesses: ['Dễ bị chi phối bởi cảm xúc', 'Quá nhạy cảm với lời phê bình', 'Đôi khi thiếu tính quyết đoán cá nhân'],
    careerPaths: ['Nhà ngoại giao', 'Chuyên viên tư vấn tâm lý', 'Nghệ thuật & Thiết kế', 'Quan hệ công chúng (PR)', 'Nhân sự'],
    loveAdvice: 'Bạn là người chung thủy và hết lòng vì tình yêu. Hãy học cách bày tỏ mong muốn của mình thay vì luôn cam chịu nhường nhịn đối phương.',
    generalAdvice: 'Phát triển sự tự tin và lòng quả quyết, không để sự nhạy cảm làm lu mờ lý trí.',
  },
  3: {
    number: 3,
    title: 'Ngôi Sao Sáng Tạo & Người Truyền Cảm Hứng',
    keyword: 'Sáng tạo, Hoạt ngôn, Lạc quan, Tỏa sáng',
    element: 'Hỏa',
    traits: ['Hài hước, năng động', 'Khả năng biểu đạt xuất chúng', 'Tâm hồn nghệ sĩ', 'Yêu tự do'],
    strengths: ['Truyền năng lượng tích cực cho mọi người', 'Tư duy nhanh nhạy, nảy số ý tưởng liên tục', 'Dễ dàng hòa nhập trong mọi đám đông'],
    weaknesses: ['Dễ bị phân tán mục tiêu', 'Cả thèm chóng chán', 'Đôi khi lời nói thiếu suy nghĩ chín chắn'],
    careerPaths: ['Marketing & Truyền thông', 'MC / Diễn giả', 'Nhà văn / Biên kịch', 'Nghệ sĩ biểu diễn', 'Kinh doanh sáng tạo'],
    loveAdvice: 'Bạn mang lại sự vui vẻ cho nửa kia nhưng cần tạo sự an tâm và chiều sâu cảm xúc thay vì chỉ dừng lại ở những cuộc vui bề nổi.',
    generalAdvice: 'Tập trung rèn luyện tính kiên trì và kỷ luật để biến những ý tưởng tuyệt vời thành kết quả thực tế.',
  },
  4: {
    number: 4,
    title: 'Bậc Thầy Xây Dựng & Người Kỷ Luật',
    keyword: 'Vững chãi, Thực tế, Nguyên tắc, Tận tụy',
    element: 'Thổ',
    traits: ['Chăm chỉ, đáng tin cậy', 'Tư duy logic', 'Coi trọng gia đình', 'Ngăn nắp chu toàn'],
    strengths: ['Khả năng tổ chức và hiện thực hóa kế hoạch hoàn hảo', 'Chịu được áp lực cao và có sức bền phi thường', 'Chữ Tín luôn đặt lên hàng đầu'],
    weaknesses: ['Khô khan, bảo thủ', 'Khó chấp nhận sự thay đổi đột ngột', 'Dễ làm việc quá sức (Workaholic)'],
    careerPaths: ['Kỹ sư / Kiến trúc sư', 'Quản lý vận hành', 'Tài chính - Kế toán', 'Luật sư / Thẩm phán', 'Chuyên gia IT'],
    loveAdvice: 'Tình yêu của bạn thể hiện qua hành động chăm lo thực tế. Hãy học cách nói những lời ngọt ngào và lãng mạn hơn để đối phương cảm nhận được tình cảm.',
    generalAdvice: 'Mở rộng góc nhìn linh hoạt, học cách thư giãn và tận hưởng cuộc sống bên ngoài công việc.',
  },
  5: {
    number: 5,
    title: 'Linh Hồn Tự Do & Nhà Thám Hiểm',
    keyword: 'Tự do, Đột phá, Phiêu lưu, Linh hoạt',
    element: 'Kim',
    traits: ['Phóng khoáng, tò mò', 'Không thích gò bó', 'Khả năng thích ứng siêu phàm', 'Đam mê khám phá'],
    strengths: ['Dám bứt phá khỏi vùng an toàn', 'Nhanh nhạy nắm bắt xu hướng mới', 'Khả năng xử lý khủng hoảng linh hoạt'],
    weaknesses: ['Thiếu kiên nhẫn', 'Sợ sự ràng buộc lâu dài', 'Dễ bốc đồng chi tiêu'],
    careerPaths: ['Du lịch / Khách sạn', 'Báo chí / Phóng viên', 'Khởi nghiệp công nghệ', 'Bán hàng (Sales)', 'Nhiếp ảnh gia'],
    loveAdvice: 'Bạn cần một nửa kia tôn trọng không gian tự do cá nhân và cùng bạn chia sẻ niềm đam mê khám phá thế giới.',
    generalAdvice: 'Thiết lập những nguyên tắc cốt lõi cho bản thân để không bị lạc lối giữa những cám dỗ nhất thời.',
  },
  6: {
    number: 6,
    title: 'Trái Tim Yêu Thương & Người Nuôi Dưỡng',
    keyword: 'Bảo bọc, Trách nhiệm, Nhân ái, Thẩm mỹ',
    element: 'Thổ',
    traits: ['Giàu tình mẫu tử/phụ tử', 'Hy sinh vì người khác', 'Gu thẩm mỹ tinh tế', 'Yêu mái ấm gia đình'],
    strengths: ['Khả năng chăm sóc và chữa lành tâm hồn người khác', 'Tạo dựng không gian ấm cúng, hạnh phúc', 'Tinh thần trách nhiệm cao độ'],
    weaknesses: ['Hay lo lắng thái quá', 'Có xu hướng kiểm soát vì muốn tốt cho người khác', 'Dễ bị lợi dụng lòng tốt'],
    careerPaths: ['Giáo dục / Đào tạo', 'Bác sĩ / Y tế', 'Thiết kế nội thất', 'Công tác xã hội', 'Quản lý nhân sự'],
    loveAdvice: 'Tình yêu của bạn vô cùng ấm áp và chân thành. Hãy để đối phương có không gian riêng và đừng gánh hết mọi lo toan về mình.',
    generalAdvice: 'Học cách yêu thương và chăm sóc chính bản thân mình trước khi trao đi tình cảm cho thế giới.',
  },
  7: {
    number: 7,
    title: 'Nhà Hiền Triết & Người Đi Tìm Chân Lý',
    keyword: 'Trực giác, Tri thức, Chiêm nghiệm, Độc lập',
    element: 'Mộc',
    traits: ['Thâm trầm, kín đáo', 'Tư duy phân tích sâu sắc', 'Đam mê triết học & tâm linh', 'Thích ở một mình'],
    strengths: ['Khả năng nghiên cứu và nhìn thấu bản chất vấn đề', 'Trực giác giác quan thứ 6 nhạy bén', 'Tự lập và không dựa dẫm'],
    weaknesses: ['Dễ cô lập bản thân', 'Khó tin tưởng người khác', 'Đôi khi quá đa nghi và lạnh lùng'],
    careerPaths: ['Nhà khoa học / Nghiên cứu', 'Chuyên gia phân tích dữ liệu', 'Triết học / Tôn giáo', 'Lập trình viên cao cấp', 'Chiến lược gia'],
    loveAdvice: 'Bạn cần một người thấu hiểu chiều sâu tâm hồn và tôn trọng khoảng lặng riêng tư của bạn mà không gặng hỏi.',
    generalAdvice: 'Mở lòng chia sẻ những chiêm nghiệm của bạn với cộng đồng, học cách kết nối và tin tưởng người xung quanh.',
  },
  8: {
    number: 8,
    title: 'Nhà Lãnh Đạo Quyền Uy & Bậc Thầy Tài Chính',
    keyword: 'Quyền lực, Thành công, Tài chính, Ý chí',
    element: 'Kim',
    traits: ['Bản lĩnh, tham vọng', 'Tầm nhìn chiến lược', 'Quyết đoán mạnh mẽ', 'Thực tế sòng phẳng'],
    strengths: ['Khả năng quản lý tài chính và điều hành xuất chúng', 'Biến nghịch cảnh thành cơ hội làm giàu', 'Khí chất thủ lĩnh bẩm sinh'],
    weaknesses: ['Độc đoán, gia trưởng', 'Quá chú trọng vật chất', 'Khó bày tỏ cảm xúc yếu mềm'],
    careerPaths: ['Doanh nhân / CEO', 'Giám đốc tài chính (CFO)', 'Đầu tư bất động sản', 'Ngân hàng / Chứng khoán', 'Luật sư thương mại'],
    loveAdvice: 'Bạn muốn bảo bọc người yêu bằng vật chất đầy đủ. Hãy nhớ rằng sự hiện diện và lắng nghe chân thành quý giá hơn bất kỳ món quà đắt tiền nào.',
    generalAdvice: 'Cân bằng giữa tiền tài và đời sống tinh thần; sử dụng quyền lực và tài năng để phụng sự cộng đồng.',
  },
  9: {
    number: 9,
    title: 'Nhà Nhân Đạo & Người Phụng Sự Lý Tưởng',
    keyword: 'Vị tha, Nhân đạo, Lý tưởng, Trách nhiệm',
    element: 'Hỏa',
    traits: ['Hào sảng, bao dung', 'Lý tưởng sống cao đẹp', 'Trực giác tinh tế', 'Có sức hút tự nhiên'],
    strengths: ['Khát vọng cống hiến vì một thế giới tốt đẹp hơn', 'Khả năng truyền cảm hứng vĩ đại', 'Sống chân thành và không toan tính'],
    weaknesses: ['Dễ mơ mộng viển vông', 'Khó buông bỏ quá khứ', 'Đôi khi áp đặt tiêu chuẩn đạo đức lên người khác'],
    careerPaths: ['Lãnh đạo tổ chức phi chính phủ (NGO)', 'Giáo sư / Nhà tư tưởng', 'Hoạt động nghệ thuật nhân văn', 'Y tế cộng đồng', 'Chính trị gia'],
    loveAdvice: 'Bạn rất lãng mạn và yêu bằng cả trái tim. Hãy học cách chấp nhận những khuyết điểm thực tế của người mình yêu.',
    generalAdvice: 'Học cách buông bỏ những điều không thể thay đổi trong quá khứ để tập trung trọn vẹn cho hiện tại.',
  },
  11: {
    number: 11,
    title: 'Bậc Thầy Khai Sáng & Sứ Giả Trực Giác (Master Number)',
    keyword: 'Tâm linh, Khai sáng, Trực giác siêu nhiên, Sứ mệnh',
    element: 'Thủy',
    traits: ['Giác quan thứ 6 cực nhạy', 'Tâm hồn thuần khiết', 'Sống vì lý tưởng cao cả', 'Khả năng thấu cảm siêu phàm'],
    strengths: ['Cầu nối tâm linh và tinh thần cho người khác', 'Khả năng nhìn thấu tương lai và bản chất con người', 'Sức hút tâm linh kỳ diệu'],
    weaknesses: ['Dễ bị quá tải cảm xúc', 'Căng thẳng thần kinh', 'Nếu sống tiêu cực sẽ rơi về con số 2 đơn thuần'],
    careerPaths: ['Nhà trị liệu tâm lý / Chữa lành', 'Lãnh đạo tinh thần', 'Nhà phát minh đột phá', 'Nghệ thuật đỉnh cao', 'Ngoại cảm / Phong thủy'],
    loveAdvice: 'Bạn tìm kiếm tình yêu tri kỷ ở tầng nhận thức tâm hồn. Hãy tìm người cùng tần số rung động tinh thần.',
    generalAdvice: 'Học cách thanh lọc năng lượng tiêu cực, thiền định và giữ cho tâm trí luôn an định.',
  },
  22: {
    number: 22,
    title: 'Bậc Thầy Kiến Tạo Thế Giới (Master Builder)',
    keyword: 'Kiến tạo vĩ đại, Thực tiễn vô song, Tầm nhìn toàn cầu',
    element: 'Thổ',
    traits: ['Tầm nhìn phi thường', 'Kỷ luật thép', 'Năng lực biến điều không thể thành có thể', 'Sức mạnh kiến thiết'],
    strengths: ['Hiện thực hóa những dự án vĩ mô mang lại lợi ích cho nhân loại', 'Sự kết hợp hoàn hảo giữa trực giác số 11 và thực tế số 4'],
    weaknesses: ['Áp lực trách nhiệm khổng lồ', 'Dễ kiệt sức', 'Khó tính và đòi hỏi quá cao ở người khác'],
    careerPaths: ['Kiến trúc sư trưởng công trình thế kỷ', 'Chính khách tầm cỡ thế giới', 'Nhà sáng lập tập đoàn đa quốc gia', 'Đại diện ngoại giao cấp cao'],
    loveAdvice: 'Bạn có thể bị công việc cuốn đi. Hãy luôn dành những khoảng thời gian chất lượng trọn vẹn cho người bạn đời.',
    generalAdvice: 'Luôn giữ vững đạo đức và lý tưởng nhân văn trong mọi công trình kiến tạo lớn lao của cuộc đời.',
  },
  33: {
    number: 33,
    title: 'Bậc Thầy Chữa Lành & Tình Yêu Vô Điều Kiện (Master Teacher)',
    keyword: 'Đại từ bi, Chữa lành nhân loại, Trí tuệ giác ngộ',
    element: 'Hỏa',
    traits: ['Lòng trắc ẩn vô bờ bến', 'Trí tuệ minh triết', 'Tình yêu thương không biên giới', 'Khí chất thánh thiện'],
    strengths: ['Khả năng nâng đỡ và xoa dịu nỗi đau khổ của muôn người', 'Ngọn hải đăng dẫn lối cho những mảnh đời lạc lối'],
    weaknesses: ['Dễ ôm đồm gánh nặng của cả thế gian', 'Dễ bị kiệt quệ năng lượng'],
    careerPaths: ['Bậc thầy giáo dục nhân cách', 'Nhà chữa lành tâm linh', 'Lãnh đạo phong trào hòa bình quốc tế', 'Bác sĩ thiện nguyện'],
    loveAdvice: 'Tình yêu của bạn bao la như biển cả. Hãy nhớ rằng người thân yêu nhất bên cạnh bạn cũng cần được ưu tiên chăm sóc.',
    generalAdvice: 'Bảo vệ nguồn năng lượng của bản thân để tiếp tục sứ mệnh lan tỏa ánh sáng yêu thương cho đời.',
  },
};

/**
 * 8. Thuật toán Giải Mã Crush (Crush Decoder Engine)
 */
export interface CrushDecodeResult {
  lifePath: number;
  soulUrge: number;
  personality: number;
  crushType: string;
  secretFear: string;
  idealType: string;
  approachTips: string[];
  conversationTopics: string[];
  giftIdeas: string[];
  taboos: string[];
  compatibilityScore: number;
  goldenSecret: string;
}

export function decodeCrush(name: string, day: number, month: number, year: number): CrushDecodeResult {
  const lifePath = calculateLifePathNumber(day, month, year);
  const soulUrge = calculateSoulUrgeNumber(name);
  const personality = calculatePersonalityNumber(name);

  // Phân loại hình mẫu Crush theo Con số chủ đạo & Linh hồn
  const crushTypes: Record<number, { type: string; secretFear: string; idealType: string; tips: string[]; topics: string[]; gifts: string[]; taboos: string[]; golden: string }> = {
    2: {
      type: 'Người Nhẹ Nhàng, Giàu Tình Cảm & Thích Được Quan Tâm',
      secretFear: 'Sợ bị từ chối, sợ sự xung đột cãi vã và bị bỏ rơi trong cô độc.',
      idealType: 'Người tinh tế, biết lắng nghe, nói năng nhỏ nhẹ và mang lại cảm giác an toàn.',
      tips: [
        'Nhắn tin hỏi thăm ân cần, để ý những chi tiết nhỏ nhặt như sở thích ăn uống, thời tiết.',
        'Tạo cơ hội để cả hai có không gian riêng tư yên tĩnh trò chuyện tâm sự.',
        'Luôn lắng nghe chân thành khi crush chia sẻ chuyện buồn vui.'
      ],
      topics: ['Phim ảnh tình cảm, âm nhạc nhẹ nhàng', 'Kỷ niệm tuổi thơ, gia đình', 'Cảm xúc và suy nghĩ về cuộc sống'],
      gifts: ['Bình giữ nhiệt dễ thương, nến thơm dịu nhẹ', 'Sách tản văn chữa lành, album ảnh kỷ niệm'],
      taboos: ['Nói to, gắt gỏng hoặc tranh luận gay gắt', 'Đùa cợt thô thiển hoặc biến mất không lý do'],
      golden: 'Sự dịu dàng và kiên nhẫn bền bỉ chính là chìa khóa mở toang cánh cửa trái tim crush số 2.'
    },
    3: {
      type: 'Ngôi Sao Năng Động, Hài Hước & Thích Tỏa Sáng',
      secretFear: 'Sợ sự nhàm chán, sợ bị xem thường hoặc không được ai chú ý lắng nghe.',
      idealType: 'Người thông minh, biết hưởng ứng những câu đùa dí dỏm và luôn vui vẻ tràn đầy năng lượng.',
      tips: [
        'Thả tim, tương tác nhiệt tình với các story/bài đăng hài hước của crush.',
        'Khen ngợi phong cách ăn mặc hoặc sự duyên dáng của crush một cách chân thành.',
        'Rủ crush đi cà phê quán mới, đi xem ca nhạc hoặc các sự kiện vui nhộn.'
      ],
      topics: ['Các trend hài hước trên mạng xã hội', 'Âm nhạc, thời trang, du lịch', 'Những câu chuyện tiếu lâm hằng ngày'],
      gifts: ['Vé xem concert/hài kịch', 'Phụ kiện thời trang độc lạ, nổi bật'],
      taboos: ['Bắt crush phải im lặng hoặc tỏ vẻ mặt lạnh lùng, phán xét', 'Phàn nàn tiêu cực quá nhiều'],
      golden: 'Hãy là khán giả trung thành và người bạn đồng hành vui tính nhất của crush số 3!'
    },
    4: {
      type: 'Người Thực Tế, Nghiêm Túc & Rất Chu Toàn',
      secretFear: 'Sợ sự bất ổn định, sợ những lời hứa suông và người sống bừa bãi thiếu trách nhiệm.',
      idealType: 'Người đúng giờ, chân thật, có công việc và mục tiêu sống rõ ràng, đáng tin cậy.',
      tips: [
        'Luôn đúng giờ trong mọi cuộc hẹn và giữ đúng mọi lời đã hứa.',
        'Thể hiện bạn là người có kế hoạch tương lai và tự lập trong cuộc sống.',
        'Giúp đỡ crush bằng những hành động thực tế thiết thực thay vì chỉ nói lời hoa mỹ.'
      ],
      topics: ['Công việc, học tập, định hướng nghề nghiệp', 'Ẩm thực truyền thống, công nghệ hữu ích', 'Tài chính và quản lý cuộc sống'],
      gifts: ['Sổ tay bìa da cao cấp, bút ký', 'Dụng cụ làm việc tiện ích, đồ gia dụng thông minh'],
      taboos: ['Trễ hẹn, thất hứa hoặc thay đổi kế hoạch vào phút chót', 'Ăn mặc luộm thuộm hoặc tỏ ra bất cần'],
      golden: 'Chân thành, đúng giờ và hành động thực tế là con đường ngắn nhất chinh phục crush số 4.'
    },
    5: {
      type: 'Cánh Chim Tự Do, Thích Trải Nghiệm & Khó Nắm Bắt',
      secretFear: 'Sợ bị kiểm soát, gò bó, sợ một mối quan hệ đơn điệu tẻ nhạt.',
      idealType: 'Người phóng khoáng, có cá tính riêng, không bám dính và sẵn sàng cùng crush xách balo lên đi.',
      tips: [
        'Rủ crush tham gia các hoạt động ngoài trời, phượt ngắn ngày hoặc khám phá địa điểm mới lạ.',
        'Tạo cho crush cảm giác thoải mái, không tra hỏi "đang ở đâu, làm gì với ai".',
        'Tỏ ra có cuộc sống riêng phong phú, hấp dẫn để kích thích sự tò mò của crush.'
      ],
      topics: ['Các chuyến du lịch mạo hiểm, khám phá văn hóa', 'Thể thao, trò chơi cảm giác mạnh', 'Những trào lưu mới lạ trên thế giới'],
      gifts: ['Balo du lịch, phụ kiện phượt', 'Kính râm thời thượng, tai nghe không dây'],
      taboos: ['Ghen tuông vô cớ hoặc đòi hỏi cam kết quá sớm', 'Bắt crush ngồi yên một chỗ làm việc đơn điệu'],
      golden: 'Đừng cố nhốt crush số 5 vào lồng; hãy là bầu trời tự do để crush muốn bay về bên bạn!'
    },
    6: {
      type: 'Mẫu Người Gia Đình, Ấm Áp & Thích Chăm Sóc',
      secretFear: 'Sợ sự chia rẽ trong gia đình, sợ không được công nhận sự hy sinh của mình.',
      idealType: 'Người biết trân trọng gia đình, hiếu thảo, sống tình cảm và biết ơn.',
      tips: [
        'Khen ngợi sự chu đáo và tài nấu nướng/chăm sóc của crush.',
        'Thể hiện bạn là người hiếu thảo với cha mẹ và yêu quý trẻ em/thú cưng.',
        'Tặng quà mang tính chăm sóc sức khỏe như trà thảo mộc, áo ấm.'
      ],
      topics: ['Nấu ăn, trang trí nhà cửa', 'Chuyện gia đình, thú cưng', 'Sức khỏe và chăm sóc bản thân'],
      gifts: ['Bộ trà thảo mộc organic, cây cảnh để bàn', 'Khăn quàng ấm áp, đồ decor phòng ngủ xinh xắn'],
      taboos: ['Vô ơn, coi thường lòng tốt của crush', 'Nói xấu gia đình hoặc người thân của nhau'],
      golden: 'Một bữa ăn ấm cúng và sự trân trọng chân thành sẽ làm tan chảy trái tim crush số 6.'
    },
    7: {
      type: 'Người Kín Đáo, Sâu Sắc & Mang Vẻ Bí Ẩn',
      secretFear: 'Sợ bị xâm phạm quyền riêng tư, sợ sự nông cạn và lừa dối.',
      idealType: 'Người có chiều sâu tri thức, tinh tế, biết giữ khoảng cách vừa đủ và chân thật.',
      tips: [
        'Không vồ vập tấn công; hãy bắt đầu từ việc làm bạn tri thức, trao đổi sách vở/chuyên môn.',
        'Tôn trọng những khoảng lặng riêng tư của crush, không gặng hỏi khi crush trầm ngâm.',
        'Thể hiện tư duy sắc sảo và sự hiểu biết rộng qua các cuộc trò chuyện sâu.'
      ],
      topics: ['Khoa học, triết học, tâm lý học, vũ trụ', 'Sách hay, các hiện tượng bí ẩn', 'Chiêm nghiệm sâu sắc về cuộc đời'],
      gifts: ['Sách chuyên khảo hay, bút viết thanh lịch', 'Bộ cờ chiến thuật, vật phẩm phong thủy đá tự nhiên'],
      taboos: ['Nói chuyện nông cạn, buôn chuyện thị phi phù phiếm', 'Ép crush đi tiệc tùng đông người ồn ào'],
      golden: 'Hãy là người bạn tâm giao có tri thức; crush số 7 chỉ mở lòng với người thấu hiểu được chiều sâu của họ.'
    },
    8: {
      type: 'Người Bản Lĩnh, Tham Vọng & Khí Chất Lãnh Đạo',
      secretFear: 'Sợ thất bại, sợ bị yếu thế hoặc phụ thuộc vào người khác.',
      idealType: 'Người tự tin, độc lập tài chính, có phong cách chỉn chu và cùng chí hướng phấn đấu.',
      tips: [
        'Ăn mặc gọn gàng, toát lên sự tự tin và chuyên nghiệp khi gặp gỡ.',
        'Hỏi xin ý kiến hoặc lời khuyên của crush về công việc, kinh doanh để crush thể hiện năng lực.',
        'Sòng phẳng trong tiền bạc khi đi ăn uống, không tỏ ra dựa dẫm.'
      ],
      topics: ['Kinh doanh, đầu tư, khởi nghiệp', 'Chiến lược phát triển bản thân, công nghệ mới', 'Thời trang hàng hiệu, lối sống thành đạt'],
      gifts: ['Ví da cao cấp, nước hoa chính hãng mang mùi hương sang trọng', 'Phụ kiện công nghệ cao cấp'],
      taboos: ['Tỏ ra yếu đuối, lười biếng, thiếu chí tiến thủ', 'Thách thức quyền lực hoặc xúc phạm lòng tự tôn của crush'],
      golden: 'Sự tự tin, bản lĩnh và độc lập của bạn chính là điểm thu hút mãnh liệt nhất đối với crush số 8.'
    },
    9: {
      type: 'Người Giàu Lòng Nhân Ái, Hào Sảng & Sống Vì Lý Tưởng',
      secretFear: 'Sợ sự ích kỷ, bất công và đánh mất niềm tin vào con người.',
      idealType: 'Người có tấm lòng lương thiện, vị tha, biết giúp đỡ cộng đồng và có tâm hồn lãng mạn.',
      tips: [
        'Rủ crush cùng tham gia các hoạt động thiện nguyện, bảo vệ môi trường hoặc giúp đỡ động vật.',
        'Thể hiện sự bao dung và cái nhìn tích cực, nhân văn trước các vấn đề xã hội.',
        'Lắng nghe những ước mơ và lý tưởng cao đẹp của crush với sự đồng cảm tuyệt đối.'
      ],
      topics: ['Hoạt động thiện nguyện, nghệ thuật nhân văn', 'Bảo vệ môi trường, văn hóa thế giới', 'Những ước mơ lớn thay đổi cuộc sống'],
      gifts: ['Sản phẩm thủ công bảo vệ môi trường (Eco-friendly)', 'Tranh vẽ nghệ thuật, vé xem triển lãm văn hóa'],
      taboos: ['Kỳ thị, ích kỷ, keo kiệt hoặc toan tính vụ lợi nhỏ nhen', 'Cười nhạo ước mơ và lý tưởng của crush'],
      golden: 'Chạm vào trái tim nhân hậu của crush số 9 bằng những hành động tử tế và lòng trắc ẩn thuần khiết.'
    },
    11: {
      type: 'Tâm Hồn Tinh Khiết, Trực Giác Kỳ Diệu & Nhạy Cảm Sâu Sắc',
      secretFear: 'Sợ sự giả dối, sợ bị ô uế tâm hồn bởi những toan tính tầm thường.',
      idealType: 'Người có tần số rung động thanh sạch, sống chân thật và đồng điệu về mặt tâm linh.',
      tips: [
        'Giao tiếp bằng ánh mắt chân thành và sự thấu cảm không cần quá nhiều lời.',
        'Chia sẻ những trải nghiệm tâm linh, trực giác hoặc nghệ thuật tinh tế.',
        'Bảo vệ crush trước những môi trường ồn ào độc hại.'
      ],
      topics: ['Tâm linh, năng lượng vũ trụ, trực giác', 'Âm nhạc thiền định, nghệ thuật trừu tượng'],
      gifts: ['Vòng tay đá phong thủy năng lượng, chuông gió', 'Tinh dầu thiên nhiên nguyên chất'],
      taboos: ['Giả tạo, đóng kịch (crush 11 nhìn thấu ngay lập tức)', 'Sống thực dụng đến mức tàn nhẫn'],
      golden: 'Hãy đến với crush số 11 bằng sự chân thật 100%; trực giác của họ sẽ nhận ra tình cảm thuần khiết của bạn.'
    },
    22: {
      type: 'Bậc Thầy Tầm Nhìn, Vừa Thực Tế Vừa Vĩ Đại',
      secretFear: 'Sợ lãng phí thời gian và tiềm năng to lớn của bản thân.',
      idealType: 'Người vừa là chỗ dựa tinh thần vững chắc vừa là cộng sự tài năng sát cánh.',
      tips: [
        'Ủng hộ các kế hoạch lớn của crush bằng sự kiên định và thấu hiểu.',
        'Giúp crush cân bằng cuộc sống, nhắc crush nghỉ ngơi khi làm việc quá sức.'
      ],
      topics: ['Dự án lớn, công trình, tương lai xã hội', 'Quy hoạch tài chính, triết lý lãnh đạo'],
      gifts: ['Đồng hồ đeo tay thanh lịch, bút ký khắc tên', 'Tài liệu nghiên cứu chuyên sâu'],
      taboos: ['Cản trở mục tiêu lớn của crush', 'Tỏ ra nhỏ nhen, thiển cận'],
      golden: 'Là hậu phương vững chắc và người đồng hành xứng tầm của crush số 22.'
    },
    33: {
      type: 'Người Chữa Lành, Tình Cảm Vĩ Đại & Tận Tụy',
      secretFear: 'Sợ không đủ sức gánh vác nỗi đau của những người xung quanh.',
      idealType: 'Người biết sẻ chia gánh nặng, có lòng từ bi và biết xoa dịu crush khi mệt mỏi.',
      tips: [
        'Chăm sóc crush từ những điều nhỏ nhất để bù đắp sự hy sinh của họ.',
        'Tạo cho crush một nơi chốn bình yên tuyệt đối để quay về.'
      ],
      topics: ['Chữa lành, tình thương, giáo dục nhân cách', 'Hạnh phúc gia đình và sự bình an nội tâm'],
      gifts: ['Khóa học thiền, chuyến nghỉ dưỡng thanh tịnh', 'Món quà tự tay bạn làm với tất cả tình yêu'],
      taboos: ['Lợi dụng lòng tốt hoặc phụ bạc sự hy sinh của crush'],
      golden: 'Hãy là bến đỗ bình yên nhất che chở cho trái tim luôn vì người khác của crush số 33.'
    }
  };

  const defaultData = crushTypes[lifePath] || crushTypes[2];

  // Tính điểm hòa hợp cơ bản dựa trên nạp âm & số
  const compatibilityScore = 75 + ((day * 7 + month * 13) % 23);

  return {
    lifePath,
    soulUrge,
    personality,
    crushType: defaultData.type,
    secretFear: defaultData.secretFear,
    idealType: defaultData.idealType,
    approachTips: defaultData.tips,
    conversationTopics: defaultData.topics,
    giftIdeas: defaultData.gifts,
    taboos: defaultData.taboos,
    compatibilityScore,
    goldenSecret: defaultData.golden,
  };
}

/**
 * 9. Thuật toán Tra Cứu Hòa Hợp Cặp Đôi (Couple Compatibility Analysis)
 */
export interface CoupleCompatibilityResult {
  person1: { name: string; lifePath: number; soulUrge: number; destiny: number };
  person2: { name: string; lifePath: number; soulUrge: number; destiny: number };
  totalScore: number; // 0 - 100%
  rating: 'Tuyệt Vời (Tri Kỷ)' | 'Rất Tốt (Hòa Hợp Cao)' | 'Tiềm Năng (Bù Trừ Tốt)' | 'Thử Thách (Cần Kiên Trì)';
  lifePathMatch: { score: number; title: string; analysis: string };
  soulMatch: { score: number; title: string; analysis: string };
  destinyMatch: { score: number; title: string; analysis: string };
  strengths: string[];
  challenges: string[];
  secretToHappiness: string;
}

export function calculateCoupleCompatibility(
  name1: string, day1: number, month1: number, year1: number,
  name2: string, day2: number, month2: number, year2: number
): CoupleCompatibilityResult {
  const lp1 = calculateLifePathNumber(day1, month1, year1);
  const su1 = calculateSoulUrgeNumber(name1);
  const de1 = calculateDestinyNumber(name1);

  const lp2 = calculateLifePathNumber(day2, month2, year2);
  const su2 = calculateSoulUrgeNumber(name2);
  const de2 = calculateDestinyNumber(name2);

  // Bảng ma trận hòa hợp Life Path
  // Các cặp tự nhiên hòa hợp cao:
  // 1 - 3 - 5 - 7 (Trí tuệ & Tự do)
  // 2 - 4 - 8 (Thực tế & Tổ chức)
  // 3 - 6 - 9 (Sáng tạo & Nhân văn)
  // Master numbers 11, 22, 33 có độ thấu cảm cao

  let lpScore = 75;
  let lpTitle = 'Tương Phối Hài Hòa';
  let lpAnalysis = `Sự kết hợp giữa Con số chủ đạo ${lp1} và ${lp2} mang lại sự bổ trợ tự nhiên về phong cách sống và tư duy.`;

  if (lp1 === lp2) {
    lpScore = 92;
    lpTitle = 'Tâm Đầu Ý Hợp (Cùng Tần Số)';
    lpAnalysis = `Cả hai đều mang Con số chủ đạo ${lp1}, thấu hiểu sâu sắc suy nghĩ, ưu điểm và cả những tật xấu của nhau mà không cần giải thích nhiều.`;
  } else if (
    ([1, 5, 7].includes(lp1) && [1, 5, 7].includes(lp2)) ||
    ([2, 4, 8].includes(lp1) && [2, 4, 8].includes(lp2)) ||
    ([3, 6, 9].includes(lp1) && [3, 6, 9].includes(lp2))
  ) {
    lpScore = 95;
    lpTitle = 'Cặp Đôi Trời Sinh (Tam Hợp Pitago)';
    lpAnalysis = `Bộ đôi ${lp1} và ${lp2} thuộc cùng nhóm năng lượng bổ trợ mạnh mẽ, dễ dàng tìm thấy tiếng nói chung trong cả công việc lẫn tình cảm.`;
  } else if ((lp1 === 2 && lp2 === 8) || (lp1 === 8 && lp2 === 2) || (lp1 === 4 && lp2 === 6) || (lp1 === 6 && lp2 === 4)) {
    lpScore = 90;
    lpTitle = 'Bù Trừ Hoàn Hảo (Âm Dương Hòa Hợp)';
    lpAnalysis = `Một người mang tính cách mạnh mẽ, quyết đoán kết hợp cùng một người dịu dàng, khéo léo tạo nên tổ ấm cân bằng tuyệt mỹ.`;
  } else if ((lp1 === 4 && lp2 === 5) || (lp1 === 5 && lp2 === 4) || (lp1 === 1 && lp2 === 2) || (lp1 === 2 && lp2 === 1)) {
    lpScore = 68;
    lpTitle = 'Cặp Đôi Bù Trừ (Thử Thách Tính Cách)';
    lpAnalysis = `Một người yêu thích sự tự do bay nhảy còn một người coi trọng quy củ, trật tự. Cần sự bao dung và thấu hiểu để biến điểm khác biệt thành sức hút bù trừ.`;
  }

  // Soul Urge Match (Đồng điệu tâm hồn)
  let suScore = 80;
  let suTitle = 'Tâm Hồn Đồng Điệu';
  let suAnalysis = `Chỉ số linh hồn ${su1} và ${su2} cho thấy cả hai có sự gắn kết cảm xúc tốt và trân trọng những giá trị sâu kín của đối phương.`;

  if (su1 === su2) {
    suScore = 96;
    suTitle = 'Tri Kỷ Tâm Hồn';
    suAnalysis = `Khao khát nội tâm của cả hai hoàn toàn trùng khớp, luôn biết cách làm cho nhau cảm thấy hạnh phúc và bình yên.`;
  } else if (Math.abs(su1 - su2) % 3 === 0) {
    suScore = 88;
    suTitle = 'Hòa Hợp Cảm Xúc';
    suAnalysis = `Hai bạn dễ dàng chia sẻ những tâm tư thầm kín và cảm nhận được sự ấm áp khi ở cạnh nhau.`;
  }

  // Destiny Match (Sứ mệnh tương hỗ)
  let deScore = 78;
  let deTitle = 'Đồng Hành Cùng Phát Triển';
  let deAnalysis = `Sứ mệnh ${de1} và ${de2} hỗ trợ nhau trong việc xây dựng sự nghiệp và thực hiện các mục tiêu lớn của cuộc đời.`;

  const totalScore = Math.round((lpScore * 0.45) + (suScore * 0.35) + (deScore * 0.20));

  let rating: 'Tuyệt Vời (Tri Kỷ)' | 'Rất Tốt (Hòa Hợp Cao)' | 'Tiềm Năng (Bù Trừ Tốt)' | 'Thử Thách (Cần Kiên Trì)' = 'Rất Tốt (Hòa Hợp Cao)';
  if (totalScore >= 90) rating = 'Tuyệt Vời (Tri Kỷ)';
  else if (totalScore >= 78) rating = 'Rất Tốt (Hòa Hợp Cao)';
  else if (totalScore >= 68) rating = 'Tiềm Năng (Bù Trừ Tốt)';
  else rating = 'Thử Thách (Cần Kiên Trì)';

  const strengths = [
    `Khả năng thấu hiểu và tôn trọng thế giới quan của nhau (Điểm hòa hợp: ${totalScore}%).`,
    `Tạo động lực cho đối phương hoàn thiện bản thân và phát triển sự nghiệp.`,
    `Có sự kết hợp hài hòa giữa lý trí và cảm xúc, cùng nhau vượt qua biến cố.`,
  ];

  const challenges = [
    `Đôi khi bất đồng trong cách thể hiện tình cảm (một người thích hành động thực tế, một người thích lời nói ngọt ngào).`,
    `Cần lắng nghe nhiều hơn khi xuất hiện áp lực từ công việc hoặc tài chính bên ngoài.`,
  ];

  const secretToHappiness = totalScore >= 85
    ? 'Duy trì sự chia sẻ cởi mở hàng ngày và không ngừng tạo ra những kỷ niệm lãng mạn mới cùng nhau.'
    : 'Học cách chấp nhận sự khác biệt của đối phương như một nét quyến rũ riêng biệt, tôn trọng không gian cá nhân của nhau.';

  return {
    person1: { name: name1, lifePath: lp1, soulUrge: su1, destiny: de1 },
    person2: { name: name2, lifePath: lp2, soulUrge: su2, destiny: de2 },
    totalScore,
    rating,
    lifePathMatch: { score: lpScore, title: lpTitle, analysis: lpAnalysis },
    soulMatch: { score: suScore, title: suTitle, analysis: suAnalysis },
    destinyMatch: { score: deScore, title: deTitle, analysis: deAnalysis },
    strengths,
    challenges,
    secretToHappiness,
  };
}
