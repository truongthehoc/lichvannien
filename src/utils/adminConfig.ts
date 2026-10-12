/**
 * Quản lý Cấu hình Toàn cục Hệ thống (Admin Configuration & Settings)
 * Lưu trữ tại LocalStorage để hỗ trợ tùy biến thời gian thực
 */

export interface BankInfo {
  code: string;
  name: string;
  shortName: string;
}

export const VIETNAM_BANKS: BankInfo[] = [
  { code: 'MB', name: 'Ngân hàng Quân Đội', shortName: 'MBBank' },
  { code: 'VCB', name: 'Ngân hàng Ngoại Thương Việt Nam', shortName: 'Vietcombank' },
  { code: 'TCB', name: 'Ngân hàng Kỹ Thương Việt Nam', shortName: 'Techcombank' },
  { code: 'BIDV', name: 'Ngân hàng Đầu tư và Phát triển VN', shortName: 'BIDV' },
  { code: 'ICB', name: 'Ngân hàng Công Thương Việt Nam', shortName: 'VietinBank' },
  { code: 'VPB', name: 'Ngân hàng Việt Nam Thịnh Vượng', shortName: 'VPBank' },
  { code: 'ACB', name: 'Ngân hàng Á Châu', shortName: 'ACB' },
  { code: 'TPB', name: 'Ngân hàng Tiên Phong', shortName: 'TPBank' },
  { code: 'VBA', name: 'Ngân hàng Nông nghiệp & PT Nông thôn', shortName: 'Agribank' },
  { code: 'STB', name: 'Ngân hàng Sài Gòn Thương Tín', shortName: 'Sacombank' },
  { code: 'HDB', name: 'Ngân hàng Phát triển TP.HCM', shortName: 'HDBank' },
  { code: 'VIB', name: 'Ngân hàng Quốc tế Việt Nam', shortName: 'VIB' },
  { code: 'SHB', name: 'Ngân hàng Sài Gòn - Hà Nội', shortName: 'SHB' },
  { code: 'MSB', name: 'Ngân hàng Hàng Hải Việt Nam', shortName: 'MSB' },
  { code: 'OCB', name: 'Ngân hàng Phương Đông', shortName: 'OCB' },
  { code: 'LPB', name: 'Ngân hàng Lộc Phát Việt Nam', shortName: 'LPBank' },
  { code: 'SEAB', name: 'Ngân hàng Đông Nam Á', shortName: 'SeABank' },
  { code: 'BAB', name: 'Ngân hàng Bắc Á', shortName: 'Bac A Bank' },
  { code: 'NAB', name: 'Ngân hàng Nam Á', shortName: 'Nam A Bank' },
  { code: 'CAKE', name: 'Ngân hàng số Cake by VPBank', shortName: 'CAKE' },
  { code: 'TIMO', name: 'Ngân hàng số Timo by BVBank', shortName: 'Timo' },
];

export interface AppVersionItem {
  version: string;
  date: string;
  badge?: string;
  badgeColor?: string;
  highlights: string[];
}

export const APP_CHANGELOG_HISTORY: AppVersionItem[] = [
  {
    version: 'v2.5.0 - Đại Việt Hoàng Triều',
    date: '10/2026',
    badge: 'Bản hiện tại',
    badgeColor: 'bg-emerald-600 text-white',
    highlights: [
      'Tích hợp cổng quyên góp VietQR NAPAS 247 tự động quét 1 chạm tiện lợi.',
      'Tối ưu hóa hiệu năng render, tăng tốc độ tải trang và giảm 40% độ trễ dữ liệu.',
      'Hoàn thiện giao diện mỹ thuật Đông Sơn, hiển thị sắc nét trên mọi thiết bị di động.'
    ]
  },
  {
    version: 'v2.0.0 - Bát Quái & Ngũ Hành',
    date: '08/2026',
    badge: 'Tính năng mới',
    badgeColor: 'bg-amber-600 text-white',
    highlights: [
      'Bổ sung Thần Số Học Pitago: Tra cứu bản thân, giải mã Crush và độ hòa hợp cặp đôi.',
      'Tích hợp Thước Lỗ Ban phong thủy 3 chuẩn (52.2cm, 42.9cm, 38.8cm) và Gieo quẻ Kinh Dịch.',
      'Nâng cấp thuật toán Can Chi, Tiết Khí, Cửu Diệu Niên Hạn và Tam Tai.'
    ]
  },
  {
    version: 'v1.0.0 - Tinh Hoa Lịch Pháp',
    date: '01/2026',
    badge: 'Khởi đầu',
    badgeColor: 'bg-slate-600 text-white',
    highlights: [
      'Số hóa thuật toán thiên văn Âm Dương 200 năm (1800 - 2199) của nhà nghiên cứu Hồ Ngọc Đức.',
      'Hiển thị tờ lịch ngày hoàng đạo, giờ tốt xuất hành, bách kỵ và đổi ngày âm dương 2 chiều.'
    ]
  }
];

