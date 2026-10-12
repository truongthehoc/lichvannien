/**
 * Tính Cửu Diệu Niên Hạn, Hạn Niên, Tam Tai, Kim Lâu, Hoang Ốc và Hướng dẫn Cúng Dâng Sao Giải Hạn
 */

import { getCanChiYear } from './amlich';

export interface SaoDetail {
  name: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  type: 'Cát tinh (Rất tốt)' | 'Hung tinh (Xấu)' | 'Trung tính (Bình thường)';
  description: string;
  thoThoat: string;
  ngayCung: string;
  huongCung: string;
  soNen: number;
  baiViColor: string;
  baiViText: string;
  vanKhan: string;
}

export interface HanDetail {
  name: string;
  type: 'Đại hạn' | 'Tiểu hạn';
  description: string;
  loiKhuyen: string;
}

export interface KetQuaSaoHan {
  tuoiMu: number;
  namXem: number;
  canChiNamSinh: string;
  canChiNamXem: string;
  sao: SaoDetail;
  han: HanDetail;
  tamTai: {
    isTamTai: boolean;
    namTamTai: number; // 1: Năm đầu, 2: Năm giữa, 3: Năm cuối
    description: string;
  };
  kimLau: {
    isKimLau: boolean;
    type?: 'Kim Lâu Thân' | 'Kim Lâu Thê' | 'Kim Lâu Tử' | 'Kim Lâu Súc';
    description: string;
  };
  hoangOc: {
    isTot: boolean;
    name: string;
    description: string;
  };
  tongKet: string;
}

