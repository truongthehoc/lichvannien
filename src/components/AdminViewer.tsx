'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  RotateCcw, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Sparkles, 
  Landmark, 
  CreditCard, 
  Phone, 
  Mail, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Layers, 
  Sliders, 
  Globe, 
  FileText, 
  Tag, 
  KeyRound, 
  LogOut 
} from 'lucide-react';
import { 
  AppConfig, 
  DEFAULT_APP_CONFIG, 
  getStoredConfig, 
  saveStoredConfig, 
  resetStoredConfig 
} from '@/utils/adminConfig';
import { HeritageCornerPattern, HeritageDivider } from './HeritageDecorations';

type AdminTab = 'features' | 'branding' | 'donation' | 'contact_footer' | 'system';

interface AdminViewerProps {
  isStandalone?: boolean;
  onLogout?: () => void;
}

export default function AdminViewer({ isStandalone = false, onLogout }: AdminViewerProps = {}) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('features');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isStandalone);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loaded = getStoredConfig();
    setConfig(loaded);
    // Auto-login if previously unlocked in session
    if (sessionStorage.getItem('lichvannien_admin_unlocked') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin888' || pinInput === '123456' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
      sessionStorage.setItem('lichvannien_admin_unlocked', 'true');
    } else {
      setPinError('Mã PIN quản trị không chính xác (Gợi ý: admin888)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lichvannien_admin_unlocked');
    if (onLogout) onLogout();
  };

  const handleSave = () => {
    saveStoredConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ cài đặt về mặc định ban đầu không?')) {
      const reset = resetStoredConfig();
      setConfig(reset);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Helper toggle feature
  const toggleFeature = (key: keyof AppConfig['features']) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: !prev.features[key],
      },
    }));
  };

  // 1. MÀN HÌNH KHÓA ĐĂNG NHẬP ADMIN NẾU CHƯA XÁC THỰC
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 sm:p-8 heritage-card bg-white border-2 border-amber-400 shadow-2xl relative overflow-hidden">
        <HeritageCornerPattern className="absolute top-2 left-2 w-6 h-6 text-amber-700/40" />
        <HeritageCornerPattern className="absolute top-2 right-2 w-6 h-6 text-amber-700/40 rotate-90" />

        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b1818] to-[#5a1010] text-amber-300 flex items-center justify-center mx-auto shadow-md border-2 border-amber-300">
            <KeyRound className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#8b1818]">
            Quản Trị Hệ Thống
          </h3>
          <p className="text-xs text-stone-600">
            Vui lòng nhập Mã PIN quản trị viên để truy cập bảng điều khiển
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
              Mã PIN Quản Trị
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Nhập mã PIN (mặc định: admin888)"
              className="w-full p-3 border-2 border-stone-300 rounded-xl text-center font-mono text-lg font-bold tracking-widest text-stone-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              autoFocus
            />
            {pinError && (
              <div className="text-xs text-rose-600 font-medium mt-1.5 text-center">
                {pinError}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            <span>Mở Khóa Quản Trị</span>
          </button>

          <div className="text-[11px] text-center text-stone-400 italic">
            * Mã PIN mặc định dành cho Quản trị viên: <strong>admin888</strong>
          </div>
        </form>
      </div>
    );
  }

  // 2. BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Admin Bar */}
      <div className="bg-gradient-to-r from-[#240e0b] via-[#4a1814] to-[#240e0b] text-white p-5 sm:p-6 rounded-2xl shadow-xl border-2 border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-red-950 flex items-center justify-center font-bold text-2xl shadow">
            ⚙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                Bảng Quản Trị Hệ Thống
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                Admin Mode
              </span>
            </div>
            <p className="text-xs text-amber-200/70 mt-0.5">
              Tùy biến hiển thị các trang, thông tin thương hiệu, donate, phiên bản và footer theo thời gian thực
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-stretch sm:self-auto">
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Thay Đổi</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs rounded-xl transition-all"
            title="Khôi phục mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-red-950 hover:bg-red-900 text-red-200 font-medium text-xs rounded-xl transition-all"
            title="Đăng xuất"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Thoát</span>
          </button>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-2.5 text-sm font-bold shadow-md animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Đã lưu toàn bộ cấu hình hệ thống thành công! Các trang và menu đã cập nhật ngay lập tức.</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'features', label: '1. Bật/Tắt Trang', icon: <Layers className="w-4 h-4" /> },
          { id: 'branding', label: '2. Logo & Thương Hiệu', icon: <Landmark className="w-4 h-4" /> },
          { id: 'donation', label: '3. Thông Tin Donate', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'contact_footer', label: '4. Liên Hệ & Footer', icon: <Phone className="w-4 h-4" /> },
          { id: 'system', label: '5. Phiên Bản & Bảo Trì', icon: <Sliders className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as AdminTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeAdminTab === tab.id
                ? 'bg-[#8b1818] text-amber-200 shadow-md scale-[1.02]'
                : 'bg-white text-stone-600 hover:bg-amber-50 border border-stone-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BẬT / TẮT HIỂN THỊ CÁC TRANG (FEATURE TOGGLES) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'features' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#8b1818] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-600" />
                  <span>Quản Lý Bật / Tắt Hiển Thị Các Trang & Tính Năng</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Khi tắt một trang, trang đó sẽ tự động ẩn khỏi thanh Menu và không hiển thị đối với người dùng
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { key: 'calendar', label: 'Lịch Vạn Niên (Tháng & Ngày)', desc: 'Xem lịch âm dương, trực, sao, giờ hoàng đạo', icon: '📅' },
                { key: 'tuvihangngay', label: 'Tử Vi Mỗi Ngày', desc: 'Dự đoán vận thế 12 Con Giáp hôm nay', icon: '☀️' },
                { key: 'ngaytot', label: 'Xem Ngày Tốt Xấu', desc: 'Tra cứu hoàng đạo, trực, sao, bách kỵ', icon: '🧭' },
                { key: 'convert', label: 'Đổi Ngày Âm Dương', desc: 'Quy đổi 2 chiều & Đếm ngược Tết', icon: '🔄' },
                { key: 'tuvi', label: 'Tử Vi Trọn Đời', desc: 'Lập lá số 12 cung & luận giải trọn đời', icon: '📖' },
                { key: 'saohan', label: 'Sao Hạn & Giải Hạn', desc: 'Cửu Diệu, Tam Tai, Kim Lâu & văn khấn', icon: '⭐' },
                { key: 'thansohoc', label: 'Thần Số Học Pitago', desc: 'Bản Thân, Giải mã Crush & Cặp Đôi', icon: '✨' },
                { key: 'gieoque', label: 'Gieo Quẻ Kinh Dịch', desc: 'Bói Dịch 3 đồng xu 64 quẻ', icon: '☯️' },
                { key: 'thuocloban', label: 'Thước Lỗ Ban', desc: 'Thước 52.2cm, 42.9cm, 38.8cm phong thủy', icon: '📏' },
                { key: 'about', label: 'Về Chúng Tôi & Donate', desc: 'Triết lý dự án & thông tin quyên góp', icon: '❤️' },
              ].map((item) => {
                const isEnabled = config.features[item.key as keyof AppConfig['features']];
                return (
                  <div
                    key={item.key}
                    onClick={() => toggleFeature(item.key as keyof AppConfig['features'])}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isEnabled
                        ? 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-400 shadow-xs'
                        : 'bg-stone-50 border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-serif font-bold text-sm text-stone-800 flex items-center gap-1.5">
                          <span>{item.label}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-tight mt-0.5">{item.desc}</p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isEnabled ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs">
                          <Eye className="w-3.5 h-3.5" /> BẬT
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-stone-300 text-stone-700 font-bold text-xs flex items-center gap-1">
                          <EyeOff className="w-3.5 h-3.5" /> ẨN
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LOGO & THƯƠNG HIỆU (BRANDING) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'branding' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#8b1818] flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-600" />
                <span>Cấu Hình Tên Dự Án, Logo & Khẩu Hiệu</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Các thông tin thương hiệu sẽ xuất hiện ở đầu trang (Header) và thanh tiêu đề trình duyệt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Tên Dự Án / Website
                </label>
                <input
                  type="text"
                  value={config.branding.siteName}
                  onChange={(e) => setConfig({
                    ...config,
                    branding: { ...config.branding, siteName: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-bold text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Khẩu Hiệu / Slogan Phụ
                </label>
                <input
                  type="text"
                  value={config.branding.tagline}
                  onChange={(e) => setConfig({
                    ...config,
                    branding: { ...config.branding, tagline: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Ký Tự Viết Tắt Logo (Icon)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={config.branding.logoText}
                  onChange={(e) => setConfig({
                    ...config,
                    branding: { ...config.branding, logoText: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 font-black text-center text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="p-4 bg-stone-100 rounded-2xl border border-stone-300 space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase">Xem Trước Hiển Thị Logo (Header Preview):</div>
              <div className="p-3 bg-[#8b1818] rounded-xl flex items-center gap-3 w-fit text-white shadow-md">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[#8b1818] font-bold text-base shadow border border-amber-200">
                  {config.branding.logoText || 'ÂD'}
                </div>
                <div>
                  <h1 className="text-base font-serif font-bold tracking-wide text-amber-200 leading-tight">
                    {config.branding.siteName || 'LỊCH VẠN NIÊN'}
                  </h1>
                  <p className="text-[10px] text-amber-100/75 tracking-wider leading-none">
                    {config.branding.tagline || 'Đại Việt Phong Thủy & Lịch Pháp'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: THÔNG TIN DONATE & NGÂN HÀNG (DONATION) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'donation' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#8b1818] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span>Cấu Hình Tài Khoản Ngân Hàng & Ví Điện Tử Quyên Góp</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Các thông tin này sẽ hiển thị tại trang "Về Chúng Tôi" và khung quét mã VietQR
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tên Ngân Hàng</label>
                <input
                  type="text"
                  value={config.donation.bankName}
                  onChange={(e) => setConfig({
                    ...config,
                    donation: { ...config.donation, bankName: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Số Tài Khoản</label>
                <input
                  type="text"
                  value={config.donation.accountNumber}
                  onChange={(e) => setConfig({
                    ...config,
                    donation: { ...config.donation, accountNumber: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl font-mono font-bold text-stone-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Chủ Tài Khoản</label>
                <input
                  type="text"
                  value={config.donation.accountHolder}
                  onChange={(e) => setConfig({
                    ...config,
                    donation: { ...config.donation, accountHolder: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl font-serif font-bold text-stone-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Chi Nhánh</label>
                <input
                  type="text"
                  value={config.donation.branch}
                  onChange={(e) => setConfig({
                    ...config,
                    donation: { ...config.donation, branch: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Nội Dung Chuyển Khoản Mặc Định</label>
                <input
                  type="text"
                  value={config.donation.content}
                  onChange={(e) => setConfig({
                    ...config,
                    donation: { ...config.donation, content: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm"
                />
              </div>
            </div>

            {/* Customize 4 donate packages */}
            <div className="border-t border-stone-100 pt-4 space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-800">Cấu Hình 4 Gói Donate Mặc Định:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {config.donation.packages.map((pkg, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500">Tên Gói {idx + 1}</label>
                      <input
                        type="text"
                        value={pkg.label}
                        onChange={(e) => {
                          const newPkgs = [...config.donation.packages];
                          newPkgs[idx].label = e.target.value;
                          setConfig({ ...config, donation: { ...config.donation, packages: newPkgs } });
                        }}
                        className="w-full p-1.5 border border-stone-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500">Số Tiền (VNĐ)</label>
                      <input
                        type="number"
                        step="10000"
                        value={pkg.amount}
                        onChange={(e) => {
                          const newPkgs = [...config.donation.packages];
                          newPkgs[idx].amount = Number(e.target.value);
                          setConfig({ ...config, donation: { ...config.donation, packages: newPkgs } });
                        }}
                        className="w-full p-1.5 border border-stone-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: THÔNG TIN LIÊN HỆ & FOOTER (CONTACT & FOOTER) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'contact_footer' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#8b1818] flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-600" />
                <span>Cấu Hình Thông Tin Liên Hệ & Chân Trang (Footer)</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Email Hòm Thư Liên Hệ</label>
                <input
                  type="email"
                  value={config.contact.email}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, email: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Hotline / Hỗ Trợ</label>
                <input
                  type="text"
                  value={config.contact.hotline}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, hotline: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Địa Chỉ / Trụ Sở</label>
                <input
                  type="text"
                  value={config.contact.address}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, address: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm"
                />
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 space-y-4">
              <h4 className="font-serif font-bold text-sm text-stone-800">Nội Dung Hiển Thị Ở Chân Trang (Footer):</h4>
              
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Đoạn Văn Mô Tả Giới Thiệu Chân Trang</label>
                <textarea
                  rows={2}
                  value={config.footer.description}
                  onChange={(e) => setConfig({
                    ...config,
                    footer: { ...config.footer, description: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Dòng Bản Quyền (Copyright)</label>
                  <input
                    type="text"
                    value={config.footer.copyright}
                    onChange={(e) => setConfig({
                      ...config,
                      footer: { ...config.footer, copyright: e.target.value }
                    })}
                    className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Thông Điệp Yêu Thương</label>
                  <input
                    type="text"
                    value={config.footer.loveMessage}
                    onChange={(e) => setConfig({
                      ...config,
                      footer: { ...config.footer, loveMessage: e.target.value }
                    })}
                    className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PHIÊN BẢN & BẢO TRÌ HỆ THỐNG (SYSTEM & VERSION) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'system' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="heritage-card p-6 bg-white border border-[#ebdccb] space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#8b1818] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-600" />
                <span>Phiên Bản & Quản Lý Thông Báo Hệ Thống</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Mã Phiên Bản</label>
                <input
                  type="text"
                  value={config.system.version}
                  onChange={(e) => setConfig({
                    ...config,
                    system: { ...config.system, version: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl font-mono font-bold text-stone-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Thời Điểm Phát Hành</label>
                <input
                  type="text"
                  value={config.system.releaseDate}
                  onChange={(e) => setConfig({
                    ...config,
                    system: { ...config.system, releaseDate: e.target.value }
                  })}
                  className="w-full p-2.5 border border-stone-300 rounded-xl text-stone-800 text-sm"
                />
              </div>
            </div>

            {/* Announcement Banner Toggle */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="font-serif font-bold text-sm text-stone-800">Banner Thông Báo Nổi Bật Đầu Trang</span>
                </div>
                <button
                  onClick={() => setConfig({
                    ...config,
                    system: { ...config.system, showAnnouncement: !config.system.showAnnouncement }
                  })}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    config.system.showAnnouncement
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {config.system.showAnnouncement ? 'ĐANG HIỂN THỊ' : 'ĐÃ TẮT'}
                </button>
              </div>

              <input
                type="text"
                value={config.system.announcement}
                onChange={(e) => setConfig({
                  ...config,
                  system: { ...config.system, announcement: e.target.value }
                })}
                placeholder="Nhập nội dung thông báo gửi đến toàn thể người dùng..."
                className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-stone-800 text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