export type AnnouncementEffect = 'slide_down' | 'marquee' | 'pulse' | 'fade' | 'shimmer';
export type AnnouncementTheme = 'gold' | 'red' | 'emerald' | 'purple' | 'blue';

export interface AnnouncementSettings {
  text: string;
  enabled: boolean;
  effect: AnnouncementEffect;
  theme: AnnouncementTheme;
  delaySeconds: number; // 0 = ngay lập tức, 1 = sau 1s, 2 = sau 2s...
  durationSeconds: number; // 0 = luôn hiển thị (không tự tắt), 5 = 5s, 10 = 10s, 30 = 30s...
  allowClose: boolean; // Cho phép người dùng bấm [X] tắt
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
}

export type UserRole = 'admin' | 'manager';

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  status: 'active' | 'blocked';
  createdAt: string;
  lastLogin?: string;
}

export interface AppConfig {
  branding: {
    siteName: string;
    tagline: string;
    logoText: string;
    logoUrl?: string;
  };
  aboutIntro?: {
    badge?: string;
    title?: string;
    description?: string;
    quote?: string;
  };
  features: {
    calendar: boolean;
    tuvihangngay: boolean;
    convert: boolean;
    ngaytot: boolean;
    tuvi: boolean;
    saohan: boolean;
    thansohoc: boolean;
    gieoque: boolean;
    thuocloban: boolean;
    about: boolean;
  };
  donation: {
    bankCode?: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    branch: string;
    content: string;
    momoNumber: string;
    qrTemplate?: 'compact2' | 'compact' | 'qr_only' | 'print';
    packages: { amount: number; label: string; desc: string }[];
  };
  contact: {
    email: string;
    hotline: string;
    address: string;
  };
  system: {
    version: string;
    releaseDate: string;
    latestHighlights?: string;
    announcement: string;
    showAnnouncement: boolean;
    announcementSettings?: AnnouncementSettings;
    maintenanceMode: boolean;
  };
  footer: {
    title: string;
    description: string;
    versionDescription?: string;
    copyright: string;
    loveMessage: string;
    bottomLinkText?: string;
  };
  users?: AdminUser[];
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  branding: {
    siteName: 'LỊCH VẠN NIÊN',
    tagline: 'Đại Việt Phong Thủy & Lịch Pháp',
    logoText: 'ÂD',
  },
  aboutIntro: {
    badge: 'Tinh Hoa Văn Hóa Việt',
    title: 'LỊCH VẠN NIÊN',
    description: 'Dự án phi lợi nhuận với tâm nguyện gìn giữ, chuẩn hóa và số hóa kho tàng Lịch Pháp, Phong Thủy và Chiêm Tinh cổ truyền Việt Nam trên nền tảng công nghệ hiện đại. Áp dụng giải thuật thiên văn chuẩn xác của nhà nghiên cứu Hồ Ngọc Đức (múi giờ GMT+7 Việt Nam).',
    quote: 'Văn hóa là hồn cốt của Dân tộc, còn văn hóa là còn dân tộc.',
  },
  features: {
    calendar: true,
    tuvihangngay: true,
    ngaytot: true,
    convert: true,
    tuvi: true,
    saohan: true,
    thansohoc: true,
    gieoque: true,
    thuocloban: true,
    about: true,
  },
  donation: {
    bankCode: 'MB',
    bankName: 'Ngân hàng Quân Đội (MB Bank)',
    accountNumber: '0399888999',
    accountHolder: 'NGUYEN VAN ADMIN (LICH VAN NIEN)',
    branch: 'Chi nhánh Hà Nội',
    content: 'Ủng hộ dự án Lịch Vạn Niên Đại Việt',
    momoNumber: '0399888999',
    qrTemplate: 'compact2',
    packages: [
      { amount: 20000, label: 'Một Ly Trà Đá 🍵', desc: 'Góp sức duy trì tên miền 1 tuần' },
      { amount: 50000, label: 'Một Tách Cà Phê ☕', desc: 'Duy trì máy chủ server trong 1 tháng' },
      { amount: 100000, label: 'Một Bữa Ăn Sáng 🍲', desc: 'Hỗ trợ phát triển thêm tính năng mới' },
      { amount: 200000, label: 'Tấm Lòng Hảo Tâm 🌟', desc: 'Đồng hành lâu dài cùng dự án văn hóa' },
    ],
  },
  contact: {
    email: 'contact@lichvannien.vn',
    hotline: '1900 6868',
    address: 'Hà Nội, Việt Nam',
  },
  system: {
    version: 'v2.5.0 - Đại Việt Hoàng Triều',
    releaseDate: '10/2026',
    latestHighlights: 'Tích hợp cổng quyên góp VietQR NAPAS 247 tự động quét 1 chạm tiện lợi.\nTối ưu hóa hiệu năng render, tăng tốc độ tải trang và giảm 40% độ trễ dữ liệu.\nHoàn thiện giao diện mỹ thuật Đông Sơn, hiển thị sắc nét trên mọi thiết bị di động.',
    announcement: 'Chào mừng bạn đến với Lịch Vạn Niên Đại Việt. Chúc quý bạn vạn sự như ý, cát tường an khang!',
    showAnnouncement: false,
    announcementSettings: {
      text: 'Chào mừng bạn đến với Lịch Vạn Niên Đại Việt. Chúc quý bạn vạn sự như ý, cát tường an khang!',
      enabled: false,
      effect: 'slide_down',
      theme: 'gold',
      delaySeconds: 0,
      durationSeconds: 0,
      allowClose: true,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    },
    maintenanceMode: false,
  },
  footer: {
    title: 'Lịch Vạn Niên Đại Việt',
    description: 'Công cụ tra cứu Lịch Âm Dương, Hoàng Đạo, Can Chi, Tiết Khí, Tử Vi, Thần Số Học và Phong Thủy truyền thống Việt Nam với thuật toán thiên văn độ chính xác cao.',
    versionDescription: 'Ứng dụng áp dụng giải thuật thiên văn Hồ Ngọc Đức múi giờ chuẩn GMT+7 Việt Nam, tương thích hoàn hảo trên mọi thiết bị máy tính và điện thoại.',
    copyright: '© 2026 Lịch Vạn Niên Đại Việt. Lưu giữ nét đẹp văn hóa Việt.',
    loveMessage: 'Phát triển với tâm huyết gìn giữ tinh hoa văn hóa truyền thống',
    bottomLinkText: 'Tiếp thêm động lực cho tôi !',
  },
  users: [
    {
      id: 'admin-1',
      username: 'admin',
      password: 'admin888',
      fullName: 'Quản Trị Viên Tối Cao',
      role: 'admin',
      status: 'active',
      createdAt: '2026-10-06',
    },
    {
      id: 'manager-1',
      username: 'quanly',
      password: 'quanly123',
      fullName: 'Biên Tập Viên & Quản Lý',
      role: 'manager',
      status: 'active',
      createdAt: '2026-10-12',
    },
  ],
};