export const SAO_INFO_DICT: Record<string, SaoDetail> = {
  'Thái Dương': {
    name: 'Thái Dương',
    element: 'Hỏa',
    type: 'Cát tinh (Rất tốt)',
    description: 'Chủ về may mắn, công danh sự nghiệp hanh thông rực rỡ, kinh doanh buôn bán đại phát tài. Nam giới gặp sao này như rồng gặp mây, nữ giới cũng được hưởng nhiều hỷ khí.',
    thoThoat: 'Thái Dương chiếu mệnh năm nay / Tháng Mười, tháng Sáu tiền tài tràn trề',
    ngayCung: 'Ngày 27 âm lịch hàng tháng (từ 11h đến 13h trưa)',
    huongCung: 'Chính Đông',
    soNen: 12,
    baiViColor: 'Giấy màu vàng',
    baiViText: 'Nhật Cung Thái Dương Thiên Tử Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Con lạy chín phương Trời, mười phương Chư Phật. Con kính lạy Đức Nhật Cung Thái Dương Thiên Tử Tinh Quân. Tín chủ con cúi xin Ngài phù hộ độ trì cho gia đạo bình an, danh lộc rực rỡ, vạn sự hanh thông.'
  },
  'Thái Âm': {
    name: 'Thái Âm',
    element: 'Thủy',
    type: 'Cát tinh (Rất tốt)',
    description: 'Chủ về bất động sản, tài chính dồi dào, tình duyên như ý. Cực tốt vào tháng 9 âm lịch. Nữ giới gặp sao này gia đạo êm ấm, sinh nở thuận lợi.',
    thoThoat: 'Thái Âm rực rỡ cung hằng / Tháng Chín tiền tài công danh rạng ngời',
    ngayCung: 'Ngày 26 âm lịch hàng tháng (từ 19h đến 21h tối)',
    huongCung: 'Chính Tây',
    soNen: 7,
    baiViColor: 'Giấy màu vàng',
    baiViText: 'Nguyệt Cung Thái Âm Hoàng Hậu Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Nguyệt Cung Thái Âm Hoàng Hậu Tinh Quân. Cúi xin Ngài ban tài phát lộc, gia đình hòa thuận, công danh thăng tiến.'
  },
  'Mộc Đức': {
    name: 'Mộc Đức',
    element: 'Mộc',
    type: 'Cát tinh (Rất tốt)',
    description: 'Cát tinh mang lại sự an lành, may mắn, quý nhân nâng đỡ trong công việc học hành thi cử và hôn nhân gia đình.',
    thoThoat: 'Mộc Đức sao sáng bao la / Cửa nhà êm ấm muôn hoa tốt tươi',
    ngayCung: 'Ngày 25 âm lịch hàng tháng (từ 19h đến 21h tối)',
    huongCung: 'Chính Đông',
    soNen: 20,
    baiViColor: 'Giấy màu xanh',
    baiViText: 'Đông Phương Giáp Ất Mộc Đức Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Đông Phương Giáp Ất Mộc Đức Tinh Quân. Cúi xin Ngài chở che cho bản mệnh vạn sự như ý, tai qua nạn khỏi.'
  },
  'Vân Hớn': {
    name: 'Vân Hớn',
    element: 'Hỏa',
    type: 'Trung tính (Bình thường)',
    description: 'Chủ về sự bình bình, đề phòng khẩu thiệt thị phi, kiện tụng hoặc nóng nảy trong giao tiếp vào tháng 2 và tháng 8 âm lịch.',
    thoThoat: 'Vân Hớn sao ấy phải phòng / Tháng Hai tháng Tám khẩu xà thị phi',
    ngayCung: 'Ngày 29 âm lịch hàng tháng (từ 21h đến 23h đêm)',
    huongCung: 'Chính Nam',
    soNen: 15,
    baiViColor: 'Giấy màu đỏ',
    baiViText: 'Nam Phương Bính Đinh Hỏa Đức Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Nam Phương Bính Đinh Hỏa Đức Tinh Quân. Xin Ngài hóa giải mọi điều thị phi, giữ cho tâm an vạn sự lành.'
  },
  'Thổ Tú': {
    name: 'Thổ Tú',
    element: 'Thổ',
    type: 'Trung tính (Bình thường)',
    description: 'Sao chủ về tiểu nhân gièm pha, xuất hành không thuận, gia đạo có chút muộn phiền vào tháng 4 và tháng 8 âm lịch.',
    thoThoat: 'Thổ Tú chiếu mệnh u sầu / Đi xa nên lánh, lo âu trong nhà',
    ngayCung: 'Ngày 19 âm lịch hàng tháng (từ 21h đến 23h đêm)',
    huongCung: 'Chính Tây',
    soNen: 5,
    baiViColor: 'Giấy màu vàng',
    baiViText: 'Trung Ương Mậu Kỷ Thổ Đức Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Trung Ương Mậu Kỷ Thổ Đức Tinh Quân. Cúi xin Ngài độ trì cho bản mệnh vững tâm vượt qua thử thách.'
  },
  'Thủy Diệu': {
    name: 'Thủy Diệu',
    element: 'Thủy',
    type: 'Cát tinh (Rất tốt)',
    description: 'Chủ về tài lộc, hỷ sự bất ngờ. Tuy nhiên cần chú ý đường sông nước và lời ăn tiếng nói vào tháng 4 và tháng 8 âm lịch.',
    thoThoat: 'Thủy Diệu thuộc về phương Thủy / Tài lộc dồi dào, kỵ chốn đò giang',
    ngayCung: 'Ngày 21 âm lịch hàng tháng (từ 19h đến 21h tối)',
    huongCung: 'Chính Bắc',
    soNen: 7,
    baiViColor: 'Giấy màu đen (hoặc xanh dương)',
    baiViText: 'Bắc Phương Nhâm Quý Thủy Đức Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Bắc Phương Nhâm Quý Thủy Đức Tinh Quân. Cúi xin Ngài ban tài lộc, gia hộ bình an khỏe mạnh.'
  },
  'Thái Bạch': {
    name: 'Thái Bạch',
    element: 'Kim',
    type: 'Hung tinh (Xấu)',
    description: 'Hung tinh chủ về hao tài tốnของ, đề phòng tiểu nhân quấy phá, bệnh tật tiêu hao vào tháng 2, 5, 8 âm lịch. Người làm việc thiện đức sẽ được hóa giải lớn.',
    thoThoat: 'Thái Bạch quét sạch cửa nhà / Giữ tâm thanh tịnh, phúc đà lại sang',
    ngayCung: 'Ngày 15 âm lịch hàng tháng (từ 19h đến 21h tối)',
    huongCung: 'Chính Tây',
    soNen: 8,
    baiViColor: 'Giấy màu trắng',
    baiViText: 'Tây Phương Canh Tân Kim Đức Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Tây Phương Canh Tân Kim Đức Tinh Quân. Cúi xin Ngài xua tan hung khí, tiêu trừ tai ách, bảo hộ tài lộc bình an.'
  },
  'La Hầu': {
    name: 'La Hầu',
    element: 'Kim',
    type: 'Hung tinh (Xấu)',
    description: 'Chủ về khẩu thiệt thị phi, kiện tụng, bệnh về mắt hoặc máu huyết. Kỵ nhất tháng 1 và tháng 7 âm lịch. Nam giới gặp sao này cần thận trọng hơn nữ giới.',
    thoThoat: 'La Hầu khóc dạ buồn thay / Tháng Giêng tháng Bảy đắng cay muôn phần',
    ngayCung: 'Ngày 8 âm lịch hàng tháng (từ 21h đến 23h đêm)',
    huongCung: 'Chính Bắc',
    soNen: 9,
    baiViColor: 'Giấy màu vàng',
    baiViText: 'Thiên Cung Thần Thủ La Hầu Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Thiên Cung Thần Thủ La Hầu Tinh Quân. Cúi xin Ngài từ bi xá tội, giải tỏa thị phi khẩu thiệt, hộ trì an khang.'
  },
  'Kế Đô': {
    name: 'Kế Đô',
    element: 'Thổ',
    type: 'Hung tinh (Xấu)',
    description: 'Hung tinh chủ về ám muội, thị phi, buồn bã trong gia đạo, hao tài. Nữ giới gặp sao này cần cẩn trọng hơn nam giới, kỵ tháng 3 và tháng 9 âm lịch.',
    thoThoat: 'Kế Đô sao ấy gieo sầu / Người dưng dòm ngó, âu sầu gia phong',
    ngayCung: 'Ngày 18 âm lịch hàng tháng (từ 21h đến 23h đêm)',
    huongCung: 'Chính Tây',
    soNen: 21,
    baiViColor: 'Giấy màu vàng',
    baiViText: 'Địa Cung Thần Vĩ Kế Đô Tinh Quân Vị Tiền',
    vanKhan: 'Nam mô A Di Đà Phật! Kính lạy Địa Cung Thần Vĩ Kế Đô Tinh Quân. Cúi xin Ngài hóa giải vận hạn, bảo hộ thân tâm thanh tịnh, gia đạo an vui.'
  }
};

