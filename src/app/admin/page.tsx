'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Landmark, 
  CreditCard, 
  Phone, 
  Sliders, 
  Save, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ExternalLink, 
  Menu, 
  X, 
  Search, 
  User, 
  LogOut, 
  Bell, 
  Globe, 
  Compass, 
  Calendar as CalendarIcon, 
  Sun, 
  Star, 
  Sparkles,
  BookOpen, 
  Ruler, 
  Heart, 
  RefreshCw,
  QrCode,
  Copy,
  Check,
  FolderTree,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  Trash2,
  Megaphone,
  Clock,
  Timer,
  Zap,
  Palette
} from 'lucide-react';
import { 
  AppConfig, 
  DEFAULT_APP_CONFIG, 
  getStoredConfig, 
  saveStoredConfig, 
  resetStoredConfig,
  VIETNAM_BANKS,
  getVietQrUrl,
  AnnouncementEffect,
  AnnouncementTheme
} from '@/utils/adminConfig';
import TopAnnouncementBanner from '@/components/TopAnnouncementBanner';

type AdminTab = 'features' | 'branding' | 'donation' | 'contact_footer' | 'system';

interface FeatureItem {
  key: keyof AppConfig['features'];
  label: string;
  desc: string;
  icon: React.ReactNode;
}

interface FeatureGroup {
  id: string;
  title: string;
  typeBadge: string;
  isDropdown: boolean;
  headerBg: string;
  headerText: string;
  badgeBg: string;
  borderClass: string;
  items: FeatureItem[];
}