const STORAGE_KEY = 'lichvannien_admin_config';

export function getVietQrUrl(
  bankCode = 'MB',
  accountNumber = '',
  template: 'compact2' | 'compact' | 'qr_only' | 'print' = 'compact2',
  amount?: number,
  content?: string,
  accountName?: string
): string {
  const cleanBank = (bankCode || 'MB').trim().toUpperCase();
  const cleanAcc = (accountNumber || '').trim().replace(/\s+/g, '');
  if (!cleanAcc) return '';

  let url = `https://img.vietqr.io/image/${cleanBank}-${cleanAcc}-${template}.png`;
  const params = new URLSearchParams();
  if (amount && amount > 0) params.append('amount', String(amount));
  if (content && content.trim()) params.append('addInfo', content.trim());
  if (accountName && accountName.trim()) params.append('accountName', accountName.trim());

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}

export function getLatest3Versions(config: AppConfig): AppVersionItem[] {
  const list = [...APP_CHANGELOG_HISTORY];
  if (config.system?.version) {
    const highlights = config.system.latestHighlights
      ? config.system.latestHighlights.split('\n').filter(Boolean)
      : list[0].highlights;

    list[0] = {
      ...list[0],
      version: config.system.version,
      date: config.system.releaseDate || list[0].date,
      highlights: highlights.length > 0 ? highlights : list[0].highlights,
    };
  }
  return list.slice(0, 3);
}