const SAO_NAM_TABLE: Record<number, string> = {
  10: 'La Hầu', 19: 'La Hầu', 28: 'La Hầu', 37: 'La Hầu', 46: 'La Hầu', 55: 'La Hầu', 64: 'La Hầu', 73: 'La Hầu', 82: 'La Hầu', 91: 'La Hầu',
  11: 'Thổ Tú', 20: 'Thổ Tú', 29: 'Thổ Tú', 38: 'Thổ Tú', 47: 'Thổ Tú', 56: 'Thổ Tú', 65: 'Thổ Tú', 74: 'Thổ Tú', 83: 'Thổ Tú', 92: 'Thổ Tú',
  12: 'Thủy Diệu', 21: 'Thủy Diệu', 30: 'Thủy Diệu', 39: 'Thủy Diệu', 48: 'Thủy Diệu', 57: 'Thủy Diệu', 66: 'Thủy Diệu', 75: 'Thủy Diệu', 84: 'Thủy Diệu', 93: 'Thủy Diệu',
  13: 'Thái Bạch', 22: 'Thái Bạch', 31: 'Thái Bạch', 40: 'Thái Bạch', 49: 'Thái Bạch', 58: 'Thái Bạch', 67: 'Thái Bạch', 76: 'Thái Bạch', 85: 'Thái Bạch', 94: 'Thái Bạch',
  14: 'Thái Dương', 23: 'Thái Dương', 32: 'Thái Dương', 41: 'Thái Dương', 50: 'Thái Dương', 59: 'Thái Dương', 68: 'Thái Dương', 77: 'Thái Dương', 86: 'Thái Dương', 95: 'Thái Dương',
  15: 'Vân Hớn', 24: 'Vân Hớn', 33: 'Vân Hớn', 42: 'Vân Hớn', 51: 'Vân Hớn', 60: 'Vân Hớn', 69: 'Vân Hớn', 78: 'Vân Hớn', 87: 'Vân Hớn', 96: 'Vân Hớn',
  16: 'Kế Đô', 25: 'Kế Đô', 34: 'Kế Đô', 43: 'Kế Đô', 52: 'Kế Đô', 61: 'Kế Đô', 70: 'Kế Đô', 79: 'Kế Đô', 88: 'Kế Đô', 97: 'Kế Đô',
  17: 'Thái Âm', 26: 'Thái Âm', 35: 'Thái Âm', 44: 'Thái Âm', 53: 'Thái Âm', 62: 'Thái Âm', 71: 'Thái Âm', 80: 'Thái Âm', 89: 'Thái Âm', 98: 'Thái Âm',
  18: 'Mộc Đức', 27: 'Mộc Đức', 36: 'Mộc Đức', 45: 'Mộc Đức', 54: 'Mộc Đức', 63: 'Mộc Đức', 72: 'Mộc Đức', 81: 'Mộc Đức', 90: 'Mộc Đức', 99: 'Mộc Đức'
};