export default function AdminPage() {
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
  const [activeTab, setActiveTab] = useState<AdminTab>('features');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [testTrigger, setTestTrigger] = useState<number>(0);
  const [bannerStatus, setBannerStatus] = useState<{ status: 'waiting' | 'showing' | 'hidden'; countdown: number }>({
    status: 'showing',
    countdown: 0,
  });

  useEffect(() => {
    setConfig(getStoredConfig());
    if (typeof window !== 'undefined' && sessionStorage.getItem('lichvannien_admin_unlocked') === 'true') {
      setIsAuthenticated(true);
    }
    setIsAuthChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username === 'admin' && (password === 'admin888' || password === 'admin123' || password === 'admin')) ||
      password === 'admin888' ||
      password === 'admin123'
    ) {
      setIsAuthenticated(true);
      setErrorMsg('');
      sessionStorage.setItem('lichvannien_admin_unlocked', 'true');
    } else {
      setErrorMsg('Tài khoản hoặc mật khẩu không chính xác! (Gợi ý: admin / admin888)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lichvannien_admin_unlocked');
  };

  const handleSave = () => {
    saveStoredConfig(config);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục toàn bộ cài đặt về mặc định ban đầu?')) {
      const reset = resetStoredConfig();
      setConfig(reset);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  const toggleFeature = (key: keyof AppConfig['features']) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: !prev.features[key],
      },
    }));
  };

  const toggleGroup = (items: FeatureItem[], state: boolean) => {
    setConfig((prev) => {
      const next = { ...prev.features };
      items.forEach((item) => { next[item.key] = state; });
      return { ...prev, features: next };
    });
  };

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Vui lòng chọn ảnh logo có dung lượng dưới 2MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setConfig((prev) => ({
          ...prev,
          branding: {
            ...prev.branding,
            logoUrl: result,
          },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setConfig((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        logoUrl: '',
      },
    }));
  };

  // Structured groups corresponding directly to the public menu
  const featureGroups: FeatureGroup[] = [
    {
      id: 'calendar',
      title: '1. Menu Lịch Pháp (Mục đơn)',
      typeBadge: 'Mục Đơn Trực Tiếp',
      isDropdown: false,
      headerBg: 'bg-amber-100/90 border-amber-300',
      headerText: 'text-amber-950',
      badgeBg: 'bg-amber-600 text-white',
      borderClass: 'border-amber-300/80',
      items: [
        { key: 'calendar', label: 'Lịch Vạn Niên', desc: 'Xem lịch tháng, tờ lịch ngày, can chi, giờ hoàng đạo', icon: <CalendarIcon className="w-4 h-4 text-amber-600" /> },
        { key: 'ngaytot', label: 'Xem Ngày Tốt Xấu', desc: 'Tra cứu hoàng đạo, trực, sao cát hung, bách kỵ', icon: <Compass className="w-4 h-4 text-indigo-600" /> },
        { key: 'convert', label: 'Đổi Ngày Âm Dương', desc: 'Chuyển đổi âm dương 2 chiều & Đếm ngược Tết', icon: <RefreshCw className="w-4 h-4 text-emerald-600" /> },
      ],
    },
    {
      id: 'tuvi',
      title: '2. Dropdown: Tử Vi & Vận Số',
      typeBadge: 'Menu Dropdown',
      isDropdown: true,
      headerBg: 'bg-blue-100/90 border-blue-300',
      headerText: 'text-blue-950',
      badgeBg: 'bg-blue-600 text-white',
      borderClass: 'border-blue-300/80',
      items: [
        { key: 'tuvihangngay', label: 'Tử Vi Mỗi Ngày', desc: 'Dự đoán vận hạn 12 Con Giáp & cát hung trong ngày', icon: <Sun className="w-4 h-4 text-amber-600" /> },
        { key: 'tuvi', label: 'Tử Vi Trọn Đời', desc: 'Lập lá số tử vi 12 cung bản mệnh, công danh, gia đạo', icon: <BookOpen className="w-4 h-4 text-blue-600" /> },
        { key: 'saohan', label: 'Sao Hạn & Giải Hạn', desc: 'Cửu Diệu niên hạn, Tam Tai, Kim Lâu & văn khấn cúng', icon: <Star className="w-4 h-4 text-amber-500" /> },
        { key: 'thansohoc', label: 'Thần Số Học Pitago', desc: 'Tra cứu bản thân, giải mã Crush & đo tương hợp cặp đôi', icon: <Sparkles className="w-4 h-4 text-rose-500" /> },
      ],
    },
    {
      id: 'phongthuy',
      title: '3. Dropdown: Phong Thủy & Dịch Học',
      typeBadge: 'Menu Dropdown',
      isDropdown: true,
      headerBg: 'bg-purple-100/90 border-purple-300',
      headerText: 'text-purple-950',
      badgeBg: 'bg-purple-600 text-white',
      borderClass: 'border-purple-300/80',
      items: [
        { key: 'gieoque', label: 'Gieo Quẻ Kinh Dịch', desc: 'Bói Dịch 3 đồng xu 64 quẻ luận giải quẻ chủ & biến', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
        { key: 'thuocloban', label: 'Thước Lỗ Ban', desc: 'Thước 52.2cm, 42.9cm, 38.8cm tra khoảng cung tốt', icon: <Ruler className="w-4 h-4 text-amber-700" /> },
      ],
    },
    {
      id: 'about',
      title: '4. Menu Thông Tin (Mục đơn)',
      typeBadge: 'Mục Đơn Trực Tiếp',
      isDropdown: false,
      headerBg: 'bg-rose-100/90 border-rose-300',
      headerText: 'text-rose-950',
      badgeBg: 'bg-rose-600 text-white',
      borderClass: 'border-rose-300/80',
      items: [
        { key: 'about', label: 'Về Chúng Tôi & Donate', desc: 'Triết lý dự án, giới thiệu và cổng quyên góp ủng hộ máy chủ', icon: <Heart className="w-4 h-4 text-rose-600" /> },
      ],
    },
  ];

  const totalFeatures = Object.keys(config.features).length;
  const activeFeatures = Object.values(config.features).filter(Boolean).length;

  // Filtered by search
  const filteredGroups = featureGroups.map((group) => {
    const matchedItems = group.items.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return item.label.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    });
    return { ...group, items: matchedItems };
  }).filter((group) => group.items.length > 0);

  // Khi đang kiểm tra phiên đăng nhập (tránh chớp form login khi F5)
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // =========================================================================
  // 1. MÀN HÌNH ĐĂNG NHẬP (CLEAN & SIMPLE LOGIN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="text-center space-y-1.5">
            {config.branding.logoUrl ? (
              <img 
                src={config.branding.logoUrl} 
                alt={config.branding.siteName || 'Logo'} 
                className="h-12 w-auto max-w-[160px] max-h-12 object-contain mx-auto"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-sm">
                {config.branding.logoText || 'ÂD'}
              </div>
            )}
            <h1 className="text-lg font-bold text-slate-900">
              Đăng Nhập Quản Trị
            </h1>
            <p className="text-xs text-slate-500">
              {config.branding.siteName || 'Lịch Vạn Niên Đại Việt'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tài khoản
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin888"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-600 font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow-xs"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-amber-600">← Về Trang Chủ</Link>
            <button
              type="button"
              onClick={() => { setUsername('admin'); setPassword('admin888'); }}
              className="text-amber-600 font-semibold hover:underline"
            >
              Điền mẫu demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. BẢNG QUẢN TRỊ ĐƠN GIẢN, DỄ NHÌN (CLEAN & SIMPLE DASHBOARD)
  // =========================================================================
  const navigationItems = [
    { id: 'features' as const, label: 'Quản Lý Tính Năng', icon: <Layers className="w-4 h-4" />, count: `${activeFeatures}/${totalFeatures}` },
    { id: 'branding' as const, label: 'Tên & Logo Thương Hiệu', icon: <Landmark className="w-4 h-4" /> },
    { id: 'donation' as const, label: 'Thông Tin Donate & VietQR', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'contact_footer' as const, label: 'Liên Hệ & Chân Trang', icon: <Phone className="w-4 h-4" /> },
    { id: 'system' as const, label: 'Hệ Thống & Thông Báo', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR ĐƠN GIẢN, GỌN GÀNG */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 space-y-5">
          {/* Logo & Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              {config.branding.logoUrl ? (
                <img 
                  src={config.branding.logoUrl} 
                  alt={config.branding.siteName || 'Logo'} 
                  className="h-8 w-auto max-w-[100px] max-h-8 object-contain shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0">
                  {config.branding.logoText || 'ÂD'}
                </div>
              )}
              <div>
                <h2 className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
                  {config.branding.siteName || 'LỊCH VẠN NIÊN'}
                </h2>
                <div className="text-[10px] text-emerald-400 font-mono">● Admin Mode</div>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick link live */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-amber-300 font-medium transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Xem Trang Chủ</span>
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
              Danh Mục Quản Lý
            </div>
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between bg-slate-950/40 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-400 text-xs font-mono">
              AD
            </div>
            <span className="text-slate-300 font-medium truncate max-w-[110px]">admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* KHÔNG GIAN NỘI DUNG CHÍNH (FULL WIDTH, CLEAN & SIMPLE) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Thanh Header Đơn Giản Trên Cùng */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-slate-600 hover:text-slate-900 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-slate-900">
              {navigationItems.find((i) => i.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mặc định</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu Cài Đặt</span>
            </button>
          </div>
        </header>

        {/* Thông báo Lưu Thành Công */}
        {saveToast && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 animate-fadeIn border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Đã lưu thành công!</span>
          </div>
        )}

        {/* NỘI DUNG TỪNG TAB (GIAO DIỆN PHẲNG, GỌN GÀNG, DỄ NHÌN) */}
        <main className="p-4 sm:p-6 space-y-5 w-full">
          {/* ========================================================================= */}
          {/* TAB 1: QUẢN LÝ TÍNH NĂNG (GIAO DIỆN DẠNG BẢNG DANH SÁCH RÕ RÀNG) */}
          {/* ========================================================================= */}
          {activeTab === 'features' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Thanh công cụ gọn gàng */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tính năng..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      const allOn: any = {};
                      featureGroups.forEach((g) => g.items.forEach((i) => { allOn[i.key] = true; }));
                      setConfig({ ...config, features: { ...config.features, ...allOn } });
                    }}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200"
                  >
                    Bật Tất Cả
                  </button>
                  <button
                    onClick={() => {
                      const allOff: any = {};
                      featureGroups.forEach((g) => g.items.forEach((i) => { allOff[i.key] = false; }));
                      allOff.calendar = true;
                      setConfig({ ...config, features: { ...config.features, ...allOff } });
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs rounded-lg border border-slate-200"
                  >
                    Ẩn Hầu Hết
                  </button>
                </div>
              </div>

              {/* Danh sách chia 2 khung Trái / Phải có chiều cao bằng nhau tuyệt đối */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                {filteredGroups.map((group) => {
                  const activeCount = group.items.filter((item) => config.features[item.key]).length;

                  return (
                    <div key={group.id} className={`bg-white border rounded-xl overflow-hidden shadow-2xs flex flex-col h-full ${group.borderClass}`}>
                      {/* Tiêu đề nhóm có màu nền nổi bật */}
                      <div className={`border-b px-4 py-3 flex items-center justify-between shrink-0 ${group.headerBg}`}>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs sm:text-sm font-bold ${group.headerText}`}>{group.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-2xs ${group.badgeBg}`}>
                            {group.typeBadge}
                          </span>
                          <span className={`text-[11px] font-mono font-semibold opacity-75 ${group.headerText}`}>
                            ({activeCount}/{group.items.length})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs">
                          <button
                            onClick={() => toggleGroup(group.items, true)}
                            className="px-2 py-0.5 rounded bg-white/90 hover:bg-white text-emerald-800 font-bold text-[11px] shadow-2xs transition-all"
                          >
                            Bật
                          </button>
                          <button
                            onClick={() => toggleGroup(group.items, false)}
                            className="px-2 py-0.5 rounded bg-white/70 hover:bg-white text-slate-700 font-medium text-[11px] shadow-2xs transition-all"
                          >
                            Tắt
                          </button>
                        </div>
                      </div>

                      {/* Các dòng tính năng trong nhóm tự động dàn đều kín chiều cao */}
                      <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-between">
                        {group.items.map((item) => {
                          const isEnabled = config.features[item.key];

                          return (
                            <div
                              key={item.key}
                              onClick={() => toggleFeature(item.key)}
                              className={`px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors flex-1 ${
                                isEnabled ? 'hover:bg-slate-50' : 'bg-slate-50/60 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-1.5 bg-slate-100 rounded-md shrink-0">
                                  {item.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                    <span>{item.label}</span>
                                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold font-mono ${
                                      isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                      {isEnabled ? 'BẬT' : 'ẨN'}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                    {item.desc}
                                  </div>
                                </div>
                              </div>

                              {/* Gạt bật tắt đơn giản */}
                              <div className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 shrink-0 ${
                                isEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                              }`}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                                  isEnabled ? 'translate-x-4' : 'translate-x-0'
                                }`}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: TÊN & LOGO THƯƠNG HIỆU */}
          {/* ========================================================================= */}
          {activeTab === 'branding' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Tùy Chỉnh Thương Hiệu & Logo</h2>
                <p className="text-xs text-slate-500">Thông tin xuất hiện ở đầu trang (Header), thanh bên và tiêu đề trình duyệt</p>
              </div>

              {/* Logo Upload Section */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-800">Ảnh Logo Tùy Chỉnh</span>
                  </div>
                  {config.branding.logoUrl && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Đang dùng ảnh riêng
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Current Logo Display */}
                  <div className="w-20 h-20 rounded-xl bg-white border-2 border-dashed border-slate-300 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                    {config.branding.logoUrl ? (
                      <img
                        src={config.branding.logoUrl}
                        alt="Logo Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center">
                        {config.branding.logoText || 'ÂD'}
                      </div>
                    )}
                  </div>

                  {/* Actions & Instructions */}
                  <div className="flex-1 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{config.branding.logoUrl ? 'Thay đổi ảnh logo...' : 'Tải lên ảnh logo...'}</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp, image/svg+xml"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>

                      {config.branding.logoUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg border border-rose-200 transition-colors inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa ảnh (Dùng chữ)</span>
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      💡 <strong>Gợi ý:</strong> Chọn file ảnh <span className="font-semibold text-slate-700">PNG, JPG, WebP, SVG</span> vuông (tỉ lệ 1:1), dung lượng tối đa 2MB. Logo sẽ tự động cập nhật ngay trên toàn bộ giao diện Header, Sidebar và Trang đăng nhập.
                    </p>
                  </div>
                </div>
              </div>

              {/* Text branding inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên Dự Án</label>
                  <input
                    type="text"
                    value={config.branding.siteName}
                    onChange={(e) => setConfig({ ...config, branding: { ...config.branding, siteName: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khẩu Hiệu (Tagline)</label>
                  <input
                    type="text"
                    value={config.branding.tagline}
                    onChange={(e) => setConfig({ ...config, branding: { ...config.branding, tagline: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ký Tự Logo Chữ (Khi không dùng ảnh)</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={config.branding.logoText}
                    onChange={(e) => setConfig({ ...config, branding: { ...config.branding, logoText: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-center text-amber-700 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Cấu hình Khung Giới Thiệu Trang 'Về Chúng Tôi' */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Khung Giới Thiệu Trang "Về Chúng Tôi" (Khung Đỏ)
                  </h3>
                  <p className="text-[11px] text-slate-500">Tùy biến tiêu đề, nội dung và lời trích dẫn hiển thị ở trang giới thiệu</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Huy Hiệu (Badge Nhỏ)</label>
                    <input
                      type="text"
                      value={config.aboutIntro?.badge || ''}
                      onChange={(e) => setConfig({ ...config, aboutIntro: { ...config.aboutIntro, badge: e.target.value } })}
                      placeholder="Tinh Hoa Văn Hóa Việt"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu Đề Giới Thiệu</label>
                    <input
                      type="text"
                      value={config.aboutIntro?.title || ''}
                      onChange={(e) => setConfig({ ...config, aboutIntro: { ...config.aboutIntro, title: e.target.value } })}
                      placeholder="LỊCH VẠN NIÊN"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mô Tả Dự Án</label>
                    <textarea
                      rows={2}
                      value={config.aboutIntro?.description || ''}
                      onChange={(e) => setConfig({ ...config, aboutIntro: { ...config.aboutIntro, description: e.target.value } })}
                      placeholder="Dự án phi lợi nhuận với tâm nguyện gìn giữ, chuẩn hóa..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lời Trích Dẫn / Danh Ngôn</label>
                    <input
                      type="text"
                      value={config.aboutIntro?.quote || ''}
                      onChange={(e) => setConfig({ ...config, aboutIntro: { ...config.aboutIntro, quote: e.target.value } })}
                      placeholder="Văn hóa là hồn cốt của Dân tộc, còn văn hóa là còn dân tộc."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs italic text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Header Live Preview */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Xem Trước Header:</div>
                <div className="p-3 bg-[#8b1818] rounded-lg text-white flex items-center gap-3 w-fit shadow-xs">
                  {config.branding.logoUrl ? (
                    <img
                      src={config.branding.logoUrl}
                      alt={config.branding.siteName || 'Logo'}
                      className="h-8 w-auto max-w-[120px] max-h-8 object-contain shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-red-950 flex items-center justify-center font-bold text-xs shrink-0">
                      {config.branding.logoText || 'ÂD'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-amber-200">{config.branding.siteName}</div>
                    <div className="text-[9px] text-amber-100/75">{config.branding.tagline}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: DONATE & VIETQR */}
          {/* ========================================================================= */}
          {activeTab === 'donation' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Tài Khoản Quyên Góp & Tự Động Tạo VietQR</h2>
                <p className="text-xs text-slate-500">
                  Hệ thống tự động sinh mã VietQR chuẩn NAPAS theo cấu hình ngân hàng bên dưới
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Form Cấu Hình (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Danh sách chọn ngân hàng nhanh */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Chọn Ngân Hàng (Tự động nhận diện mã VietQR)
                      </label>
                      <select
                        value={config.donation.bankCode || 'MB'}
                        onChange={(e) => {
                          const selected = VIETNAM_BANKS.find((b) => b.code === e.target.value);
                          if (selected) {
                            setConfig({
                              ...config,
                              donation: {
                                ...config.donation,
                                bankCode: selected.code,
                                bankName: selected.name,
                              },
                            });
                          }
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      >
                        {VIETNAM_BANKS.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.shortName} - {b.name} ({b.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tên Ngân Hàng (Hiển thị)</label>
                      <input
                        type="text"
                        value={config.donation.bankName}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, bankName: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mã Viết Tắt (VietQR Code)</label>
                      <input
                        type="text"
                        value={config.donation.bankCode || 'MB'}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, bankCode: e.target.value.toUpperCase() } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-amber-700 focus:bg-white focus:outline-none focus:border-amber-500 uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Số Tài Khoản</label>
                      <input
                        type="text"
                        value={config.donation.accountNumber}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, accountNumber: e.target.value } })}
                        placeholder="0399888999"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-red-700 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chủ Tài Khoản (In hoa không dấu)</label>
                      <input
                        type="text"
                        value={config.donation.accountHolder}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, accountHolder: e.target.value.toUpperCase() } })}
                        placeholder="NGUYEN VAN ADMIN"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chi Nhánh</label>
                      <input
                        type="text"
                        value={config.donation.branch}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, branch: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mẫu Khung VietQR</label>
                      <select
                        value={config.donation.qrTemplate || 'compact2'}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, qrTemplate: e.target.value as any } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="compact2">Compact 2 (Đẹp, có Logo & Thông tin)</option>
                        <option value="compact">Compact (Khung gọn)</option>
                        <option value="qr_only">QR Only (Chỉ mã QR thuần)</option>
                        <option value="print">Print (Khổ in)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nội Dung Chuyển Khoản Mặc Định</label>
                      <input
                        type="text"
                        value={config.donation.content}
                        onChange={(e) => setConfig({ ...config, donation: { ...config.donation, content: e.target.value } })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Khung Live Preview VietQR Tự Động (5 cols) */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-600" />
                      <span>Xem Trước Mã VietQR Tự Sinh</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-mono">
                      ● LIVE PREVIEW
                    </span>
                  </div>

                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs flex items-center justify-center min-h-[200px]">
                    {config.donation.accountNumber ? (
                      <img
                        src={getVietQrUrl(
                          config.donation.bankCode || 'MB',
                          config.donation.accountNumber,
                          config.donation.qrTemplate || 'compact2',
                          50000,
                          config.donation.content || 'Ung ho Lich Van Nien',
                          config.donation.accountHolder
                        )}
                        alt="VietQR Preview"
                        className="w-full max-w-[220px] h-auto object-contain rounded-md"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-xs text-slate-400 p-6">Vui lòng nhập Số Tài Khoản để xem mã QR</div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 leading-relaxed text-left space-y-1">
                    <div>🏦 <strong>Ngân hàng:</strong> {config.donation.bankName} ({config.donation.bankCode || 'MB'})</div>
                    <div>💳 <strong>Số tài khoản:</strong> {config.donation.accountNumber || '---'}</div>
                    <div>👤 <strong>Chủ tài khoản:</strong> {config.donation.accountHolder || '---'}</div>
                    <div className="text-emerald-700 font-semibold pt-1">
                      ✓ Mã QR tự động đồng bộ sang trang "Về Chúng Tôi & Donate"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: LIÊN HỆ & FOOTER */}
          {/* ========================================================================= */}
          {activeTab === 'contact_footer' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Liên Hệ & Chân Trang (Footer)</h2>
                <p className="text-xs text-slate-500">Thông tin liên hệ và nội dung hiển thị ở chân website</p>
              </div>

              {/* Thông tin liên hệ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Liên Hệ</label>
                  <input
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hotline</label>
                  <input
                    type="text"
                    value={config.contact.hotline}
                    onChange={(e) => setConfig({ ...config, contact: { ...config.contact, hotline: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Địa Chỉ</label>
                  <input
                    type="text"
                    value={config.contact.address}
                    onChange={(e) => setConfig({ ...config, contact: { ...config.contact, address: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Nội dung chi tiết Chân Trang (Footer) */}
              <div className="pt-3 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tùy Chỉnh Nội Dung Chân Trang (Footer)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu Đề Thương Hiệu Chân Trang</label>
                    <input
                      type="text"
                      value={config.footer.title}
                      onChange={(e) => setConfig({ ...config, footer: { ...config.footer, title: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      placeholder="Lịch Vạn Niên Đại Việt"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bản Quyền (Copyright)</label>
                    <input
                      type="text"
                      value={config.footer.copyright}
                      onChange={(e) => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mô Tả Dự Án Chân Trang (Cột 1)</label>
                  <textarea
                    rows={2}
                    value={config.footer.description}
                    onChange={(e) => setConfig({ ...config, footer: { ...config.footer, description: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mô Tả Phiên Bản Ở Chân Trang (Cột 3)</label>
                  <textarea
                    rows={2}
                    value={config.footer.versionDescription || ''}
                    onChange={(e) => setConfig({ ...config, footer: { ...config.footer, versionDescription: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 leading-relaxed"
                    placeholder="Ứng dụng áp dụng giải thuật thiên văn Hồ Ngọc Đức múi giờ chuẩn GMT+7 Việt Nam, tương thích hoàn hảo trên mọi thiết bị máy tính và điện thoại."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dòng Chữ Cuối Cùng (Bottom Message)</label>
                    <input
                      type="text"
                      value={config.footer.loveMessage}
                      onChange={(e) => setConfig({ ...config, footer: { ...config.footer, loveMessage: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Chữ Nút / Liên Kết Dòng Cuối</label>
                    <input
                      type="text"
                      value={config.footer.bottomLinkText ?? 'Tiếp thêm động lực cho tôi !'}
                      onChange={(e) => setConfig({ ...config, footer: { ...config.footer, bottomLinkText: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      placeholder="Tiếp thêm động lực cho tôi !"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: HỆ THỐNG & THÔNG BÁO */}
          {/* ========================================================================= */}
          {activeTab === 'system' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Phiên Bản & Banner Thông Báo</h2>
                <p className="text-xs text-slate-500">Quản lý mã phiên bản và thông báo nổi bật đầu trang</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mã Phiên Bản</label>
                  <input
                    type="text"
                    value={config.system.version}
                    onChange={(e) => setConfig({ ...config, system: { ...config.system, version: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Thời Điểm Phát Hành</label>
                  <input
                    type="text"
                    value={config.system.releaseDate}
                    onChange={(e) => setConfig({ ...config, system: { ...config.system, releaseDate: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Điểm Nổi Bật Của Phiên Bản Này (Mỗi dòng 1 gạch đầu dòng)
                  </label>
                  <textarea
                    rows={3}
                    value={config.system.latestHighlights || ''}
                    onChange={(e) => setConfig({ ...config, system: { ...config.system, latestHighlights: e.target.value } })}
                    placeholder="Hệ thống tự động sinh mã VietQR chuẩn xác...&#10;Hỗ trợ upload và tùy biến logo..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ✓ Tự động đồng bộ lên vị trí đầu tiên của Lịch sử phiên bản trên trang "Về Chúng Tôi"
                  </p>
                </div>
              </div>

              {/* Cấu Hình Chi Tiết Banner Thông Báo Đầu Trang */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                {/* Header Section with Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-slate-900">Banner Thông Báo Đầu Trang (Top Announcement)</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Cài đặt thời gian xuất hiện, thời lượng hiển thị, lên lịch ngày và hiệu ứng chuyển động
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const nextState = !config.system.showAnnouncement;
                      setConfig({
                        ...config,
                        system: {
                          ...config.system,
                          showAnnouncement: nextState,
                          announcementSettings: {
                            ...config.system.announcementSettings!,
                            enabled: nextState,
                          },
                        },
                      });
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto ${
                      config.system.showAnnouncement
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span>{config.system.showAnnouncement ? 'ĐANG BẬT THÔNG BÁO' : 'ĐANG TẮT THÔNG BÁO'}</span>
                  </button>
                </div>

                {/* 1. Nội dung thông báo */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nội Dung Thông Báo (Hỗ trợ Icon/Emoji 📢, 🌸, 🧧, ✨, 🌟...)
                  </label>
                  <input
                    type="text"
                    value={config.system.announcementSettings?.text ?? config.system.announcement}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfig({
                        ...config,
                        system: {
                          ...config.system,
                          announcement: val,
                          announcementSettings: {
                            ...config.system.announcementSettings!,
                            text: val,
                          },
                        },
                      });
                    }}
                    placeholder="Ví dụ: Chào mừng bạn đến với Lịch Vạn Niên Đại Việt. Chúc quý bạn vạn sự cát tường!"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-amber-500 shadow-2xs"
                  />
                </div>

                {/* 2. Cài Đặt Thời Gian & Thời Lượng Hiển Thị */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Xuất Hiện Sau (Độ trễ - Delay)</span>
                    </label>
                    <select
                      value={config.system.announcementSettings?.delaySeconds ?? 0}
                      onChange={(e) => {
                        const sec = parseInt(e.target.value, 10) || 0;
                        setConfig({
                          ...config,
                          system: {
                            ...config.system,
                            announcementSettings: {
                              ...config.system.announcementSettings!,
                              delaySeconds: sec,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                    >
                      <option value={0}>0 giây (Hiển thị ngay khi vào trang)</option>
                      <option value={1}>1 giây sau khi vào trang</option>
                      <option value={2}>2 giây sau khi vào trang</option>
                      <option value={3}>3 giây sau khi vào trang</option>
                      <option value={5}>5 giây sau khi vào trang</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-rose-600" />
                      <span>Xuất Hiện Trong Bao Lâu (Tự Ẩn)</span>
                    </label>
                    <select
                      value={config.system.announcementSettings?.durationSeconds ?? 0}
                      onChange={(e) => {
                        const sec = parseInt(e.target.value, 10) || 0;
                        setConfig({
                          ...config,
                          system: {
                            ...config.system,
                            announcementSettings: {
                              ...config.system.announcementSettings!,
                              durationSeconds: sec,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                    >
                      <option value={0}>Luôn hiển thị (Không tự ẩn)</option>
                      <option value={5}>5 giây (Tự ẩn sau 5s)</option>
                      <option value={10}>10 giây (Tự ẩn sau 10s)</option>
                      <option value={15}>15 giây (Tự ẩn sau 15s)</option>
                      <option value={20}>20 giây (Tự ẩn sau 20s)</option>
                      <option value={30}>30 giây (Tự ẩn sau 30s)</option>
                      <option value={60}>60 giây (Tự ẩn sau 1 phút)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-slate-600" />
                      <span>Nút Đóng Nhanh [✕]</span>
                    </label>
                    <div className="flex items-center h-9 px-3 bg-white border border-slate-300 rounded-lg">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-medium">
                        <input
                          type="checkbox"
                          checked={config.system.announcementSettings?.allowClose ?? true}
                          onChange={(e) => {
                            setConfig({
                              ...config,
                              system: {
                                ...config.system,
                                announcementSettings: {
                                  ...config.system.announcementSettings!,
                                  allowClose: e.target.checked,
                                },
                              },
                            });
                          }}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                        />
                        <span>Cho phép người dùng bấm [✕] đóng</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3. Lên Lịch Thời Gian & Khung Giờ Phát Sóng */}
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-3">
                  <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lên Lịch Ngày & Khung Giờ Phát Sóng (Tùy chọn)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        📅 Ngày Bắt Đầu
                      </label>
                      <input
                        type="date"
                        value={config.system.announcementSettings?.startDate ?? ''}
                        onChange={(e) => {
                          setConfig({
                            ...config,
                            system: {
                              ...config.system,
                              announcementSettings: {
                                ...config.system.announcementSettings!,
                                startDate: e.target.value,
                              },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        🏁 Ngày Kết Thúc
                      </label>
                      <input
                        type="date"
                        value={config.system.announcementSettings?.endDate ?? ''}
                        onChange={(e) => {
                          setConfig({
                            ...config,
                            system: {
                              ...config.system,
                              announcementSettings: {
                                ...config.system.announcementSettings!,
                                endDate: e.target.value,
                              },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        ⏰ Giờ Bắt Đầu Trong Ngày
                      </label>
                      <input
                        type="time"
                        value={config.system.announcementSettings?.startTime ?? ''}
                        onChange={(e) => {
                          setConfig({
                            ...config,
                            system: {
                              ...config.system,
                              announcementSettings: {
                                ...config.system.announcementSettings!,
                                startTime: e.target.value,
                              },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        ⏱️ Giờ Kết Thúc Trong Ngày
                      </label>
                      <input
                        type="time"
                        value={config.system.announcementSettings?.endTime ?? ''}
                        onChange={(e) => {
                          setConfig({
                            ...config,
                            system: {
                              ...config.system,
                              announcementSettings: {
                                ...config.system.announcementSettings!,
                                endTime: e.target.value,
                              },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-800 italic">
                    * Để trống các ô ngày/giờ nếu bạn muốn phát sóng ngay lập tức mà không giới hạn lịch trình.
                  </p>
                </div>

                {/* 4. Hiệu Ứng Động & Màu Sắc Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hiệu Ứng Động (Animation)</span>
                    </label>
                    <select
                      value={config.system.announcementSettings?.effect ?? 'slide_down'}
                      onChange={(e) => {
                        setConfig({
                          ...config,
                          system: {
                            ...config.system,
                            announcementSettings: {
                              ...config.system.announcementSettings!,
                              effect: e.target.value as AnnouncementEffect,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                    >
                      <option value="slide_down">Trượt xuống mềm mại (Slide Down)</option>
                      <option value="marquee">Chữ chạy ngang liên tục (Marquee Scroll)</option>
                      <option value="shimmer">Tia sáng quét ngang sang trọng (Shimmer Sweep)</option>
                      <option value="pulse">Ánh hào quang nhấp nháy (Glow Pulse)</option>
                      <option value="fade">Hiện dần êm dịu (Fade In)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Chủ Đề Màu Sắc (Theme)</span>
                    </label>
                    <select
                      value={config.system.announcementSettings?.theme ?? 'gold'}
                      onChange={(e) => {
                        setConfig({
                          ...config,
                          system: {
                            ...config.system,
                            announcementSettings: {
                              ...config.system.announcementSettings!,
                              theme: e.target.value as AnnouncementTheme,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                    >
                      <option value="gold">Vàng Hoàng Gia Đại Việt (Gold Heritage)</option>
                      <option value="red">Đỏ Cát Tường Lễ Hội (Festive Red)</option>
                      <option value="emerald">Xanh Ngọc Bích May Mắn (Emerald Peace)</option>
                      <option value="purple">Tím Chiêm Tinh Huyền Bí (Mystic Purple)</option>
                      <option value="blue">Xanh Dương Thanh Lịch (Royal Blue)</option>
                    </select>
                  </div>
                </div>

                {/* 5. Khung Xem Trước Trực Tiếp & Nút Thử Nghiệm Chu Trình */}
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900">Xem Trước Banner & Thử Nghiệm Chu Trình</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTestTrigger((prev) => prev + 1)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-red-950 font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
                      >
                        <span>▶ Chạy Thử Nghiệm Chu Trình</span>
                      </button>

                      {/* Trạng thái chu trình */}
                      <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        bannerStatus.status === 'waiting'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : bannerStatus.status === 'showing'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {bannerStatus.status === 'waiting' && `⏳ Đang đợi xuất hiện: ${bannerStatus.countdown}s...`}
                        {bannerStatus.status === 'showing' && (
                          bannerStatus.countdown > 0 
                            ? `🔔 Đang hiển thị (Tự ẩn sau: ${bannerStatus.countdown}s)` 
                            : '● Đang hiển thị liên tục'
                        )}
                        {bannerStatus.status === 'hidden' && '✓ Đã tự động ẩn thành công'}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-100 min-h-[42px] flex flex-col justify-center">
                    <TopAnnouncementBanner 
                      config={config} 
                      previewMode={true} 
                      testTrigger={testTrigger}
                      onStatusChange={(status, countdown) => setBannerStatus({ status, countdown })}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    💡 <strong>Mẹo:</strong> Bấm <strong>"▶ Chạy Thử Nghiệm Chu Trình"</strong> để xem banner đợi đủ số giây trễ (Delay), tự động xuất hiện với hiệu ứng đã chọn, và đếm ngược thời lượng hiển thị (Duration) trước khi tự động biến mất!
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
