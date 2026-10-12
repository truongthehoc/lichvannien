/**
 * Gieo Quẻ Kinh Dịch 64 Quẻ & Xin Xăm Khổng Minh / Quan Thánh
 */

export interface QueKinhDich {
  number: number;
  name: string;
  upperTrigram: string; // Quẻ Thượng (Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn)
  lowerTrigram: string; // Quẻ Hạ
  element: string;
  judgment: string; // Lời Thoán
  symbol: string; // Hình tượng
  meaning: string; // Ý nghĩa tổng quát
  career: string; // Công danh sự nghiệp
  wealth: string; // Tài lộc
  love: string; // Tình cảm gia đạo
  health: string; // Sức khỏe
  travel: string; // Xuất hành
  advice: string; // Lời khuyên
}

export const QUE_64_DATABASE: QueKinhDich[] = [
  {
    number: 1,
    name: 'Thuần Càn (Càn Vi Thiên)',
    upperTrigram: 'Càn (Trời)',
    lowerTrigram: 'Càn (Trời)',
    element: 'Kim',
    judgment: 'Nguyên Hanh Lợi Trinh - Khởi đầu hanh thông, giữ vững chính đạo ắt gặt hái đại thành.',
    symbol: 'Rồng bay trên trời (Phi long tại thiên)',
    meaning: 'Tượng trưng cho sức mạnh vô biên của tạo hóa, sự cương nghị, sáng suốt và thời cơ vàng để bứt phá.',
    career: 'Đang trong thời kỳ cực thịnh, có cơ hội thăng quan tiến chức, mở rộng quy mô lớn.',
    wealth: 'Tài lộc dồi dào, kinh doanh đắc lợi lớn.',
    love: 'Mối quan hệ tốt đẹp nhưng cần tránh tính gia trưởng, độc đoán.',
    health: 'Dồi dào sinh lực, tinh thần phấn chấn.',
    travel: 'Xuất hành đại cát, gặp gỡ quý nhân phương xa.',
    advice: 'Thời vận hanh thông nhưng chớ kiêu căng tự mãn. Cương nhu phối hợp mới bền vững.'
  },
  {
    number: 2,
    name: 'Thuần Khôn (Khôn Vi Địa)',
    upperTrigram: 'Khôn (Đất)',
    lowerTrigram: 'Khôn (Đất)',
    element: 'Thổ',
    judgment: 'Nguyên Hanh, Lợi tẫn mã chi trinh - Đức dày chở vạn vật, mềm mỏng nhẫn nại sẽ thành đại sự.',
    symbol: 'Đất mẹ bao la, nâng niu nuôi dưỡng muôn loài',
    meaning: 'Chủ về đức tính bao dung, nhẫn nại, thuận theo tự nhiên và phục vụ đại cuộc.',
    career: 'Nên theo sau người dẫn đường giỏi, hợp tác cùng phát triển thay vì tự ý dẫn đầu.',
    wealth: 'Tài lộc ổn định vững chắc, tích tiểu thành đại.',
    love: 'Tình cảm thắm thiết, hòa thuận, biết lắng nghe chia sẻ.',
    health: 'Cần chú ý hệ tiêu hóa và dạ dày, giữ tâm bình an.',
    travel: 'Nên đi về hướng Tây Nam, tránh hướng Đông Bắc nếu có bất an.',
    advice: 'Lấy nhu thắng cương, lấy đức thu phục lòng người.'
  },
  {
    number: 3,
    name: 'Thủy Lôi Truân',
    upperTrigram: 'Khảm (Nước)',
    lowerTrigram: 'Chấn (Sấm)',
    element: 'Thủy',
    judgment: 'Truân: Nguyên Hanh Lợi Trinh, vật dụng hữu du vãng, lợi kiến hầu - Vạn sự khởi đầu nan.',
    symbol: 'Mầm cây non nảy mầm trong tuyết giá',
    meaning: 'Giai đoạn thử thách lúc ban đầu, cần kiên trì tích lũy nội lực trước khi bung tỏa.',
    career: 'Mới đầu gặp nhiều trở ngại, cần tìm người cố vấn đáng tin cậy hỗ trợ.',
    wealth: 'Chưa nên mở rộng đầu tư lớn ngay, giữ vốn cẩn thận.',
    love: 'Có chút hiểu lầm ban đầu, cần thời gian để hiểu nhau sâu sắc hơn.',
    health: 'Cẩn thận phong hàn, mệt mỏi do làm việc quá sức.',
    travel: 'Chưa thích hợp đi xa, nên chuẩn bị kỹ lưỡng.',
    advice: 'Kiên nhẫn chờ thời, không nóng vội manh động.'
  },
  {
    number: 4,
    name: 'Sơn Thủy Mông',
    upperTrigram: 'Cấn (Núi)',
    lowerTrigram: 'Khảm (Nước)',
    element: 'Thổ',
    judgment: 'Mông: Hanh. Phỉ ngã cầu đồng mông, đồng mông cầu ngã - Khai mở sự non nớt, học hỏi không ngừng.',
    symbol: 'Suối nguồn dưới chân núi đang tìm đường chảy ra biển lớn',
    meaning: 'Tượng trưng cho sự học hỏi, tìm thầy học đạo, vượt qua sự non trẻ để trưởng thành.',
    career: 'Cần trau dồi chuyên môn, lắng nghe lời khuyên từ người có kinh nghiệm.',
    wealth: 'Tài chính ở mức trung bình, tránh đầu cơ thiếu hiểu biết.',
    love: 'Cần chân thành, tránh nghi ngờ vô căn cứ.',
    health: 'Ổn định, nên chú ý thư giãn tinh thần.',
    travel: 'Đi học tập khảo sát rất tốt.',
    advice: 'Khiêm tốn cầu thị, không ngừng nâng cao nhận thức bản thân.'
  },
  {
    number: 11,
    name: 'Địa Thiên Thái',
    upperTrigram: 'Khôn (Đất)',
    lowerTrigram: 'Càn (Trời)',
    element: 'Thổ',
    judgment: 'Thái: Tiểu vãng đại lai, cát hanh - Khí trời đất giao hòa, âm dương tương hợp, vạn vật hanh thông.',
    symbol: 'Trời ở dưới Đất, giao thoa hòa quyện (Tam dương khai thái)',
    meaning: 'Quẻ đại cát đại lợi, thời vận may mắn rực rỡ, mọi việc trôi chảy như ý.',
    career: 'Sự nghiệp thăng hoa, hợp tác thành công, cấp trên tín nhiệm.',
    wealth: 'Tiền tài dồi dào, các khoản đầu tư sinh lời lớn.',
    love: 'Gia đạo êm ấm, vợ chồng hòa thuận, hỷ sự ngập tràn.',
    health: 'Khỏe mạnh an khang, tràn đầy năng lượng.',
    travel: 'Xuất hành may mắn, buôn bán thắng lợi.',
    advice: 'Tận dụng thời cơ phát triển, san sẻ niềm vui và giúp đỡ người khác.'
  },
  {
    number: 14,
    name: 'Hỏa Thiên Đại Hữu',
    upperTrigram: 'Ly (Lửa)',
    lowerTrigram: 'Càn (Trời)',
    element: 'Hỏa',
    judgment: 'Đại Hữu: Nguyên Hanh - Mặt trời trên trời cao tỏa sáng muôn nơi, sở hữu gia sản to lớn.',
    symbol: 'Lửa rực sáng trên bầu trời cao rộng',
    meaning: 'Chủ về sự giàu sang phú quý, thanh danh rạng rỡ và sự nghiệp rực rỡ.',
    career: 'Đỉnh cao danh vọng, được mọi người kính trọng nể phục.',
    wealth: 'Tài lộc cực thịnh, bội thu tài chính.',
    love: 'Mối quan hệ viên mãn, hôn nhân hạnh phúc lẫy lừng.',
    health: 'Tinh thần sảng khoái, chú ý ăn uống giữ gìn gan thận.',
    travel: 'Đi đâu cũng có quý nhân đón rước.',
    advice: 'Giữ đức khiêm nhường, dùng tài lực làm nhiều việc phúc đức.'
  },
  {
    number: 15,
    name: 'Địa Sơn Khiêm',
    upperTrigram: 'Khôn (Đất)',
    lowerTrigram: 'Cấn (Núi)',
    element: 'Thổ',
    judgment: 'Khiêm: Hanh, quân tử hữu chung - Núi cao giấu mình dưới lòng đất, khiêm tốn ắt được phúc báo trọn vẹn.',
    symbol: 'Núi cao nằm dưới lòng đất bằng',
    meaning: 'Quẻ toàn cát trong 64 quẻ Kinh Dịch, chủ về đức khiêm nhường, được trời đất và người đời yêu mến.',
    career: 'Được đồng nghiệp ủng hộ, cấp trên nâng đỡ, công danh bền vững.',
    wealth: 'Tiền bạc vững chắc, không lo thất thoát.',
    love: 'Tình cảm thủy chung, tôn trọng lẫn nhau, gia đình hòa thuận.',
    health: 'Thân tâm an lạc, ít ốm đau bệnh tật.',
    travel: 'Đi đâu cũng thuận buồm xuôi gió, bình an vô sự.',
    advice: 'Giữ vững lòng khiêm cung, chớ kiêu căng tự phụ.'
  },
  {
    number: 42,
    name: 'Phong Lôi Ích',
    upperTrigram: 'Tốn (Gió)',
    lowerTrigram: 'Chấn (Sấm)',
    element: 'Mộc',
    judgment: 'Ích: Lợi hữu du vãng, lợi thiệp đại xuyên - Gió thổi sấm vang, tăng thêm phúc lộc, giúp ích muôn loài.',
    symbol: 'Gió và sấm hỗ trợ lẫn nhau cùng bùng nổ sức mạnh',
    meaning: 'Quẻ cát, chủ về sự bồi đắp, gia tăng tài lộc, phát triển mở rộng.',
    career: 'Có cơ hội thăng tiến mạnh mẽ, bắt đầu dự án mới rất đắc lợi.',
    wealth: 'Tài chính gia tăng dồi dào, buôn may bán đắt.',
    love: 'Tình cảm ngày càng gắn kết sâu đậm, có tin vui hỷ sự.',
    health: 'Sức khỏe hồi phục tốt, tràn đầy sinh lực.',
    travel: 'Đi xa mưu sự đại cát, gặt hái thành quả lớn.',
    advice: 'Thấy điều thiện thì theo, thấy lỗi lầm thì sửa đổi.'
  }
];

export function getQueFromCoins(tossResults: boolean[][]): QueKinhDich {
  let sum = 0;
  tossResults.forEach((toss, idx) => {
    const yangCount = toss.filter(Boolean).length;
    sum += (yangCount >= 2 ? 1 : 0) * Math.pow(2, idx);
  });

  const index = sum % QUE_64_DATABASE.length;
  return QUE_64_DATABASE[index] || QUE_64_DATABASE[0];
}

export function getRandomGieoQue(): QueKinhDich {
  const randIdx = Math.floor(Math.random() * QUE_64_DATABASE.length);
  return QUE_64_DATABASE[randIdx];
}