const SAO_NU_TABLE: Record<number, string> = {
  10: 'Kế Đô', 19: 'Kế Đô', 28: 'Kế Đô', 37: 'Kế Đô', 46: 'Kế Đô', 55: 'Kế Đô', 64: 'Kế Đô', 73: 'Kế Đô', 82: 'Kế Đô', 91: 'Kế Đô',
  11: 'Vân Hớn', 20: 'Vân Hớn', 29: 'Vân Hớn', 38: 'Vân Hớn', 47: 'Vân Hớn', 56: 'Vân Hớn', 65: 'Vân Hớn', 74: 'Vân Hớn', 83: 'Vân Hớn', 92: 'Vân Hớn',
  12: 'Mộc Đức', 21: 'Mộc Đức', 30: 'Mộc Đức', 39: 'Mộc Đức', 48: 'Mộc Đức', 57: 'Mộc Đức', 66: 'Mộc Đức', 75: 'Mộc Đức', 84: 'Mộc Đức', 93: 'Mộc Đức',
  13: 'Thái Âm', 22: 'Thái Âm', 31: 'Thái Âm', 40: 'Thái Âm', 49: 'Thái Âm', 58: 'Thái Âm', 67: 'Thái Âm', 76: 'Thái Âm', 85: 'Thái Âm', 94: 'Thái Âm',
  14: 'Thổ Tú', 23: 'Thổ Tú', 32: 'Thổ Tú', 41: 'Thổ Tú', 50: 'Thổ Tú', 59: 'Thổ Tú', 68: 'Thổ Tú', 77: 'Thổ Tú', 86: 'Thổ Tú', 95: 'Thổ Tú',
  15: 'La Hầu', 24: 'La Hầu', 33: 'La Hầu', 42: 'La Hầu', 51: 'La Hầu', 60: 'La Hầu', 69: 'La Hầu', 78: 'La Hầu', 87: 'La Hầu', 96: 'La Hầu',
  16: 'Thái Dương', 25: 'Thái Dương', 34: 'Thái Dương', 43: 'Thái Dương', 52: 'Thái Dương', 61: 'Thái Dương', 70: 'Thái Dương', 79: 'Thái Dương', 88: 'Thái Dương', 97: 'Thái Dương',
  17: 'Thái Bạch', 26: 'Thái Bạch', 35: 'Thái Bạch', 44: 'Thái Bạch', 53: 'Thái Bạch', 62: 'Thái Bạch', 71: 'Thái Bạch', 80: 'Thái Bạch', 89: 'Thái Bạch', 98: 'Thái Bạch',
  18: 'Thủy Diệu', 27: 'Thủy Diệu', 36: 'Thủy Diệu', 45: 'Thủy Diệu', 54: 'Thủy Diệu', 63: 'Thủy Diệu', 72: 'Thủy Diệu', 81: 'Thủy Diệu', 90: 'Thủy Diệu', 99: 'Thủy Diệu'
};