export function getStoredConfig(): AppConfig {
  if (typeof window === 'undefined') return DEFAULT_APP_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APP_CONFIG;
    const parsed = JSON.parse(raw);
    const storedAnnSettings = parsed.system?.announcementSettings || {};
    const effectiveAnnText = storedAnnSettings.text || parsed.system?.announcement || DEFAULT_APP_CONFIG.system.announcement;
    const effectiveAnnEnabled = storedAnnSettings.enabled !== undefined 
      ? storedAnnSettings.enabled 
      : (parsed.system?.showAnnouncement ?? DEFAULT_APP_CONFIG.system.showAnnouncement);

    const storedUsers: AdminUser[] = Array.isArray(parsed.users) && parsed.users.length > 0
      ? parsed.users
      : DEFAULT_APP_CONFIG.users || [];

    return {
      ...DEFAULT_APP_CONFIG,
      ...parsed,
      branding: { ...DEFAULT_APP_CONFIG.branding, ...(parsed.branding || {}) },
      aboutIntro: { ...DEFAULT_APP_CONFIG.aboutIntro, ...(parsed.aboutIntro || {}) },
      features: { ...DEFAULT_APP_CONFIG.features, ...(parsed.features || {}) },
      donation: { 
        ...DEFAULT_APP_CONFIG.donation, 
        ...(parsed.donation || {}),
        bankCode: parsed.donation?.bankCode || DEFAULT_APP_CONFIG.donation.bankCode,
        qrTemplate: parsed.donation?.qrTemplate || DEFAULT_APP_CONFIG.donation.qrTemplate,
      },
      contact: { ...DEFAULT_APP_CONFIG.contact, ...(parsed.contact || {}) },
      system: { 
        ...DEFAULT_APP_CONFIG.system, 
        ...(parsed.system || {}),
        announcement: effectiveAnnText,
        showAnnouncement: effectiveAnnEnabled,
        announcementSettings: {
          ...DEFAULT_APP_CONFIG.system.announcementSettings!,
          ...storedAnnSettings,
          text: effectiveAnnText,
          enabled: effectiveAnnEnabled,
        },
      },
      footer: { 
        ...DEFAULT_APP_CONFIG.footer, 
        ...(parsed.footer || {}),
        title: parsed.footer?.title !== undefined ? parsed.footer.title : DEFAULT_APP_CONFIG.footer.title,
        description: parsed.footer?.description !== undefined ? parsed.footer.description : DEFAULT_APP_CONFIG.footer.description,
        versionDescription: parsed.footer?.versionDescription !== undefined ? parsed.footer.versionDescription : DEFAULT_APP_CONFIG.footer.versionDescription,
        copyright: parsed.footer?.copyright !== undefined ? parsed.footer.copyright : DEFAULT_APP_CONFIG.footer.copyright,
        loveMessage: parsed.footer?.loveMessage !== undefined ? parsed.footer.loveMessage : DEFAULT_APP_CONFIG.footer.loveMessage,
        bottomLinkText: parsed.footer?.bottomLinkText !== undefined ? parsed.footer.bottomLinkText : DEFAULT_APP_CONFIG.footer.bottomLinkText,
      },
      users: storedUsers,
    };
  } catch {
    return DEFAULT_APP_CONFIG;
  }
}

export function saveStoredConfig(config: AppConfig): void {
  if (typeof window === 'undefined') return;
  try {
    const isAnnEnabled = Boolean(
      config.system?.showAnnouncement || config.system?.announcementSettings?.enabled
    );
    const normalizedConfig: AppConfig = {
      ...config,
      system: {
        ...config.system,
        showAnnouncement: isAnnEnabled,
        announcementSettings: {
          ...DEFAULT_APP_CONFIG.system.announcementSettings!,
          ...(config.system?.announcementSettings || {}),
          text: config.system?.announcementSettings?.text || config.system?.announcement || '',
          enabled: isAnnEnabled,
        },
      },
      users: Array.isArray(config.users) && config.users.length > 0 ? config.users : DEFAULT_APP_CONFIG.users,
    };
    // 1. Lưu ngay vào localStorage thiết bị hiện tại
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedConfig));
    window.dispatchEvent(new Event('app-config-updated'));

    // 2. Đồng bộ lên Server VPS để tất cả thiết bị khác (Mobile, máy tính khác) đều nhận dữ liệu mới ngay lập tức
    fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(normalizedConfig),
      cache: 'no-store',
    }).catch((err) => {
      console.warn('Lỗi khi đồng bộ cấu hình lên server:', err);
    });
  } catch (e) {
    console.error('Lỗi khi lưu cấu hình admin:', e);
  }
}

// Hàm đồng bộ cấu hình từ server về thiết bị (loại bỏ hoàn toàn cache)
export async function syncConfigFromServer(): Promise<AppConfig> {
  if (typeof window === 'undefined') return DEFAULT_APP_CONFIG;
  try {
    const res = await fetch(`/api/config?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      },
    });
    if (!res.ok) return getStoredConfig();
    const data = await res.json();
    if (data?.success && data?.config) {
      const serverConfig: AppConfig = data.config;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serverConfig));
      window.dispatchEvent(new Event('app-config-updated'));
      return serverConfig;
    }
  } catch (err) {
    console.warn('Không thể đồng bộ cấu hình từ server:', err);
  }
  return getStoredConfig();
}

export function resetStoredConfig(): AppConfig {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('app-config-updated'));

    fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(DEFAULT_APP_CONFIG),
      cache: 'no-store',
    }).catch(() => {});
  }
  return DEFAULT_APP_CONFIG;
}