export const HAN_INFO_DICT: Record<string, HanDetail> = {
  'Huỳnh Tuyền': {
    name: 'Huỳnh Tuyền',
    type: 'Đại hạn',
    description: 'Chủ về bệnh nặng, hao tổn sức khỏe, kỵ đi đường sông nước hoặc mưu sự lớn.',
    loiKhuyen: 'Tránh xa việc bảo lãnh tiền bạc, chú ý an toàn khi đi lại vùng sông nước, chăm sóc sức khỏe.'
  },
  'Tam Kheo': {
    name: 'Tam Kheo',
    type: 'Tiểu hạn',
    description: 'Chủ về đau mắt, xây xát chân tay, phong thấp.',
    loiKhuyen: 'Chú ý an toàn lao động, hạn chế lái xe đêm, giữ ấm cơ thể mùa lạnh.'
  },
  'Ngũ Mộ': {
    name: 'Ngũ Mộ',
    type: 'Tiểu hạn',
    description: 'Chủ về hao tài tốnของ, đề phòng mất trộm hoặc mua phải hàng giả.',
    loiKhuyen: 'Không cho vay mượn mạo hiểm, bảo quản tài sản cẩn thận, mua bán có hóa đơn rõ ràng.'
  },
  'Thiên Tinh': {
    name: 'Thiên Tinh',
    type: 'Tiểu hạn',
    description: 'Chủ về ngộ độc thức ăn, dạ dày, kiện cáo thị phi.',
    loiKhuyen: 'Ăn uống hợp vệ sinh, tránh can thiệp chuyện bao đồng dẫn đến khẩu thiệt.'
  },
  'Tán Tận': {
    name: 'Tán Tận',
    type: 'Đại hạn',
    description: 'Chủ về đại hao tiền của, tai bay vạ gió bất ngờ.',
    loiKhuyen: 'Không mang theo nhiều tiền mặt khi đi xa, không đầu tư mạo hiểm, tích cực làm việc thiện.'
  },
  'Thiên La': {
    name: 'Thiên La',
    type: 'Đại hạn',
    description: 'Chủ về tâm lý bất an, mất ngủ, áp lực tinh thần, gia đạo lục đục.',
    loiKhuyen: 'Học cách buông bỏ ưu phiền, trò chuyện chia sẻ với người thân, giữ tâm lý ổn định.'
  },
  'Địa Võng': {
    name: 'Địa Võng',
    type: 'Tiểu hạn',
    description: 'Chủ về tai tiếng thị phi, ràng buộc pháp lý, hiểu lầm.',
    loiKhuyen: 'Làm việc minh bạch, tránh đi đêm một mình, cẩn trọng lời nói trên mạng xã hội.'
  },
  'Diêm Vương': {
    name: 'Diêm Vương',
    type: 'Đại hạn',
    description: 'Kỵ về bệnh tật với người đau ốm lâu năm, nhưng lại mang lại may mắn tài lộc cho người khỏe mạnh.',
    loiKhuyen: 'Khám sức khỏe định kỳ, điều dưỡng thân tâm, phóng sinh tích đức.'
  }
};

const HAN_NAM_TABLE: Record<number, string> = {
  10: 'Tam Kheo', 19: 'Tam Kheo', 28: 'Tam Kheo', 37: 'Tam Kheo', 46: 'Tam Kheo', 55: 'Tam Kheo', 64: 'Tam Kheo', 73: 'Tam Kheo', 82: 'Tam Kheo', 91: 'Tam Kheo',
  11: 'Ngũ Mộ', 20: 'Ngũ Mộ', 29: 'Ngũ Mộ', 38: 'Ngũ Mộ', 47: 'Ngũ Mộ', 56: 'Ngũ Mộ', 65: 'Ngũ Mộ', 74: 'Ngũ Mộ', 83: 'Ngũ Mộ', 92: 'Ngũ Mộ',
  12: 'Thiên Tinh', 21: 'Thiên Tinh', 30: 'Thiên Tinh', 39: 'Thiên Tinh', 48: 'Thiên Tinh', 57: 'Thiên Tinh', 66: 'Thiên Tinh', 75: 'Thiên Tinh', 84: 'Thiên Tinh', 93: 'Thiên Tinh',
  13: 'Tán Tận', 22: 'Tán Tận', 31: 'Tán Tận', 40: 'Tán Tận', 49: 'Tán Tận', 58: 'Tán Tận', 67: 'Tán Tận', 76: 'Tán Tận', 85: 'Tán Tận', 94: 'Tán Tận',
  14: 'Huỳnh Tuyền', 23: 'Huỳnh Tuyền', 32: 'Huỳnh Tuyền', 41: 'Huỳnh Tuyền', 50: 'Huỳnh Tuyền', 59: 'Huỳnh Tuyền', 68: 'Huỳnh Tuyền', 77: 'Huỳnh Tuyền', 86: 'Huỳnh Tuyền', 95: 'Huỳnh Tuyền',
  15: 'Thiên La', 24: 'Thiên La', 33: 'Thiên La', 42: 'Thiên La', 51: 'Thiên La', 60: 'Thiên La', 69: 'Thiên La', 78: 'Thiên La', 87: 'Thiên La', 96: 'Thiên La',
  16: 'Địa Võng', 25: 'Địa Võng', 34: 'Địa Võng', 43: 'Địa Võng', 52: 'Địa Võng', 61: 'Địa Võng', 70: 'Địa Võng', 79: 'Địa Võng', 88: 'Địa Võng', 97: 'Địa Võng',
  17: 'Diêm Vương', 26: 'Diêm Vương', 35: 'Diêm Vương', 44: 'Diêm Vương', 53: 'Diêm Vương', 62: 'Diêm Vương', 71: 'Diêm Vương', 80: 'Diêm Vương', 89: 'Diêm Vương', 98: 'Diêm Vương',
  18: 'Huỳnh Tuyền', 27: 'Huỳnh Tuyền', 36: 'Huỳnh Tuyền', 45: 'Huỳnh Tuyền', 54: 'Huỳnh Tuyền', 63: 'Huỳnh Tuyền', 72: 'Huỳnh Tuyền', 81: 'Huỳnh Tuyền', 90: 'Huỳnh Tuyền', 99: 'Huỳnh Tuyền'
};

export function tinhSaoHan(birthYear: number, targetYear: number, gioiTinh: 'Nam' | 'Nữ'): KetQuaSaoHan {
  const tuoiMu = targetYear - birthYear + 1;
  const canChiNamSinh = getCanChiYear(birthYear).fullName;
  const canChiNamXem = getCanChiYear(targetYear).fullName;

  // 1. Sao Cửu Diệu
  const saoName = (gioiTinh === 'Nam' ? SAO_NAM_TABLE[tuoiMu] : SAO_NU_TABLE[tuoiMu]) || 'Thái Dương';
  const sao = SAO_INFO_DICT[saoName] || SAO_INFO_DICT['Thái Dương'];

  // 2. Hạn Niên
  const hanName = HAN_NAM_TABLE[tuoiMu] || 'Ngũ Mộ';
  const han = HAN_INFO_DICT[hanName] || HAN_INFO_DICT['Ngũ Mộ'];

  // 3. Tam Tai
  // Thân - Tý - Thìn gặp Dần - Mão - Thìn
  // Dần - Ngọ - Tuất gặp Thân - Dậu - Tuất
  // Tỵ - Dậu - Sửu gặp Hợi - Tý - Sửu
  // Hợi - Mão - Mùi gặp Tỵ - Ngọ - Mùi
  const birthChiIndex = (birthYear + 8) % 12; // 0: Tý, 1: Sửu, 2: Dần...
  const targetChiIndex = (targetYear + 8) % 12;

  let isTamTai = false;
  let namTamTai = 0;
  let tamTaiDesc = 'Năm nay bản mệnh KHÔNG phạm Tam Tai.';

  const tamTaiGroups: Record<number, number[]> = {
    0: [2, 3, 4], // Thân Tý Thìn (0, 4, 8) -> Dần Mão Thìn (2, 3, 4)
    4: [2, 3, 4],
    8: [2, 3, 4],
    2: [8, 9, 10], // Dần Ngọ Tuất (2, 6, 10) -> Thân Dậu Tuất (8, 9, 10)
    6: [8, 9, 10],
    10: [8, 9, 10],
    5: [11, 0, 1], // Tỵ Dậu Sửu (5, 9, 1) -> Hợi Tý Sửu (11, 0, 1)
    9: [11, 0, 1],
    1: [11, 0, 1],
    11: [5, 6, 7], // Hợi Mão Mùi (11, 3, 7) -> Tỵ Ngọ Mùi (5, 6, 7)
    3: [5, 6, 7],
    7: [5, 6, 7]
  };

  const yearsInTamTai = tamTaiGroups[birthChiIndex] || [];
  const idx = yearsInTamTai.indexOf(targetChiIndex);
  if (idx !== -1) {
    isTamTai = true;
    namTamTai = idx + 1;
    const stageNames = ['Năm thứ nhất (Khởi đầu - không nên khởi công sự nghiệp lớn)', 'Năm thứ hai (Trọng điểm - không nên dừng dở dang việc đang làm)', 'Năm thứ ba (Kết thúc - không nên kết thúc việc quan trọng)'];
    tamTaiDesc = `Năm nay phạm TAM TAI (${stageNames[idx]}).`;
  }

  // 4. Kim Lâu (Tuổi mụ % 9)
  const rem = tuoiMu % 9;
  let isKimLau = false;
  let kimLauType: KetQuaSaoHan['kimLau']['type'];
  let kimLauDesc = 'Năm nay bản mệnh KHÔNG phạm Kim Lâu, rất thuận lợi cho việc cưới hỏi, dựng nhà.';

  if (rem === 1) {
    isKimLau = true;
    kimLauType = 'Kim Lâu Thân';
    kimLauDesc = 'Phạm Kim Lâu Thân: Kỵ cho chính bản thân đương số khi cưới hỏi hoặc làm nhà.';
  } else if (rem === 3) {
    isKimLau = true;
    kimLauType = 'Kim Lâu Thê';
    kimLauDesc = 'Phạm Kim Lâu Thê: Kỵ cho người phối ngẫu (vợ/chồng).';
  } else if (rem === 6) {
    isKimLau = true;
    kimLauType = 'Kim Lâu Tử';
    kimLauDesc = 'Phạm Kim Lâu Tử: Kỵ cho con cái trong nhà.';
  } else if (rem === 8) {
    isKimLau = true;
    kimLauType = 'Kim Lâu Súc';
    kimLauDesc = 'Phạm Kim Lâu Súc: Kỵ cho việc chăn nuôi gia súc, tài sản kinh tế gia đình.';
  }

  // 5. Hoang Ốc (Tính theo 6 cung: 1 Cát, 2 Nghi, 3 Địa Sát, 4 Tấn Tài, 5 Thọ Tử, 6 Hoang Ốc)
  const hoangOcCung = [
    { name: 'Nhất Cát (Tốt)', isTot: true, desc: 'Làm nhà tuổi này sẽ có chốn an cư lạc nghiệp tốt, vạn sự hanh thông.' },
    { name: 'Nhì Nghi (Tốt)', isTot: true, desc: 'Làm nhà tuổi này sẽ có lợi, nhà cửa hưng vượng, giàu có.' },
    { name: 'Tam Địa Sát (Xấu)', isTot: false, desc: 'Tuổi này làm nhà phạm, gia chủ dễ mắc bệnh tật đau ốm.' },
    { name: 'Tứ Tấn Tài (Tốt)', isTot: true, desc: 'Làm nhà tuổi này phúc lộc tới, đón tài đón lộc vào nhà.' },
    { name: 'Ngũ Thọ Tử (Xấu)', isTot: false, desc: 'Tuổi này làm nhà phạm Thọ Tử, trong nhà dễ cảnh chia ly, lâm ly bi đát.' },
    { name: 'Lục Hoang Ốc (Xấu)', isTot: false, desc: 'Tuổi này làm nhà phạm Hoang Ốc, khó thành đạt, công danh lận đận.' }
  ];

  // Bắt đầu từ 10 tuổi tại Cát (0), 20 tại Nghi (1), 30 tại Địa Sát (2), 40 tại Tấn Tài (3), 50 tại Thọ Tử (4), 60 tại Hoang Ốc (5)...
  const tens = Math.floor(tuoiMu / 10);
  const units = tuoiMu % 10;
  let startCung = (tens - 1) % 6;
  if (startCung < 0) startCung = 0;
  const finalCungIdx = (startCung + units) % 6;
  const hoangOcObj = hoangOcCung[finalCungIdx];

  const tongKet = `Trong năm ${targetYear} (${canChiNamXem}), đương số ${tuoiMu} tuổi mụ được chiếu bởi sao [${sao.name}] (${sao.type}), gặp hạn [${han.name}] (${han.type}). ${isTamTai ? 'Cần chú ý hạn Tam Tai. ' : ''}${isKimLau ? `Phạm ${kimLauType} (nên cân nhắc khi làm nhà/cưới hỏi). ` : 'Không phạm Kim Lâu. '}${hoangOcObj.isTot ? `Được cung ${hoangOcObj.name} làm nhà đại cát.` : `Phạm cung ${hoangOcObj.name} khi động thổ làm nhà.`}`;

  return {
    tuoiMu,
    namXem: targetYear,
    canChiNamSinh,
    canChiNamXem,
    sao,
    han,
    tamTai: {
      isTamTai,
      namTamTai,
      description: tamTaiDesc
    },
    kimLau: {
      isKimLau,
      type: kimLauType,
      description: kimLauDesc
    },
    hoangOc: {
      isTot: hoangOcObj.isTot,
      name: hoangOcObj.name,
      description: hoangOcObj.desc
    },
    tongKet
  };
}
